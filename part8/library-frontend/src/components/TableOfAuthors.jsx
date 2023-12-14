const TableOfAuthors = ({ authors }) => {
  const cellsStyle = {
    border: "1px solid gray",
    width: "calc(100%/4)",
    padding: "10px",
  };
  return (
    <table style={{ width: "100%" }}>
      <tbody>
        <tr>
          <th style={cellsStyle}></th>
          <th style={cellsStyle}>born</th>
          <th style={cellsStyle}>books</th>
        </tr>
        {authors?.map((author, index) => (
          <tr key={`${index}_${author?.name}`}>
            <td style={cellsStyle}>{author?.name}</td>
            <td style={cellsStyle}>{author?.born}</td>
            <td style={cellsStyle}>{author?.bookCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableOfAuthors;
