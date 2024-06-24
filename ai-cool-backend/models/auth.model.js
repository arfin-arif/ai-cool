const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isEmailVerified: {
    type: String,
    default: false,
  },
  userRole: {
    type: String,
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);
