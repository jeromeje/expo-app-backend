const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());


app.use(
    cors({
      origin: "http://localhost:8082",
    })
  );
  

const mongoURI = process.env.MONGODB;
// MongoDB Connection
// const mongoURI = "mongodb://127.0.0.1:27017/userDB";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
const authRoutes = require("./src/routes/Auth");
app.use("/api", authRoutes);

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
