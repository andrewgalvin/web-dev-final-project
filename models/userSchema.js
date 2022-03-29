const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoListSchema = new Schema(
  {
    todo: {
      type: String,
      required: true
    }
  }
)

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    todos: [todoListSchema],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Users", userSchema);

module.exports = User;