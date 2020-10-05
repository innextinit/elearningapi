const mongoose = require("mongoose")

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        trim: true,
        require: true,
        unique: true,
    },
    option1: {
        type: String,
        trim: true,
        require: true
    },option2: {
        type: String,
        trim: true,
        require: true
    },option3: {
        type: String,
        trim: true,
        require: true
    },option4: {
        type: String,
        trim: true,
        require: true
    },
    optionPicked: {
        type: String,
        trim: true,
        require: true
    },
    correctAnswer: {
        type: String,
        trim: true,
        require: true
    },
    isCorrect: {
        type: Boolean,
        default: false
    },
    tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tutor"
    },
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }
})

module.exports = mongoose.model("Question", QuestionSchema)