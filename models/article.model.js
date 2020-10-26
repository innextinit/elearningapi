const mongoose = require("mongoose")

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        require: true,
        validate: {
            validator : (value) => {
                return /[\w+\s'.]/g.test(value)
            },
            message: problem => `${problem.value} is not a valid title`
        }
    },
    section: {
        type: Number,
        trim: true,
        require: true,
        validate: {
            validator: (value) => {
                return /\d{1,2}/.test(value)
            },
            message: problem => `${problem.value} should be a number not more then 2 char long`
        }
    },
    body: {
        type: String,
        trim: true,
        require: true,
        validate: {
            validator: (value) => {
                return /[\w+\s'.,]/g.test(value)
            },
            message: problem => `${problem.value} text should be within a-zA-Z0-9 and white space`
        }
    },
    tutor: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Tutor",
        validate: {
            validator: (value) => {
                return /^[a-f\d]{24}$/g.test(value)
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

module.exports = mongoose.model("Article", ArticleSchema)