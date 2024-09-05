const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const not_found = require("./middlewares/notFound");
const cors = require("cors"); // Import the cors package

//-----------RestObject-----------
const app = express();

//-----------Middleware-----------
app.use(express.json());
app.use(morgan("dev"));

// Define the CORS options - CORS policy from Backend Side
const corsOptions = {
  credentials: true,
  origin: ["http://localhost:5173"], // Whitelist the domains you want to allow
};
app.use(cors(corsOptions)); // Use the cors middleware with your options

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

//-----------Routes-----------
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

//-----------Middleware Not Found-----------
app.use(not_found);
//-----------Middleware errorHandler-----------
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

//-----------Port-----------
const port = process.env.PORT || 8080;

//-----------ListenPort-----------
app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_MODE} modes on port ${port}`.bgRed
  );
});
