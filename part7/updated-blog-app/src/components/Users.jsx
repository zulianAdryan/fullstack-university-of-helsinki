import React from "react";
import { useAuthors } from "../hooks";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const Users = () => {
  const authors = useAuthors();

  if (authors.isLoading) {
    return null;
  }
  // console.log("authors: ", authors.data);

  return (
    <div>
      <h2 className="my-2">Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <th>Author</th>
            <th>Blogs created</th>
          </tr>
          {authors.data.map((author) => (
            <tr key={author.id}>
              <td>
                <Link to={`/users/${author.id}`}>{author.name}</Link>
              </td>
              <td>{author.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
