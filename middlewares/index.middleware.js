const User = require("../models/user.model")
const Course = require("../models/course.model")
const Article = require("../models/article.model")
const Question = require("../models/question.model")
const bcrypt = require("bcrypt");
const { application } = require("express");

// user
module.exports.newUser = async (user, callback) => {
    User.create(user, (err, newUser) => {
        if (err) {
            console.log(`${err} from create user`)
            return err
        } else {
            newUser.save(callback)
        }
    })
}

module.exports.userUpdate = (user, callback) => {
    User.findByIdAndUpdate(
        user.id,
        {
            "firstName": user.firstName,
            "lastName": user.lastName,
            "otherName": user.otherName,
            "title": user.title,
            "gender": user.gender,
            "phone": user.phone,
            "email": user.email,
            "zipcode": user.zipcode,
            "city": user.city,
            "streetName": user.streetName,
            "country": user.country,
            "state": user.state,
            "hasActivated": user.hasActivated,
            "isDisable": user.isDisable,
            "role": user.role,
            "DP": user.DP,
            "course": user.course,
            "password": user.password
        },
        {new: true, upsert: true},
        callback
    )
}

module.exports.delUser = (user, callback) => {
    User.findByIdAndDelete(
        user.id,
        callback
    )
}

// course
module.exports.delCourse = (course, callback) => {
    Course.findByIdAndDelete(
        course.id,
        callback
    )
}

module.exports.courses = (course, callback) => {
    const newCourse = new Course(course)
    newCourse.save(callback)
}

module.exports.courseUpdate = (course, callback) => {
    Course.findByIdAndUpdate(
        course.id,
        {
            "title": course.title,
            "description": course.description,
            "image": course.image,
            "durationPerQuestion": course.durationPerQuestion,
            "totalQuestion": course.totalQuestion,
            "price": course.price,
            "headline": course.headline
        },
        {new: true, upsert: true},
        callback
    )
}

// article
module.exports.delArticle = (article, callback) => {
    Article.findByIdAndDelete(
        article.idA,
        callback
    )
}

module.exports.newArticle = (article, callback) => {
    Article.create(article, (err, newArticle) => {
        if (err) {
            console.log(`${err} from create article`)
            console.log(err)
        } else {
            newArticle.save(callback)
        }
    })
}

module.exports.articleUpdate = (article, callback) => {
    Article.findByIdAndUpdate(
        article.idA,
        {
            "section": article.section,
            "title": article.title,
            "body": article.body
        },
        {new: true, upsert: true},
        callback
    )
}

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

module.exports.newQuestion = (question, callback) => {
    Question.create(question, (err, newQuestion) => {
        if (err) {
            console.log(`${err} from create question`)
            return err
        } else {
            newQuestion.save(callback)
        }
    })
}

module.exports.questionUpdate = (question, callback) => {
    Question.findByIdAndUpdate(
        question.idQ,
        {
            "question": question.question,
            "option1": question.option1,
            "option2": question.option2,
            "option3": question.option3,
            "option4": question.option4,
            "correctAnswer": question.correctAnswer
        },
        {new: true, upsert: true},
        callback
    )
}

module.exports.delQuestion = (question, callback) => {
    Question.findByIdAndDelete(
        question.idQ,
        callback
    )
}

// application
module.exports.newApplication = async (application, callback) => {
    User.findById(application._id, (err, foundUser) => {
        if (err) {
            console.log(`${err} from application find user`)
            return err
        } else {
            foundUser.course.push(application.appID)
            foundUser.save(callback)
        }
    })
}

module.exports.delApplication = (application, callback) => {
    var newApplication
    User.findById(
        application.id, (err, foundUser) => {
            if (err) {
                return err
            } else {
                newApplication = foundUser.course.filter((course) => {
                    return course != application.appID
                })
                console.log(newApplication)
            }
        }
    ), callback

    console.log(newApplication)

    // User.findByIdAndUpdate(
    //     application.id,
    //     newApplication,
    //     console.log(newApplication),
    //     {new: true, upsert: true},
    //     console.log(callback),
    //     callback
    // )
}