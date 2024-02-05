const MONGO_URI = process.env.MONGO_URI.replace(
  "MONGO_PASSWORD",
  process.env.MONGO_PASSWORD
);
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  MONGO_URI,
  JWT_SECRET,
};
