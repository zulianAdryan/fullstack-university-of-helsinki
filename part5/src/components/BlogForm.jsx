import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ onSubmit }) => {
  const defaultBlogForm = { title: "", author: "", url: "" };
  const [blogForm, setBlogForm] = useState(defaultBlogForm);

  const onChange = ({ target }) => {
    const { id, value } = target;
    setBlogForm((current) => ({ ...current, [id]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(blogForm);
    setTimeout(() => {
      setBlogForm(defaultBlogForm);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>
        title:
        <input
          type="text"
          id="title"
          onChange={onChange}
          value={blogForm.title}
          placeholder="title"
        />
      </p>
      {/* <p>
        author:
        <input type="text" id="author" onChange={onChange} value={blogForm.author}/>
      </p> */}
      <p>
        url:
        <input
          type="text"
          id="url"
          onChange={onChange}
          value={blogForm.url}
          placeholder="url"
        />
      </p>
      <button type="submit">create</button>
    </form>
  );
};

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default BlogForm;
