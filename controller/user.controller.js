const User = require("../models/user.model")
const Course = require("../models/course.model")
const Article = require("../models/article.model")
const Question = require("../models/question.model")
const Delete = require("../delete/deleted.user.model")

const bcrypt = require("bcryptjs")
const auth = require("../middleware/auth.middleware")

// user
exports.newUser = async (req, res, next) => {
    let { firstName, lastName, password, email, courses } = req.body

    try {
        if (!firstName || !lastName || !email || !password || !courses) {
          const err = new Error()
          err.name = "Bad Request"
          err.status = 400
          err.message = "Please fill all details"
          throw err
        }

        const foundUser = await User.findOne({"email": email})

        if (foundUser) {
            const err = new Error()
            err.name = "Not Acceptable"
            err.status = 406
            err.message = "This user already exit"
            throw err
        }

        nP = await bcrypt.hash(password, 15)
        password = nP
        const createUser = 
        ({
            firstName,
            lastName,
            password,
            email,
            courses
        })
        const user = await new User( createUser )
        user.save()

        const userJson = auth.authJSON(user)
        res.status(201).json({
            success: true,
            status: 201,
            message: "User created successfully",
            user: userJson
        })

    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body
  
    try {
      if (!email || !password) {
        const err = new Error()
        err.name = "Bad Request"
        err.status = 400
        err.message = "Please input all details"
        throw err
      }

      const user = await User.findOne({"email": email})
      
      if (!user) {
        const err = new Error()
        err.name = "Authentication Error"
        err.status = 401
        err.message = "This user doesn't exist"
        throw err
      }
      
      const userPW = await user.password
      const isMatch = await auth.compareHash(password, userPW)
      
      if (!isMatch) {
        const err = new Error()
        err.name = "Authentication Error"
        err.status = 401
        err.message = "Passowrd Incorrect"
        throw err
      }
      
      const userJson = auth.authJSON(user)
      res.json({
        success: true,
        user: userJson
      })

    } catch (error) {
      next(error);
    }
}


exports.userUpdate = (req, res, next) => {
    const { firstName, lastName, otherName, password, title, gender, phone, email, zipcode, city, streetName, country, state } = req.body
    const { id } = req.params
    const { DP } = req.files

    try {
        if (!firstName || !lastName || !email || !password) {
          const err = new Error()
          err.name = ""  
        }
    } catch (error) {
        
    }
}

exports.delUser = (req, res, next) => {
    const user = req.user
    User.findById(
        user._id,
       async (err, foundUser) => {
            if (err) {
                res.json({"err": err})
            } else {
                 const delUser = {
                    deleteUser: foundUser.toJSON()
                }
               await Delete.create(delUser, (err, newDelUser) => {
                    if (err) {
                        return err
                    } else {
                        console.log(`from save to Delete forms : \n ${newDelUser}`)
                        newDelUser.save()
                    }
                })
               const del = await User.findByIdAndDelete(user._id)
               res.json(del)
            }
        }
    )
}

// course
exports.courses = (callback) => {
    Course.find({}, callback)
}

// article
exports.getCourseArticle = (article, callback) => {
    Article.find({courseID: article.courseID},
        callback
    )
}

// question
// user should not be able to get the correctAnswer
exports.getCourseQuestion = (question, callback) => {
    Question.find({courseID: question.courseID},
        callback
    )
}

// not working yet
exports.checkAns = (question, callback) => {
    Question.findById(
        question.id,
        callback
    )
}

// application
exports.newApplication = async (application, callback) => {
    User.findById(application._id, (err, foundUser) => {
        if (err) {
            console.log(`${err} from application find user`)
            return err
        } else {
            foundUser.courses.push(application.appID)
            foundUser.save(callback)
        }
    })
}

exports.delApplication = async (application, callback) => {
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