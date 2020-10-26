const User = require("../models/user.model")
const Course = require("../models/course.model")
const Article = require("../models/article.model")
const Question = require("../models/question.model")
const bcrypt = require("bcryptjs");
const { application } = require("express");

// user
module.exports.findUser = (userMail, callback) => {
    User.find({email: userMail.query}, callback)//.populate("courses").exec(callback)
}

module.exports.login = async (login, callback) => {
    const user = await User.findOne({"email": login.email})
    if (!user) {
        console.log("no user found")
    } else {
        console.log(user)
    }

    const validPW = await bcrypt.compare(login.password, user.password)
    if (!validPW) {
        console.log("incorrect password")
    } else {
        console.log(validPW)
    }
}

module.exports.userUpdate = (user, callback) => {
    User.findByIdAndUpdate(
        user.id,
        {
            "isDisable": user.isDisable,
            "hasActivated": user.hasActivated
        },
        {new: true, upsert: true},
        callback
    )
}

// course
module.exports.findCourse = (courseTitle, callback) => {
    Course.find({title: courseTitle.title}, callback)
}

module.exports.courseUpdate = (course, callback) => {
    Course.findByIdAndUpdate(
        course.id,
        {
            "title": course.title,
            "description": course.description,
            "durationPerQuestion": course.durationPerQuestion,
            "totalQuestion": course.totalQuestion,
            "price": course.price,
            "headline": course.headline,
            "isPaid": course.isPaid,
            "tutor": course.tutor,
            "isPrivate": course.isPrivate,
            "numTeachers": course.numTeachers,
            "priceCurrency": course.priceCurrency,
            "primaryCategory": course.primaryCategory,
            "subCategory": course.subCategory,
            "language": course.language,
            "statusLabel": course.statusLabel
        },
        {new: true, upsert: true},
        callback
    )
}

// article
module.exports.getCourseArticle = (article, callback) => {
    Article.find({courseID: article.courseID},
        callback
    )
}

// question
module.exports.getCourseQuestion = (question, callback) => {
    Question.find({courseID: question.courseID},
        callback
    )
}

// application
module.exports.delApplication = async (application, callback) => {
    await User.findById(
        application.id, (err, foundUser) => {
            if (err) {
                return err
            } else {
                foundUser.updateOne({"courses": foundUser.courses.filter((course) => { 
                    return course != application.appID
                })}, callback)
            }
        }
    )
}