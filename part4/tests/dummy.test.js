const listHelper = require("../utils/list_helper");
const initialBlogs = require("./test_helper").initialBlogs;

test("dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes([initialBlogs[0]]);
    expect(result).toBe(7);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(initialBlogs);
    expect(result).toBe(36);
  });
});

describe("favoriteBlog", () => {
  test("returns the most liked blog", () => {
    const mostLikedBlog = {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    };
    const result = listHelper.favoriteBlog(initialBlogs);
    expect(result).toEqual(mostLikedBlog);
  });
});

describe("mostBlogs", () => {
  test("returns the most blogs author", () => {
    const mostAuthor = {
      author: "Robert C. Martin",
      blogs: 3,
    };
    const result = listHelper.mostBlogs(initialBlogs);
    expect(result).toEqual(mostAuthor);
  });
});

describe("mostLikes", () => {
  test("returns the most liked blogs author", () => {
    const mostLiked = {
      author: "Edsger W. Dijkstra",
      likes: 17,
    };
    const result = listHelper.mostLikes(initialBlogs);
    expect(result).toEqual(mostLiked);
  });
});
