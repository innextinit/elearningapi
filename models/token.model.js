const jwt = require("jsonwebtoken")
const mongoose  = require("mongoose")

const tokenSchema = new mongoose.Schema({

})

module.exports = mongoose.model("Token", tokenSchema)