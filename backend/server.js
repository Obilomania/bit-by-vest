const dotenv = require("dotenv").config()
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const errorHandler = require("./Middlewares/errorMiddleware");
const authRoute = require("./Routes/authRoute")
const adminRoute = require("./Routes/adminRoute")
const userRoute = require("./Routes/userRoute")
const path = require("path")




const app = express();
// const __dirname = path.resolve()
//Middleswares
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      "https://4fph9v5g-3000.euw.devtunnels.ms",
      "http://localhost:3000",
      "http://localhost:3001",
      "https://node-frontend-bitbyvest.vercel.app/",
      "https://node-frontend-bitbyvest.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(cookieParser());
 
// app.get("/", (req, res) => {
//     res.send("Welcome to Crypto kolo Investment nwanem")
// })


//***************************ROUTES***************** */
app.use("/api/authentication", authRoute)
app.use("/api/admin-section", adminRoute)
app.use("/api/user-section", userRoute)


app.use(errorHandler)


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/clientside/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "clientside", "dist", "index.html"));
  });
} 
  
// }
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

