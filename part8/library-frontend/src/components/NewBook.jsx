import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_BOOKS, CREATE_BOOK } from "../services/queries";
import { useField } from "../hooks";

const NewBook = ({ setError }) => {
  const { reset: resetTitle, ...title } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetPublished, ...published } = useField("number");
  const { reset: resetGenre, ...genre } = useField("text");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      setError(messages);
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log("add book...");

    createBook({
      variables: {
        title: title.value,
        author: author.value,
        published: parseInt(published.value),
        genres,
      },
      refetchQueries: [{ query: ALL_BOOKS }],
    });

    resetTitle();
    resetPublished();
    resetAuthor();
    resetGenre();
    setGenres([]);
  };

  const addGenre = () => {
    setGenres(genres.concat(genre.value));
    resetGenre();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          title
          <input {...title} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          published
          <input {...published} />
        </div>
        <div>
          <input {...genre} />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(", ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
