const bcrypt = require("bcryptjs/dist/bcrypt")
const jwt = require("jsonwebtoken")
const decode = require("jsonwebtoken/decode")
const User = require("../models/user.model")

const getToken = (req) => {
    let { headers: { authorization }} = req
    if (typeof authorization === "undefined") {
        authorization = ""
        return "authorization needed"
    }
    if (authorization && authorization.split(" ")[0] === "Bearer" || authorization.split(' ')[0] === "Token") {
        return authorization.split(" ")[1]
    }
    return null
}

const decodeToken = async (req, res, next) => {
    const token = await getToken(req)
    try {
        const decoded = await jwt.verify(token, process.env.TOKEN_KEY)
        const user = await User.findOne({"email": decoded.email})
        if (!user) throw Error("User Doesnt't Exist")
        req.user = user
        next()
        
    } catch (error) {
        next(error)
    }
}

const compareHash = (password, userPW) => {
    return bcrypt.compareSync(password, userPW)
}

const authJSON = function (user) {
    return {
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        token: this.genToken(user)
    }
}

const genToken = (user) => {
    const secret = process.env.TOKEN_KEY
    return jwt.sign(
        {
            email: user.email,
            role: user.role,
            firstName: user.firstName
        },
        secret,
        {
            expiresIn: 3600
        }
    )
}

// const isAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         console.log("isAuthenticated")
//         return next()
//     } else {
//         res.send("login please")
//     }
// }

// const isUser = (req, res, next) => {
//     if (req.user.role === "user") {
//         return next()
//     } else {
//         res.json({"message": "role isnt user"})
//     }
// }

// const isTutor = (req, res, next) => {
//     if (req.user.role === "tutor") {
//         return next()
//     } else {
//         res.json({"message": "role isnt tutor"})
//     }
// }

// const isAdmin = (req, res, next) => {
//     if (req.user.role === "admin") {
//         return next()
//     } else {
//         res.json({"message": "role isnt admin"})
//     }
// }

// const isCS = (req, res, next) => {
//     if (req.user.role === "cs") {
//         return next()
//     } else {
//         res.json({"message": "role isnt customer service"})
//     }
// }

// const isCourseOwner = (req, res, next) => {
//     if (courseID === req.user._id) {
//         return next()
//     } else {
//         res.json({"message": "you dont own this course >("})
//     }
// }

// const isArticleOwner = (req, res, next) => {
//     if (articleID === req.user._id) {
//         return next()
//     } else {
//         res.json({"message": "you dont own this article >("})
//     }
// }

// const isQuestionOwn = (req, res, next) => {
//     if (questionID === req.user._id) {
//         return next()
//     } else {
//         res.json({"message": "you dont own this question >("})
//     }
// }

// const isCourseMember = (req, res, next) => {
//     if (req.user._id  ) {
//         return next()
//     } else {
//         res.json({"message": "you not a member of this course"})
//     }
// }

// const isHavingCouse = (req, res, next) => {
//     if (req.user.courses.courseID === "courseID") {
//         return next()
//     } else {
//         res.json({"message": "you arent having this course"})
//     }
// }

module.exports = {
    getToken,
    decodeToken,
    compareHash,
    authJSON,
    genToken,
    // isAuthenticated,
    // isUser,
    // isTutor,
    // isAdmin,
    // isCS,
    // isCourseOwner,
    // isArticleOwner,
    // isQuestionOwn,
    // isCourseMember,
    // isHavingCouse
}