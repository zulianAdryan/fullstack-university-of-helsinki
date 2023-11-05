import PropTypes from "prop-types";
import { useField } from "../hooks";
import { forwardRef, useImperativeHandle } from "react";
import { Button, Form } from "react-bootstrap";

const BlogForm = forwardRef((props, refs) => {
  const { reset: resetTitle, ...title } = useField("text", "title");
  const { reset: resetUrl, ...url } = useField("text", "url");

  const resetFields = () => {
    resetTitle();
    resetUrl();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit({ title: title.value, url: url.value });
  };

  useImperativeHandle(refs, () => {
    return {
      resetFields,
    };
  });

  return (
    <Form className="py-1 mb-4" onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control {...title} placeholder="title" />
        <Form.Label className="mt-4">URL</Form.Label>
        <Form.Control {...url} placeholder="url" />
        <Button className="mt-4" type="submit">
          create
        </Button>
      </Form.Group>
    </Form>
  );
});

BlogForm.displayName = "BlogForm";

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default BlogForm;
