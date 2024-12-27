import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import { Bloguser } from "./Models/User.js";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
const dbUrl = process.env.DB_URL;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with the frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(cookieParser());

mongoose.connect(dbUrl);

app.post("/register", async (req, res) => {
  try {
    const { name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Bloguser({ name, password: hashedPassword });
    await newUser.save(); // This creates the collection if it doesn't exist
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const founduser = await Bloguser.findOne({ name });
    if (!founduser) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, founduser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    const token = jwt.sign(
      { id: founduser._id, name: founduser.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 365 * 24 * 60 * 60 * 1000,
      })
      .json({
        id : founduser._id,
        name
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/profile", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, bloguser) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    res.status(200).json({ name: bloguser.name });
  });
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
})

app.listen(4000, () => {
  console.log(`Running on port 4000`);
});
