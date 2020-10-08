const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        require: true,
        unique: true,
        validate: {
            validator : (value) => {
                return /^\w+\s$/g.test(value)
            },
            message: problem => `${problem.value} is not a valid title`
        }
    },
    description: {
        type:String,
        trim: true,
        require: true,
        validate: {
            validator : (value) => {
                return /^\w+\s$/g.test(value)
            },
            message: problem => `${problem.value} is not a valid description`
        }
    },
    image: {
        data: Buffer,
        contentType: String
    },
    durationPerQuestion: {
        type: Number,
        trim: true,
        default: 10,
        require: true,
        validate: {
            validator: (value) => {
                return /\d{1,2}/.test(value)
            },
            message: problem => `${problem.value} should be number is seconds`
        }
    },
    totalQuestion: {
        type: Number,
        trim: true,
        require: true,
        validate: {
            validator: (value) => {
                return /\d{1,2}/.test(value)
            },
            message: problem => `${problem.value} should be total number of questions`
        }
    },
    headline: {
        type: String,
        trim: true,
        require: true,
        validate: {
            validator : (value) => {
                return /^(\w+\s){30,500}$/g.test(value)
            },
            message: problem => `${problem.value} is not a valid description`
        }
    },
    isPaid: {
        type: Boolean,
        default: true,
        validate: {
            validator: (value) => {
                return /(true|false)/
            },
            message: problem => `${problem.value} is not a valid Boolean expression`
        }
    },
    isPrivate: {
        type: Boolean,
        default: false,
        validate: {
            validator: (value) => {
                return /(true|false)/
            },
            message: problem => `${problem.value} is not a valid Boolean expression`
        }
    },
    numTeachers: {
        type: Number,
        default: 1,
        validate: {
            validator: (value) => {
                return /\d{1,5}/.test(value)
            },
            message: problem => `${problem.value} should be total number of tutors`
        }
    },
    price: {
        type: Number,
        require: true,
        validate: {
            validator: (value) => {
                return /(true|false)/
            },
            message: problem => `${problem.value} is not a valid Boolean expression`
        }
    },
    priceCurrency: {
        type: String,
        default: "USD"
    },
    tutor: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "tutor",
        require: true,
        validate: {
            validator: (value) => {
                return /^[a-f\d]{24}$/.test(value)
            },
            message: problem => `${problem.value} is not a valid ObjectId`
        }
    },
    archiveTime : {
        type: Date,
    },
    primaryCategory: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Category",
        validate: {
            validator: (value) => {
                return /^[a-f\d]{24}$/.test(value)
            },
            message: problem => `${problem.value} is not a valid ObjectId`
        }
    },
    subCategory: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Subcategory",
        validate: {
            validator: (value) => {
                return /^[a-f\d]{24}$/.test(value)
            },
            message: problem => `${problem.value} is not a valid ObjectId`
        }
    },
    language: {
        type: String,
        enum: ["En", "Yr", "Dot", "Sp"],
        default: "En"
    },
    statusLabel: {
        type: String,
        enum: ["active", "archive", "deleted", "isPrivate", "notActive"],
        default: "notActive"
    }
}, {timestamps: true})

module.exports = mongoose.model("Course", CourseSchema);