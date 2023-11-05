import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlogs, useComments, useField, useUser } from "../hooks";
import { Button, Form, ListGroup, ListGroupItem } from "react-bootstrap";

const Blog = () => {
  const [blog, setBlog] = useState();
  const navigate = useNavigate();
  const user = useUser();
  const { id } = useParams();
  const { reset: resetComments, ...commentsInput } = useField();
  const {
    data: blogs,
    isLoading: isBlogLoading,
    deleteOf,
    likeOf,
  } = useBlogs();
  const {
    data: comments,
    isLoading: isCommentsLoading,
    create,
    getAll,
  } = useComments(blog?.id);

  useEffect(() => {
    if (id && blogs) {
      const targetBlog = blogs.find((blog) => blog.id === id);
      setBlog(targetBlog);
    }
  }, [id, blogs]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newComment = {
      content: commentsInput.value,
      blogId: blog.id,
    };
    const response = await create(newComment);
    console.log("response", response);
  };

  if (!blog || isBlogLoading) {
    return null;
  }

  // console.log("blog", blog);
  // console.log("comments", comments);
  // console.log("user", user.data);

  return (
    <div>
      <h2 className="my-3">{`${blog.title}`}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div className="mt-3 d-flex gap-2 align-items-center">
        <p>{`${blog.likes} likes`}</p>
        <Button type="button" onClick={() => likeOf(blog)}>
          like
        </Button>
      </div>
      <p className="my-2 fs-7 text-muted">added by {blog.author}</p>
      {blog.user.id === user.data.id && (
        <Button
          className="my-2"
          variant="danger"
          type="button"
          onClick={async () => {
            const deleting = await deleteOf(blog);
            if (!deleting.isError) {
              navigate("/");
            }
          }}
        >
          remove
        </Button>
      )}

      <h5 className="mt-4">comments</h5>
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <div className="d-flex flex-row gap-3">
              <Form.Control {...commentsInput} className="flex-fill" />
              <Button type="submit" className="flex-fill">
                comment
              </Button>
            </div>
          </Form.Group>
        </Form>
        <ListGroup className="mt-2">
          {comments.map((comment) => (
            <ListGroupItem key={comment.id}>{comment.content}</ListGroupItem>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default Blog;
