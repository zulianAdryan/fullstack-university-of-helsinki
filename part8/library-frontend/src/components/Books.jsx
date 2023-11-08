import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../services/queries";

const Books = () => {
  const books = useQuery(ALL_BOOKS);

  if (books.loading) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((book, index) => (
            <tr key={`${index}_${book.title}`}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
