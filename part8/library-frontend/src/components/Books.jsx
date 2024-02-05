import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../services/queries";
import { useState } from "react";
import TableOfBooks from "./TableOfBooks";

const Books = () => {
  const [filterGenre, setFilterGenre] = useState("all genres");
  const books = useQuery(ALL_BOOKS);
  const genres = [
    "refactoring",
    "agile",
    "patterns",
    "design",
    "crime",
    "classic",
    "all genres",
  ];
  if (books.loading) {
    return null;
  }

  // console.log("books", books.data?.allBooks);

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <b>{filterGenre}</b>
      </p>
      <div>
        {genres.map((genre) => (
          <button
            key={genre}
            type="button"
            onClick={() => setFilterGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
      <TableOfBooks
        books={books?.data?.allBooks?.filter((book) =>
          filterGenre !== "all genres"
            ? book?.genres?.includes(filterGenre)
            : book
        )}
      />
    </div>
  );
};

export default Books;
