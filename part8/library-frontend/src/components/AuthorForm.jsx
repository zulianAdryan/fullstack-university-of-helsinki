import Select from "react-select";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR_BORN } from "../services/queries";
import { useField } from "../hooks";
import { useState } from "react";

const AuthorForm = ({ authors, setError }) => {
  const [name, setName] = useState(null);
  const { reset: resetBorn, ...born } = useField("number");
  const [editAuthorBorn] = useMutation(EDIT_AUTHOR_BORN, {
    onError: (error) => {
      const messages = error.graphQLErrors
        .map((error) => error.message)
        .join("\n");
      setError(messages);
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    editAuthorBorn({
      variables: {
        name: name.value,
        setBornTo: parseInt(born.value),
      },
      refetchQueries: [{ query: ALL_AUTHORS }],
    });
    setName(null);
    resetBorn();
  };

  return (
    <div>
      <h2>Update Author</h2>
      <form onSubmit={onSubmit}>
        <div>
          <Select
            placeholder="Select Author"
            options={authors.map((author) => ({
              label: author.name,
              value: author.name,
            }))}
            value={name}
            onChange={(selected) => setName(selected)}
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
