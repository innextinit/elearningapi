const User = require("../models/user.model")
const Course = require("../models/course.model")
const Delete = require("../delete/deleted.user.model")

const bcrypt = require("bcryptjs")
const auth = require("../middleware/auth.middleware")

// user
exports.newUser = async (req, res, next) => {
    let { firstName, lastName, password, email } = req.body

    try {
        if (!firstName || !lastName || !email || !password) {
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
            email
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


exports.userUpdate = async (req, res, next) => {
    const user = req.user
    let { firstName, lastName, otherName, title, gender, phone, zipcode, city, streetName, country, state } = req.body
    const update = await User.findByIdAndUpdate(
        user._id,
        {
            firstName, lastName, otherName, title, gender, phone, zipcode, city, streetName, country, state
        },
        {
            upsert: true,
            new: true
        }
    )
    res.json(update)
}

exports.delUser = async (req, res, next) => {
    const user = req.user
    console.log(user)
    try {
        const findUser = await User.findById(user._id)
        if (!findUser) {
            const err = new Error()
            err.name = "Not Acceptable"
            err.status = 406
            err.message = "Could not find the User"
            throw err
        }

        const delUser = await user.toJSON()
        await Delete.create(delUser)
        const del = await User.findByIdAndDelete(user._id)
        res.json(del)
    } catch (error) {
        next(error)
    }
}

// application || course registration
exports.newApplication = async (req, res, next) => {
    const user = await req.user
    const { appID } = await req.body
    const foundUser = await User.findById(user._id)
    const course = await Course.findById(appID)

    const isStudentForCourse = (id) => {
        if (course.users.indexOf(id) !== -1) {
            return true
        }
    }

    const amTakingCourse = (id) => {
        if (foundUser.courses.indexOf(id) !== -1) {
            return true
        }
    }

    try {
        if (!course) {
            let err = new Error()
            err.name = "Authentication Error"
            err.status = 401
            err.message = "This course doesn't exist"
            throw err
        }
        if (isStudentForCourse(user._id) && amTakingCourse(course._id)) {
            res.json(`You are already a student of this course ${course.title}`)
        }
        let addUserToCourse = await course.users.push(user._id)
        console.log(addUserToCourse)
        await course.save()
        let addCourseToUser = await foundUser.courses.push(appID)
        console.log(addCourseToUser)
        await foundUser.save()
        res.json({"mesage": `You have successfully registered for the course ${course.title}`})
    } catch (error) {
        next(error)
    }
}

exports.delApplication = async (req, res, next) => {
    const user = req.user
    const { appID } = req.body
    const foundUser = await User.findById(user._id)
    const course = await Course.findById(appID)

    const isStudentForCourse = (studentID) => {
        if (course.users.indexOf(studentID) !== -1) {
            return true
        }
    }

    const amTakingCourse = (courseID) => {
        if (foundUser.courses.indexOf(courseID) !== -1) {
            return true
        }
    }

    try {
        if (!isStudentForCourse(user._id) || !amTakingCourse(course._id)) {
            res.json(`You did not register for this course ${course.title}`)
        }

        // removeUserFromCourse
        await course.updateOne({ "users" : course.users.filter((usersList) => {
            usersList != user._id
            
        })})

        // removeCourseFromUser
        await foundUser.updateOne({ "courses": foundUser.courses.filter((courseList) => {
            courseList != course._id
            
        })})

        const havingCourse = await isStudentForCourse(course._id)
        if (!havingCourse) {
            res.json({
                "message":`You have successfully leave this course ${course.title}`
            })
        }
    } catch (error) {
        next(error)
    }
}