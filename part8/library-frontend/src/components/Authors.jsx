import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../services/queries";
import AuthorForm from "./AuthorForm";

const Authors = ({ setError }) => {
  const authors = useQuery(ALL_AUTHORS);

  if (authors.loading) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((author, index) => (
            <tr key={`${index}_${author.name}`}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <AuthorForm authors={authors.data.allAuthors} setError={setError} />
    </div>
  );
};

export default Authors;
