const errorHandler = require("../middlewares/errorHandler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  // console.log(req.body);
  // const payload = req.body;\

  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
    // next(errorHandler(300, "Something went wrong"));
    // res.status(500).json({ message: error.message });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Invalid Password"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...userWithoutPassword } = validUser._doc;
    const expireDate = new Date(Date.now() + 3600000); //1 hour
    res
      .cookie("access_token", token, { httpOnly: true, expires: expireDate })
      .status(200)
      .json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...userWithoutPassword } = user._doc;
      const expireDate = new Date(Date.now() + 3600000); //1 hour
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expireDate,
        })
        .status(200)
        .json(userWithoutPassword);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.floor((Math.random() * 10000).toString()),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...userWithoutPassword } =
        newUser._doc;
      const expireDate = new Date(Date.now() + 3600000); //1 hour
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expireDate,
        })
        .status(200)
        .json(userWithoutPassword);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, google };
