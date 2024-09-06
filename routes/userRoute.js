const express = require("express");
const { userController, updateUser } = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyUser");

const router = express.Router();

router.get("/", userController);
router.post("/update/:id", verifyToken, updateUser);

module.exports = router;
