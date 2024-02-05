import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../services/queries";
import TableOfBooks from "./TableOfBooks";

const Recomendations = ({ favoriteGenre: genre }) => {
  const books = useQuery(ALL_BOOKS, {
    variables: {
      genre,
    },
  });

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favourite genre <b>{genre}</b>
      </p>
      {!books.loading ? <TableOfBooks books={books.data.allBooks} /> : null}
    </div>
  );
};

export default Recomendations;
