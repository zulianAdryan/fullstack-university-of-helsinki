const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");
const User = require("../models/user");

let userLogin = {};

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const blogPromiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(blogPromiseArray);

  await User.deleteMany({});
  await helper.registerTestUser(helper.rootUser);

  userLogin = await helper.loginTestUser();
}, 100000);

describe("initially saved blog", () => {
  test("returns all blogs in JSON format", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  test("returns all blogs with the correct amount of data", async () => {
    const blogs = await helper.blogsInDb();
    expect(blogs).toHaveLength(helper.initialBlogs.length);
  });

  test("the unique identifier property of the blog posts is named id", async () => {
    const blogs = await helper.blogsInDb();
    blogs.forEach((blog) => expect(blog.id).toBeDefined());
  });
});

describe("addition of a new blog", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      // author: "zulian",
      title: "TEST WITH TOKEN",
      url: "url test",
      likes: 99,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${userLogin?.token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain(newBlog.title);
  });

  test("should return status 401 unauthorized", async () => {
    const newBlog = {
      // author: "zulian",
      title: "TEST WITHOUT TOKEN",
      url: "url test",
      likes: 77,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });

  test("if likes property is missing then set to 0", async () => {
    const newBlogWithoutLikes = {
      title: "without likes in the request",
      author: "zulian",
      url: "url test",
    };

    await api
      .post("/api/blogs")
      .send(newBlogWithoutLikes)
      .set("Authorization", `Bearer ${userLogin?.token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.at(-1).likes).toBeDefined();
  });

  test("if title or url property is missing then it should return response 400", async () => {
    const newBlogWithoutTitle = {
      author: "zulian",
      url: "test without title",
      likes: 19,
    };
    const newBlogWithoutUrl = {
      title: "test without url",
      author: "zulian",
      likes: 19,
    };

    await api
      .post("/api/blogs")
      .send(newBlogWithoutTitle)
      .set("Authorization", `Bearer ${userLogin?.token}`)
      .expect(400);
    await api
      .post("/api/blogs")
      .send(newBlogWithoutUrl)
      .set("Authorization", `Bearer ${userLogin?.token}`)
      .expect(400);

    const blogs = await helper.blogsInDb();
    expect(blogs).toHaveLength(helper.initialBlogs.length);
  });
});

describe("update a blog", () => {
  test("should update a blog", async () => {
    const updatedBlog = {
      title: "THIS IS UPDATED",
      author: "zulian",
      url: "someurl",
      likes: 300,
    };
    const blogsAtStart = await helper.blogsInDb();
    const lastBlogItem = blogsAtStart.at(-1);
    const response = await api
      .put(`/api/blogs/${lastBlogItem.id}`)
      .send(updatedBlog)
      .expect(200);

    expect(response.body).toEqual({ ...updatedBlog, id: response.body.id });
  });
});

describe("remove a blog", () => {
  test("should remove a blog", async () => {
    const willBeRemovedBlog = {
      title: "soonwillberemoved",
      author: "zulian",
      url: "some url",
      likes: 1,
      user: await helper.testUserInDb(),
    };

    const blog = new Blog(willBeRemovedBlog);
    await blog.save();

    await api
      .delete(`/api/blogs/${blog.id}`)
      .set("Authorization", `Bearer ${userLogin?.token}`)
      .expect(204);
  });
});

afterAll(async () => {
  mongoose.connection.close();
});
