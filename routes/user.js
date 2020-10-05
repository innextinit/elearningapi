const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")

const Course = require("../models/course.model")
const middlewares = require("../middlewares/index.middleware")
const auth = require("../middlewares/auth.middleware")

// user
router.post("/", (req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        otherName: req.body.otherName,
        title: req.body.title,
        gender: req.body.gender,
        phone: req.body.phone,
        email: req.body.email,
        zipcode: req.body.zipcode,
        city: req.body.city,
        streetName: req.body.streetName,
        country: req.body.country,
        state: req.body.state,
        hasActivated: req.body.hasActivated,
        isDisable: req.body.isDisable,
        role: req.body.role,
        DP: req.body.DP,
        course: req.body.course,
        password: req.body.password
    }

    middlewares.newUser(user, (err, data) => {
        if (err) {
            res.json({"error": err});
        } else {
            res.json(data);
        }
    })
})

router.put("/:id", (req, res) => {
    const user = {
        id: req.params.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        otherName: req.body.otherName,
        title: req.body.title,
        gender: req.body.gender,
        phone: req.body.phone,
        email: req.body.email,
        zipcode: req.body.zipcode,
        city: req.body.city,
        streetName: req.body.streetName,
        country: req.body.country,
        state: req.body.state,
        hasActivated: req.body.hasActivated,
        isDisable: req.body.isDisable,
        role: req.body.role,
        DP: req.body.DP,
        course: req.body.course,
        password: req.body.password
    }

    middlewares.userUpdate(user, (err, data) => {
        if (err) {
            res.json({"error": err});
        } else {
            res.json(data);
        }
    })
})

router.delete("/:id", (req, res) => {
    middlewares.delUser(user, )
})

// courses
router.post("/application", (req, res) => {
    const application = {
        course_id: req.body.course_id,
        //_id: req.user._id,
        _id: req.body._id
    }

    middlewares.newApplication(application, (err, newApplication) => {
        if (err) {
            res.json({"errror": err});
        } else {
            res.json(newApplication)
        }
    })
});

router.get("/courses", (req, res) => {
    Course.find({}, (err, course) => {
        if (err) {
            res.json({"error": err})
        } else {
            res.json(course)
        }
    })
})

// article
router.get("/courses/:id/article", (req, res) => {
    const article = {
        courseID: req.params.id
    }

    middlewares.getCourseArticle(article, (err, data) => {
        if (err) {
            res.json({"error": err})
        } else {
            res.json(data)
        }
    })
})

// questions
router.get("/courses/:id/question", (req, res) => {
    const question = {
        courseID: req.params.id
    }

    middlewares.getCourseQuestion(question, (err, data) => {
        if (err) {
            res.json({"error": err})
        } else {
            res.json(data)
        }
    })
})

module.exports = router;