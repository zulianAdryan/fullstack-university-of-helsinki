const TableOfBooks = ({ books }) => {
  const cellsStyle = {
    border: "1px solid gray",
    width: "calc(100%/4)",
    padding: "10px",
  };
  return (
    <table style={{ width: "100%" }}>
      <tbody>
        <tr>
          <th style={cellsStyle}>Title</th>
          <th style={cellsStyle}>Genre</th>
          <th style={cellsStyle}>Author</th>
          <th style={cellsStyle}>Published</th>
        </tr>
        {books?.map((book, index) => (
          <tr key={`${index}_${book.title}`}>
            <td style={cellsStyle}>{book.title}</td>
            <td style={cellsStyle}>{book.genres.join(", ")}</td>
            <td style={cellsStyle}>{book.author.name}</td>
            <td style={cellsStyle}>{book.published}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableOfBooks;
