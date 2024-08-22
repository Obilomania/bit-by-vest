const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

// *************IMPORTED ROUTES*********************
const errorHandler = require("./Middlewares/errorMiddleware");
const authRoute = require("./Routes/authRoute");
const adminRoute = require("./Routes/adminRoute");
const userRoute = require("./Routes/userRoute");

const app = express();
// Initialize Express App

// Define PORT
const PORT = process.env.PORT || 5000;

// Middleware Configuration
// Enable CORS
app.use(
  cors({
    origin: true, // Allows all origins
    credentials: true, // Allows cookies and credentials to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

//***************************ROUTES***************** */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.use("/api/authentication", authRoute);
app.use("/api/admin-section", adminRoute);
app.use("/api/user-section", userRoute);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "frontend", "build", "index.html")
    );
  });
}


app.use(errorHandler);

// Connect to MongoDB and Start Server
mongoose
  .connect(process.env.MONGO_URL, {
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit process with failure
  });