import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from "../services/queries";
import { useField } from "../hooks";
import { useNavigate } from "react-router-dom";
import { updateCache } from "../App";

const NewBook = ({ setError, favoriteGenre }) => {
  const { reset: resetTitle, ...title } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetPublished, ...published } = useField("number");
  const { reset: resetGenre, ...genre } = useField("text");
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      // console.log("error: ", error);
      const messages = error.graphQLErrors.map((e) => e?.message).join("\n");
      const extensionMessages = error.graphQLErrors
        .map((e) => e?.extensions?.error?.message)
        .join("\n");
      setError([messages, extensionMessages].flat().join(", "));
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log("add book...");
    const response = await createBook({
      variables: {
        title: title.value,
        author: author.value,
        published: parseInt(published.value),
        genres,
      },
      update: (cache, response) => {
        updateCache(cache, ALL_BOOKS, response?.data?.addBook);
      },
      refetchQueries: [
        { query: ALL_BOOKS, variables: { favoriteGenre } },
        { query: ALL_AUTHORS },
      ],
    });

    console.log("create new book", response);
    if (response?.data?.addBook) {
      resetTitle();
      resetPublished();
      resetAuthor();
      resetGenre();
      setGenres([]);
      navigate("/books");
    }
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
