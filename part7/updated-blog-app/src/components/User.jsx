import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthors } from "../hooks";
import { ListGroup } from "react-bootstrap";

const User = () => {
  const { id } = useParams();
  const { getAuthorOf } = useAuthors();
  const [author, setAuthor] = useState();

  const getAuthorData = async () => {
    const response = await getAuthorOf(id);
    setAuthor(response);
  };

  useEffect(() => {
    if (id) {
      getAuthorData();
    }
  }, [id]);

  if (!author) {
    return null;
  }

  // console.log("author", author);

  return (
    <div>
      <h2 className="my-3">
        {author.name} <b>added blogs</b>
      </h2>

      <ListGroup>
        {author.blogs.length ? (
          author.blogs.map((blog) => (
            <ListGroup.Item key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </ListGroup.Item>
          ))
        ) : (
          <p>there is no blog made by this author yet</p>
        )}
      </ListGroup>
    </div>
  );
};

export default User;
