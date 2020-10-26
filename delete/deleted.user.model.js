const mongoose = require("mongoose")

const DeleteSchema = new mongoose.Schema({
    deleteUser: {
        type: Array,
        unique: true
    }
})

module.exports = mongoose.model("Delete", DeleteSchema)