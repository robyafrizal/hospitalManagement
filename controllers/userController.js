const userController = (req, res) => {
  res.status(200).send({
    message: "Server Running on Controller",
  });
};

module.exports = userController;
