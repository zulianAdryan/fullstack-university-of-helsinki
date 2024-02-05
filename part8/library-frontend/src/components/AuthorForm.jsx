import Select from "react-select";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR } from "../services/queries";
import { useField } from "../hooks";
import { useState } from "react";

const AuthorForm = ({ authors, setError }) => {
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const { reset: resetBorn, ...born } = useField("number");
  const [editAuthorBorn] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      const messages = error.graphQLErrors
        .map((error) => error.message)
        .join("\n");
      setError(messages);
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await editAuthorBorn({
      variables: {
        name: selectedAuthor?.label,
        born: parseInt(born.value),
        id: selectedAuthor?.value,
      },
      refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
    });
    if (response.data?.editAuthor) {
      setSelectedAuthor(null);
      resetBorn();
    }
  };

  console.log("authors", authors);

  return (
    <div>
      <h2>Update Author</h2>
      <form onSubmit={onSubmit}>
        <div>
          <Select
            placeholder="Select Author"
            options={authors?.map((author) => ({
              label: author?.name,
              value: author?.id,
            }))}
            value={selectedAuthor}
            onChange={(selected) => setSelectedAuthor(selected)}
          />
        </div>
        <div>
          born
          <input {...born} min={1} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default AuthorForm;
