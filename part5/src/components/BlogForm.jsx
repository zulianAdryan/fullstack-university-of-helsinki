const BlogForm = ({ onSubmit, onChangeInput }) => {
  const onChange = ({ target }) => {
    const { id, value } = target;
    onChangeInput((current) => ({ ...current, [id]: value }));
  };

  return (
    <form onSubmit={onSubmit}>
      <p>
        title:
        <input type="text" id="title" onChange={onChange} />
      </p>
      <p>
        author:
        <input type="text" id="author" onChange={onChange} />
      </p>
      <p>
        url:
        <input type="text" id="url" onChange={onChange} />
      </p>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
