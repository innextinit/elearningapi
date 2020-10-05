const mongoose = require("mongoose")

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        unique: true,
        require: true
    },
    section: {
        type: Number,
        trim: true,
        require: true
    },
    body: {
        type: String,
        trim: true,
        require: true
    },
    tutor: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Tutor"
    },
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }
})

module.exports = mongoose.model("Article", ArticleSchema)