const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    unique: true,
  },
  phone: {
    type: String,
    minlength: 5,
  },
  street: {
    type: String,
    required: true,
    minlength: 5,
  },
  city: {
    type: String,
    required: true,
    minlength: 3,
  },
  friendOf: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

personSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Person", personSchema);
