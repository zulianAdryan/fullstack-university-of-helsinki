require("dotenv").config();

const PORT = process.env.PORT || 3001;
const URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGO_URI
    : process.env.MONGO_URI;
const MONGODB_URI = URI.replace("MONGO_PASSWORD", process.env.MONGO_PASSWORD);

module.exports = {
  MONGODB_URI,
  PORT,
};
