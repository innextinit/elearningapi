const User = require("../models/user.model")
const Course = require("../models/course.model")
const Article = require("../models/article.model")
const Question = require("../models/question.model")
const Delete = require("../delete/deleted.user.model")

const passport = require("passport")
const bcrypt = require("bcrypt");

// user
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

module.exports.login = async (login, callback) => {
    // const user = await User.findOne({"email": login.email})
    // if (!user) {
    //     console.log("no user found")
    // } else {
    //     console.log(user)
    // }

    // const validPW = await bcrypt.compare(login.password, user.password)
    // if (!validPW) {
    //     console.log("incorrect password")
    // } else {
    //     console.log(validPW)
    // }


    passport.use(new LocalStrategy(
        (email, password, done) => {
          User.findOne({ email: email }, (err, user) => {
            console.log(user)
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
          });
        }
      ));
    
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
            "DP": user.DP
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
                console.log(`from convert .toJSON : \n ${delUser}`)
               await Delete.create(delUser, (err, newDelUser) => {
                    if (err) {
                        return err
                    } else {
                        console.log(`from save to Delete forms : \n ${newDelUser}`)
                        newDelUser.save()
                    }
                })
               await User.findByIdAndDelete(user.id, callback)
            }
        }
    )
}

// course
module.exports.courses = (callback) => {
    Course.find({}, callback)
}

// article
module.exports.getCourseArticle = (article, callback) => {
    Article.find({courseID: article.courseID},
        callback
    )
}

// question
// user should not be able to get the correctAnswer
module.exports.getCourseQuestion = (question, callback) => {
    Question.find({courseID: question.courseID},
        callback
    )
}

// not working yet
module.exports.checkAns = (question, callback) => {
    Question.findById(
        question.id,
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
            foundUser.courses.push(application.appID)
            foundUser.save(callback)
        }
    })
}

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