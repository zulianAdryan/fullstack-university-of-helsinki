import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../services/queries";
import AuthorForm from "./AuthorForm";
import TableOfAuthors from "./TableOfAuthors";

const Authors = ({ setError }) => {
  const authors = useQuery(ALL_AUTHORS);

  if (authors.loading) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>
      <TableOfAuthors authors={authors?.data?.allAuthors} />
      <AuthorForm authors={authors?.data?.allAuthors} setError={setError} />
    </div>
  );
};

export default Authors;
