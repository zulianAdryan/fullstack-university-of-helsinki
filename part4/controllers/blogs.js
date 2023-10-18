const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const userExtractor = require("../utils/middleware").userExtractor;

// blogsRouter.get("/", (req, res) => {
//     console.log("server is running...");
//     res.send("server is running...");
//   });

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;

  // console.log({ body, token: request.token });
  if (!body.title || !body.url) {
    // console.log("SINI", body.title, body.url);
    response.status(400).end();
    return;
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  // console.log({ decodedToken });

  const user = request.user;
  // console.log({ user });

  const blog = new Blog({
    author: decodedToken.name,
    title: body.title,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  });
  // console.log("SINI", blog);

  const savedBlog = await blog.save();
  // console.log("SINI", savedBlog);

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  const addedBlog = await Blog.findById(savedBlog._id).populate("user", {
    username: 1,
    name: 1,
  });

  response.status(201).json(addedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response
      .status(404)
      .json({ error: "blog is either not exist or has been deleted" });
  }
  const user = request.user;

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    user.blogs = user.blogs.filter(
      (blog) => blog.toString() !== request.params.id
    );
    await user.save();
    response.status(204).end();
  }
});

blogsRouter.put("/:id", userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response
      .status(404)
      .json({ error: "blog is either not exist or has been deleted" });
  }
  const user = request.user;

  if (blog.user.toString() === user._id.toString()) {
    const body = request.body;
    const blog = {
      title: body.title,
      url: body.url,
      author: body.author,
      likes: body.likes,
    };

    await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    const updatedBlog = await Blog.findById(request.params.id).populate(
      "user",
      {
        username: 1,
        name: 1,
      }
    );

    response.json(updatedBlog);
  }
});

module.exports = blogsRouter;
