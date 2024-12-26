import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';
import {Bloguser} from './Models/User.js'
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const dbUrl = process.env.DB_URL;

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.json());

app.use(cors({ 
    origin: "http://localhost:5173", // Replace with the frontend's URL 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type"],
    credentials : true
  }));

mongoose.connect(dbUrl)

app.post('/register', async (req, res) => {
    try {
        const { name, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Bloguser({ name, password: hashedPassword });
        await newUser.save(); // This creates the collection if it doesn't exist
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;
        const founduser = await Bloguser.findOne({ name });
        if (!founduser) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, founduser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        const token = jwt.sign(
            { id: founduser._id, name: founduser.name },
            process.env.JWT_SECRET,                 
            { expiresIn: process.env.JWT_EXPIRES_IN }  
        );
        res.status(200).cookie('token', token).json({message : 'Login Successful'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred' });
    }
});


app.listen(4000, () => {
    console.log(`Running on port 4000`);
})