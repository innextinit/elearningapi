const bcrypt = require("bcrypt")
const User = require("../models/user.model")
const Course = require("../models/course.model")
const Article = require("../models/article.model")
const Question = require("../models/question.model")
const Delete = require("../delete/deleted.user.model")


// user
module.exports.user = (callback) => {
    User.find({}, callback)
}

module.exports.findUser = (userEmail, callback) => {
    User.find({email: userEmail.email}).populate("courses").exec(callback)
}

module.exports.newUser = async (user, callback) => {
    try {
        let hash = await bcrypt.hash(user.password, 15)
        user.password = hash
        newUser = new User(
            user
        )
        newUser.save(callback)
    } catch (error) {
        return error
    }
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
            "DP": user.DP,
            "password": user.password,
            "role": user.role,
            "courses" : user.courses
        },
        {new: true, upsert: true},
        callback
    )
}

module.exports.delUser = (user, callback) => {
    User.findById(
        user.id,
       async (err, foundUser) => {
            if (err) {
                return err
            } else {
                 const delUser = {
                    deleteUser: foundUser.toJSON()
                }
               await Delete.create(delUser, (err, newDelUser) => {
                    if (err) {
                        return err
                    } else {
                        newDelUser.save()
                    }
                })
               await User.findByIdAndDelete(user.id, callback)
            }
        }
    )
}

// course
module.exports.course = (callback) => {
    Course.find({}, callback)
}

module.exports.findCourse = (courseTitle, callback) => {
    Course.find({title: courseTitle.title}, callback)
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
module.exports.getCourseArticle = (article, callback) => {
    Article.find({courseID: article.courseID},
        callback
    )
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

module.exports.questionUpdate = (question, callback) => {
    Question.findByIdAndUpdate(
        question.idQ,
        {
            "question": question.question,
            "option1": question.option1,
            "option2": question.option2,
            "option3": question.option3,
            "option4": question.option4,
            "correctAnswer": question.correctAnswer,
            "tutor": question.tutor
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