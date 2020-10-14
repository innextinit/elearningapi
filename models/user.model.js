const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        require: true,
        validate: {
            validator: (value) => {
                return /^[a-zA-Z]{2,15}$/.test(value)
            },
            message: problem => `${problem.value} is not a valid name`
        }
    },
    lastName: {
        type: String,
        trim: true,
        require: true,
        validate: {
            validator: (value) => {
                return /^[a-zA-Z-]{2,15}$/.test(value)
            },
            message: problem => `${problem.value} is not a valid name`
        }
    },
    otherName: {
        type:String,
        trim: true,
        validate: {
            validator: (value) => {
                return /^[a-zA-Z]{2,15}$/.test(value)
            },
            message: problem => `${problem.value} is not a valid name`
        }
    },
    title: {
        type: String,
        trim: true,
        enum: ["Mr", "Mrs", "Dr", "Prof"],
        validate: {
            validator: (value) => {
                return /^(Mr|Mrs|Dr|Prof)$/.test(value)
            },
            message: problem => `${problem.value} is not part of the title`
        }
    },
    gender: {
        type: String,
        trim: true,
        enum: ["Male", "Female", "Non-Disclose"],
        default: "Non-Disclose",
        validate: {
            validator: (value) => {
                return /^(Male|Female|Non-Disclose)$/
            }
        }
    },
    phone: {
        type: Number,
        trim: true,
        validate: {
            validator: (value) => {
                return /^(\d{3})+(\d{3})+(\d{3})+(\d{4})$/.test(value)
            },
            message: problem => `${problem.value} is not valid`
        }
    },
    email: {
        type: String,
        trim: true,
        require: true,
        unique: true,
        validate: {
            validator: (value) => {
                return /^([\w-.]{3,})+@([\w-.]{3,15})+.([a-zA-Z]{2,3})$/.test(value)
            },
            message: problem => `${problem.value} is not valid`
        }
    },
    zipcode: {
        type: Number,
        trim: true,
        validate: {
            validator: (value) => {
                return /^([\d-]{5,10})$/.test(value)
            },
            message: problem => `${problem.value} is not valid`
        }
    },
    city: {
        type: String,
        trim: true,
        validate: {
            validator: (value) => {
                return /^[a-zA-Z-]{2,15}$/.test(value)
            },
            message: problem => `${problem.value} is not valid`
        }
    },
    streetName: {
        type: String,
        trim: true,
        validate: {
            validator: (value) => {
                return /^[a-zA-Z-]{2,15}$/.test(value)
            },
            message: problem => `${problem.value} is not valid`
        }
    },
    country: {
        type: String,
        trim: true,
        validate: {
            validator: (value) => {
                return /^[a-zA-Z-]{2,20}$/.test(value)
            },
            message: problem => `${problem.value} is not valid`
        }
    },
    state: {
        type: String,
        trim: true,
        validate: {
            validator: (value) => {
                return /^[a-zA-Z-]{2,15}$/.test(value)
            },
            message: problem => `${problem.value} is not valid`
        }
    },
    hasActivated: {
        type: Boolean,
        default: false,
        validate: {
            validator: (value) => {
                return /(true|false)/.test(value)
            },
            message: problem => `${problem.value} is not valid`
        }
    },
    isDisable: {
        type: Boolean,
        default: false,
        validate: {
            validator: (value) => {
                return /(true|false)/.test(value)
            },
            message: problem => `${problem.value} is not valid`
        }
    },
    role: {
        type: String,
        enum: ["user", "tutor", "admin", "cs"],
        default: "user",
        require: true,
        validate: {
            validator: (value) => {
                return /(user|tutor|admin|cs)/.test(value)
            },
            message: problem => `${problem.value} is not valid`
        }
    },
    DP: {
        data: Buffer,
        contentType: String
    },
    courses: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Courses",
        validate: {
            validator: (value) => {
                return /^[a-f\d]{24}$/.test(value)
            },
            message: problem => `${problem.value} is not a valid ObjectId`
        }
    },
    password: {
        type: String,
        minlength: 12,
        bcrypt: true,
        require: true,
        trim: true,
        validate: {
            validator: (value) => {
                return /^([(\w)?+(\W)?]{8,})$/g.test(value)
            },
            message: problem => `${problem.value} is not a valid password`
        }
    }
}, {timestamps: true});

// virtual userurl
UserSchema.virtual("url").get(function(){
    return `/${this._id}`;
  });

module.exports = mongoose.model("User", UserSchema);