// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const FoodfantasyModel = require('./models/foodfantasy')

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/foodfantasy");

app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    FoodfantasyModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success")
                } else {
                    res.json("The password is incorrect")
                }
            }
            else {
                res.json("NO record existed")
            }
        })
})

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await FoodfantasyModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const newUser = await FoodfantasyModel.create({ username, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Registered mail id already exists.' });
    }
});


app.listen(3001, () => {
    console.log("Server is running")
})