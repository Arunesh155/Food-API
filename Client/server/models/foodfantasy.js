const mongoose = require('mongoose')

const FoodfantasySchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

const FoodfantasyModel = mongoose.model("foodfantasy",FoodfantasySchema)
module.exports = FoodfantasyModel