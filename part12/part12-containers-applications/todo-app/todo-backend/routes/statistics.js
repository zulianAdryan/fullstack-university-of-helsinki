const express = require("express");
const { REDIS_COUNTER_TODO } = require("../util/config");
const { getAsync } = require("../redis");

const router = express.Router();

router.get("/", async (_, res) => {
  const currentCounterTodo = (await getAsync(REDIS_COUNTER_TODO)) ?? 0;
  res.status(200).json({
    added_todo: currentCounterTodo,
  });
});

module.exports = router;
