const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const authController = async (req, res) => {
  // console.log(req.body);
  // const payload = req.body;\

  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = authController;
