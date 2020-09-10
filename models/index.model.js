const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema({
    certificates: {
        type: [mongoose.Schema.Types.ObjectId], ref: "courses"
    },
    completed_assessments: {
        type: [mongoose.Schema.Types.ObjectId], ref: "courses"
    },
    courses: {
        type: [mongoose.Schema.Types.ObjectId], ref: "courses"
    }
})