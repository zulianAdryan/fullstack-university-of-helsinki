const Blog = ({ blog }) => (
  <div className="blog">
    {blog.title} {blog.author}
  </div>
);

const BlogList = ({ blogs }) => {
  return blogs.map((blog) => <Blog key={blog.id} blog={blog} />);
};

export default BlogList;
