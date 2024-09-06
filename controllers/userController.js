const errorHandler = require("../middlewares/errorHandler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const userController = (req, res) => {
  res.status(200).send({
    message: "Server Running on Controller",
  });
};

const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can update only your account"));
  }
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true } //to see updated one
    );
    const { password, ...rest } = updated._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

module.exports = { userController, updateUser };
