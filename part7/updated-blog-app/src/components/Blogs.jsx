import { useRef } from "react";
import { useBlogs } from "../hooks";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const Blogs = () => {
  const toggleBlogFormRef = useRef();
  const blogFormRef = useRef();
  const { data: blogs, create } = useBlogs();

  const handleCreate = async (newBlog) => {
    const createBlog = await create(newBlog);
    if (!createBlog.isError) {
      blogFormRef.current.resetFields();
      toggleBlogFormRef.current.toggle();
    }
  };

  if (blogs.length) {
    return (
      <div>
        <div className="my-4">
          <Togglable
            buttonShowLabel="new note"
            buttonHideLabel="cancel"
            ref={toggleBlogFormRef}
          >
            <BlogForm ref={blogFormRef} onSubmit={handleCreate} />
          </Togglable>
        </div>
        <Table striped>
          <tbody>
            <tr>
              <th>Blogs</th>
              <th>Author</th>
            </tr>
            {blogs
              .sort((prev, current) => current.likes - prev.likes)
              .map((blog) => (
                <tr key={blog.id}>
                  <td>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </td>
                  <td>{blog.author}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    );
  } else {
    return <p>There is no any blog yet</p>;
  }
};

export default Blogs;
