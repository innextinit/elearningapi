const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        require: true
    },
    lastName: {
        type: String,
        trim: true,
        require: true
    },
    otherName: {
        type:String,
        trim: true
    },
    title: {
        type: String,
        trim: true,
        enum: ["", "Mr", "Mrs", "Dr", "Prof"],
        default: ""
    },
    gender: {
        type: String,
        trim: true,
        enum: ["Male", "Female", "Non-Disclose"],
        default: "Non-Disclose"
    },
    phone: {
        type: Number,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        require: true,
        unique: true
    },
    zipcode: {
        type: Number,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    streetName: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    },
    state: {
        type: String,
        trim: true
    },
    hasActivated: {
        type: Boolean,
        default: false
    },
    isDisable: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["user", "tutor", "admin", "customS"],
        default: "user",
        require: true
    },
    DP: {
        data: Buffer,
        contentType: String
    },
    course: {
        type: [mongoose.Schema.Types.ObjectId], ref: "courses"
    },
    password: {
        type: String,
        minlength: 12,
        bcrypt: true,
        require: true,
        trim: true
    }
}, {timestamps: true});

// virtual userurl
UserSchema.virtual("url").get(function(){
    return `/${this._id}`;
  });

const User = module.exports = mongoose.model("User", UserSchema);