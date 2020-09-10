const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        require: true,
        unique: true
    },
    description: {
        type:String,
        trim: true,
        require: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    durationPerQuestion: {
        type: Number,
        trim: true,
        default: 10,
        require: true
    },
    totalQuestion: {
        type: Number,
        trim: true,
        require: true
    },
    headline: {
        type: String,
        trim: true,
        require: true
    },
    isPaid: {
        type: Boolean,
        default: true
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    numTeachers: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        require: true,
    },
    priceCurrency: {
        type: String,
        default: "USD"
    },
    tutor: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "tutor",
        require: true,
        trim: true,
    },
    archiveTime : {
        type: Date,
    },
    primaryCategory: {
        type: [mongoose.Schema.Types.ObjectId], ref: "Category"
    },
    subCategory: {
        type: [mongoose.Schema.Types.ObjectId], ref: "Subcategory"
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
    },
    article: [{}]
}, {timestamps: true})

const Course = module.exports = mongoose.model("Course", CourseSchema);