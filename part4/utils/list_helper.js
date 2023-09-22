const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((prev, current) => prev + current.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (prev, current) => (current.likes > prev.likes ? current : prev),
    blogs[0]
  );
};

const mostBlogs = (blogs) => {
  const authorCount = blogs.reduce((count, blog) => {
    const author = blog.author;
    count[author] = (count[author] || 0) + 1;
    return count;
  }, {});

  const mostBlogsAuthor = Object.entries(authorCount).reduce(
    (prev, [author, count]) =>
      count > prev.blogs ? { author, blogs: count } : prev,
    { author: "", blogs: 0 }
  );

  return mostBlogsAuthor;
};

const mostLikes = (blogs) => {
  const likesCount = blogs.reduce((count, blog) => {
    const author = blog.author;
    const likes = blog.likes;
    count[author] = (count[author] || 0) + likes;
    return count;
  }, {});

  const mostLikedAuthor = Object.entries(likesCount).reduce(
    (prev, [author, count]) =>
      count > prev.likes ? { author, likes: count } : prev,
    { author: "", likes: 0 }
  );

  return mostLikedAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
