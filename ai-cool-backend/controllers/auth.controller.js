const bcrypt = require("bcrypt");
const User = require("../models/auth.model");

module.exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    const responseUser = {
      name: user.name,
      email: user.email,
      userRole: user.userRole,
      isEmailVerified: user.isEmailVerified,
    };
    res
      .status(201)
      .json({ message: "User registered successfully", user: responseUser });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const responseUser = {
      name: user.name,
      email: user.email,
      userRole: user.userRole,
      isEmailVerified: user.isEmailVerified,
    };
    res.json({ message: "User login successfully", user: responseUser });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.editUser = async (req, res, next) => {
  const { email } = req.params; // Assuming the email is passed in the URL params
  // console.log(email);
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (name) user.name = name;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.verifyEmail = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.isEmailVerified = true;
    await user.save();

    res.json({ message: "Email verification updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.deleteUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
