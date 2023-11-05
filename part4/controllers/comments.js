const jwt = require("jsonwebtoken");
const commentsRouter = require("express").Router();
const Comment = require("../models/comments");
const userExtractor = require("../utils/middleware").userExtractor;

commentsRouter.get("/:id", async (request, response) => {
  const comments = await Comment.find(
    { blog: request.params.id },
    "-blog"
  ).populate("user", {
    username: 1,
    name: 1,
  });

  response.json(comments);
});

commentsRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;

  // console.log({ body, token: request.token });
  if (!body.content || !body.blogId) {
    // console.log("SINI", body.title, body.url);
    response.status(400).end();
    return;
  }

  jwt.verify(request.token, process.env.SECRET);
  //   console.log({ decodedToken });

  const user = request.user;
  // console.log({ user });

  const comment = new Comment({
    content: body.content,
    blog: body.blogId,
    user: user.id,
  });
  // console.log("SINI", blog);

  const savedComment = await comment.save();
  //   console.log("SAVED", savedComment);

  //   user.comments = user.comments.concat(savedComment._id);
  //   await user.save();

  const addedComment = await Comment.findById(savedComment._id).populate(
    "user",
    {
      username: 1,
      name: 1,
    }
  );

  //   console.log("comment added", addedComment);

  response.status(201).json(addedComment);
});

module.exports = commentsRouter;
