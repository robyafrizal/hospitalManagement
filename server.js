const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");

//-----------RestObject-----------
const app = express();

//-----------Config.ENV-----------
dotenv.config();

//-----------Connect_MongoDB-----------
const mongo = async () => {
  await mongoose.connect(process.env.MONGO);
  try {
    console.log(colors.blue("Connected to MongoDB"));
  } catch (err) {
    console.log(err);
  }
};
mongo();

// mongoose
//   .connect(process.env.MONGO)
//   .then(() => {
//     console.log("Connected to MongoDB".bgGreen);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//-----------Middleware-----------
app.use(express.json());
app.use(morgan("dev"));

//-----------Routes-----------
app.use("/api/user", userRoute);

//-----------Port-----------
const port = process.env.PORT || 8080;

//-----------ListenPort-----------
app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_MODE} modes on port ${port}`.bgRed
  );
});
