const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");

//-----------RestObject-----------
const app = express();

//-----------Config.ENV-----------
dotenv.config();

//-----------Middleware-----------
app.use(express.json());
app.use(morgan("dev"));

//-----------Routes-----------
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Server Running",
  });
});

//-----------Port-----------
const port = process.env.PORT || 8080;

//-----------ListenPort-----------
app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_MODE} modes on port ${port}`
  );
});
