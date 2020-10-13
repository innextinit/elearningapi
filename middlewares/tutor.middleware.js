const User = require("../models/user.model")
const Course = require("../models/course.model")
const Article = require("../models/article.model")
const Question = require("../models/question.model")
const bcrypt = require("bcrypt");
const { application } = require("express");

// user
module.exports.getCourseUser = (course, callback) => {
    User.find(
        {courses: course.courseID},
        callback
    )
}

// course
module.exports.getCourse = (courses, callback) => {
    Course.find(
        {tutor: courses.tutorID},
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
            "headline": course.headline,
            "tutor": course.tutor,
            "isPaid": course.isPaid,
            "isPrivate": course.isPrivate,
            "numTeachers": course.numTeachers,
            "priceCurrency": course.priceCurrency,
            "tutor": course.tutor,
            "primaryCategory": course.primaryCategory,
            "subCategory": course.subCategory,
            "language": course.language,
            "statusLabel": course.statusLabel
        },
        {new: true, upsert: true},
        callback
    )
}

module.exports.delCourse = async (course, callback) => {
    await Article.find(
        {courseID: course.id}, async (err, foundArticles) => {
            if (err) {
                return err
            } else {
                for (const _id in foundArticles) {
                    if (foundArticles.hasOwnProperty(_id)) {
                        const element = foundArticles[_id];
                       await Article.findByIdAndDelete(
                            element._id,
                            (err, data) => {
                                if (err) {
                                    return err
                                } else {
                                    console.log(data)
                                }
                            }
                        )
                    }
                }
            }
        }
    )

    await Question.find(
        {courseID: course.id}, async (err, foundQuestions) => {
            if (err) {
                return err
            } else {
                for (const _id in foundQuestions) {
                    if (foundQuestions.hasOwnProperty(_id)) {
                        const element = foundQuestions[_id];
                        await Question.findByIdAndDelete(
                            element._id,
                            (err, data) => {
                                if (err) {
                                    return err
                                } else {
                                    console.log(data)
                                }
                            }
                        )
                    }
                }
            }
        }
    ),

    await Course.findByIdAndDelete(
        course.id,
        callback
    )
}

// article

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

module.exports.delArticle = (article, callback) => {
    Article.findByIdAndDelete(
        article.idA,
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