const mongoose = require("mongoose")

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        trim: true,
        require: true,
        unique: true,
        validate: {
            validator: (value) => {
                return /[\w+\s]/g.test(value)
            },
            message: problem => `${problem.value} text should be within a-zA-Z0-9 and white space`
        }
    },
    option1: {
        type: String,
        trim: true,
        require: true,
        validate: {
            validator: (value) => {
                return /[\w+\s]/g.test(value)
            },
            message: problem => `${problem.value} text should be within a-zA-Z0-9 and white space`
        }
    },
    option2: {
        type: String,
        trim: true,
        require: true,
        validate: {
            validator: (value) => {
                return /[\w+\s]/g.test(value)
            },
            message: problem => `${problem.value} text should be within a-zA-Z0-9 and white space`
        }
    },
    option3: {
        type: String,
        trim: true,
        require: true,
        validate: {
            validator: (value) => {
                return /[\w+\s]/g.test(value)
            },
            message: problem => `${problem.value} text should be within a-zA-Z0-9 and white space`
        }
    },
    option4: {
        type: String,
        trim: true,
        require: true,
        validate: {
            validator: (value) => {
                return /[\w+\s]/g.test(value)
            },
            message: problem => `${problem.value} text should be within a-zA-Z0-9 and white space`
        }
    },
    correctAnswer: {
        type: String,
        trim: true,
        require: true,
        validate: {
            validator: (value) => {
                return /(option1|option2|option3|option4)/.test(value)
            },
            message: problem => `${problem.value} is not a valid option`
        }
    },
    isCorrect: {
        type: Boolean,
        default: false,
        validate: {
            validator: (value) => {
                return /(true|false)/.test(value)
            },
            message: problem => `${problem.value} is not valid`
        }
    },
    tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tutor",
        validate: {
            validator: (value) => {
                return /^[a-f\d]{24}$/.test(value)
            },
            message: problem => `${problem.value} is not a valid ObjectId`
        }
    },
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        require: true,
        validate: {
            validator: (value) => {
                return /^[a-f\d]{24}$/.test(value)
            },
            message: problem => `${problem.value} is not a valid ObjectId`
        }
    }
})

module.exports = mongoose.model("Question", QuestionSchema)