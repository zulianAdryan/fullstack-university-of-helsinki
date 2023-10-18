import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ user, blog, onLike, onDelete }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  // console.log({ blog, user });

  const BlogDetail = () => {
    return (
      <div>
        <p>{blog.url}</p>
        <p>
          {`likes ${blog.likes}`}
          <button type="button" onClick={() => onLike(blog)}>
            like
          </button>
        </p>
        <p>{blog.author}</p>
        {blog.user.id === user.id && (
          <button type="button" onClick={() => onDelete(blog)}>
            remove
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="blog">
      <div
        style={{
          display: "flex",
        }}
      >
        <p>{`${blog.title} ${blog.author}`}</p>
        <button type="button" onClick={toggleVisibility}>
          {visible ? "hide" : "view"}
        </button>
      </div>
      {visible && <BlogDetail />}
    </div>
  );
};

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Blog;
