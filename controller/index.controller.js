const Course = require("../models/course.model")

// course
exports.courses = async (req, res, next) => {
    let course = await Course.find({})
    try {
        if (!course || course === ' ') {
            let err = new Error()
            err.name = "Bad Request"
            err.status = 400
            err.message = "No Courses Yet, Upload Courses"
            throw err
        }
        res.json(course)
    } catch (error) {
        next(error)
    }
}