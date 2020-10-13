const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema({
    certificates: {
        type: [mongoose.Schema.Types.ObjectId], ref: "courses",
        validate: {
            validator: (value) => {
                return /^[a-f\d]{24}$/.test(value)
            },
            message: problem => `${problem.value} is not a valid ObjectId`
        }
    },
    completed_assessments: {
        type: [mongoose.Schema.Types.ObjectId], ref: "courses",
        validate: {
            validator: (value) => {
                return /^[a-f\d]{24}$/.test(value)
            },
            message: problem => `${problem.value} is not a valid ObjectId`
        }
    },
    courses: {
        type: [mongoose.Schema.Types.ObjectId], ref: "courses",
        validate: {
            validator: (value) => {
                return /^[a-f\d]{24}$/.test(value)
            },
            message: problem => `${problem.value} is not a valid ObjectId`
        }
    }
})

module.exports = mongoose.model("Dashboard", dashboardSchema)