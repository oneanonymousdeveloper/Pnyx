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
import { Blog } from "./Models/Blog.js";
import multer from "multer";
const upload = multer();
const dbUrl = process.env.DB_URL;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
        id: founduser._id,
        name,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

const isLoggedIn = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

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

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/create", upload.none(), isLoggedIn, async (req, res) => {
  const { title, description } = req.body;
  const { user } = req;
  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Both title and description are required." });
  }
  const newBlog = new Blog({ title, description ,user: user.id, });
  await newBlog.save();
  res.status(201).json({ message: "Blog Created Successfully" });
});

app.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching blogs" });
  }
});

app.get("/:id", isLoggedIn, async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }
      res.status(200).json(blog);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred while fetching the blog" });
    }
  });

  app.put("/edit/:id", async (req, res) => {

    const { id } = req.params;
    const { title, description } = req.body;
    const { user } = req;
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Access denied, no token provided" });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, async (err, bloguser) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token" });
      }
      
      try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
          return res.status(404).json({ error: "Blog not found" });
        }
        
        if (blog.user.toString() !== bloguser.id) {
          return res.status(403).json({ error: "You are not authorized to edit this blog" });
        }

        blog.title = req.body.title || blog.title;
        blog.description = req.body.description || blog.description;
        await blog.save();
        
        res.status(200).json({ message: "Blog updated successfully" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while updating the blog" });
      }
    });
  });

  app.delete("/delete/:id", async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Access denied, no token provided" });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, async (err, bloguser) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token" });
      }
  
      try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
          return res.status(404).json({ error: "Blog not found" });
        }
  
        if (blog.user.toString() !== bloguser.id) {
          return res.status(403).json({ error: "You are not authorized to delete this blog" });
        }
  
        await blog.remove();
        res.status(200).json({ message: "Blog deleted successfully" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while deleting the blog" });
      }
    });
  });

app.listen(4000, () => {
  console.log(`Running on port 4000`);
});
