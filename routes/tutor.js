const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")

const User = require("../models/user.model")
const Course = require("../models/course.model")
const controller = require("../controller/tutor.controller")

// user
router.post("/login", (req, res) => {
    const login = {
        email: req.body.email,
        password: req.body.password
    }

    controller.login(login, (err, data) => {
        if (err) {
            res.json({"error": err});
        } else {
            res.json(data);
        }
    })
})

router.get("/", (req, res) => {
    const course = {
        courseID: req.body.courseID
    }

    controller.getCourseUser(course, (err, data) => {
        if (err) {
            res.json({"error": err})
        } else {
            res.json(data)
        }
    })
})

// courses
router.get("/courses", (req, res) => {
    const courses = {
        tutorID: req.body.tutorID,
        // tutorID: req.user._id
    }

    controller.getCourse(courses, (err, data) => {
        if (err) {
            res.json({"error": err})
        } else {
            res.json(data)
        }
    })
})

router.post("/courses", (req, res) => {
    const course = {
        title: req.body.title,
        description: req.body.description,
        // image: req.file.image,
        durationPerQuestion: req.body.durationPerQuestion,
        totalQuestion: req.body.totalQuestion,
        price: req.body.price,
        headline: req.body.headline,
        // tutor: req.user._id,
        tutor: req.body.tutor,
        isPaid: req.body.isPaid,
        isPrivate: req.body.isPrivate,
        numTeachers: req.body.numTeachers,
        priceCurrency: req.body.priceCurrency,
        primaryCategory: req.body.primaryCategory,
        subCategory: req.body.subCategory,
        language: req.body.language,
        statusLabel: req.body.statusLabel
    }

    controller.courses(course, (err, data) => {
        if (err) {
            res.json({"error": err})
        } else {
            res.json(data)
        }
    })
})

router.put("/courses/:id", (req, res) => {
    const course = {
        id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        // image: req.file.image,
        durationPerQuestion: req.body.durationPerQuestion,
        totalQuestion: req.body.totalQuestion,
        price: req.body.price,
        headline: req.body.headline,
        // tutor: req.user._id,
        tutor: req.body.tutor,
        isPaid: req.body.isPaid,
        isPrivate: req.body.isPrivate,
        numTeachers: req.body.numTeachers,
        priceCurrency: req.body.priceCurrency,
        primaryCategory: req.body.primaryCategory,
        subCategory: req.body.subCategory,
        language: req.body.language,
        statusLabel: req.body.statusLabel
    }

    controller.courseUpdate(course, (err, data) => {
        if (err) {
            res.json({"error": err})
        } else {
            res.json(data)
        }
    })
})

router.delete("/courses/:id", (req, res) => {
    const course = {
        id: req.params.id
    }

    controller.delCourse(course, (err, data) => {
        if (err) {
            res.json({"error": err})
        } else {
            res.json(data)
        }
    })
})

// article
router.post("/courses/:id/article", (req, res) => {
    const article = {
        courseID: req.params.id,
        tutor: req.body.tutor,
        section: req.body.section,
        title: req.body.title,
        body: req.body.body
    }

    controller.newArticle(article, (err, data) => {
        if (err) {
            res.json({"error": err})
        } else {
            res.json(data)
        }
    })

})

router.put("/article/:idA", (req, res) => {
    const article = {
        idA: req.params.idA,
        section: req.body.section,
        title: req.body.title,
        body: req.body.body
    }

    controller.articleUpdate(article, (err, data) => {
        if (err) {
            res.json({"error": err})
        } else {
            res.json(data)
        }
    })
})

router.get("/courses/:id/article", (req, res) => {
    const article = {
        courseID: req.params.id
    }

    controller.getCourseArticle(article, (err, data) => {
        if (err) {
            res.json({"error": err})
        } else {
            res.json(data)
        }
    })
})

router.delete("/article/:idA", (req, res) => {
    const article = {
        idA: req.params.idA
    }

    controller.delArticle(article, (err, data) => {
        if (err) {
            res.json({"error": err})
        } else {
            res.json(data)
        }
    })
})

// questions
router.post("/courses/:id/question", (req, res) => {
    const question = {
        courseID: req.params.id,
        // tutor: req.user.id,
        tutor: req.body.tutor,
        question: req.body.question,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4,
        correctAnswer: req.body.correctAnswer
    }

    controller.newQuestion(question, (err, data) => {
        if (err) {
            res.json({"error": err})
        } else {
            res.json(data)            
        }
    })
})

router.get("/courses/:id/question", (req, res) => {
    const question = {
        courseID: req.params.id
    }

    controller.getCourseQuestion(question, (err, data) => {
        if (err) {
            res.json({"error": err})
        } else {
            res.json(data)
        }
    })
})

router.put("/question/:idQ", (req, res) => {
    const question = {
        idQ: req.params.idQ,
        // tutor: req.user.id,
        tutor: req.body.tutor,
        question: req.body.question,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4,
        correctAnswer: req.body.correctAnswer
    }

    controller.questionUpdate(question, (err, data) => {
        if (err) {
            res.json({"error": err})
        } else {
            res.json(data)
        }
    })
})

router.delete("/question/:idQ", (req, res) => {
    const question = {
        idQ: req.params.idQ
    }

    controller.delQuestion(question, (err, data) => {
        if (err) {
            res.json({"error": err})
        } else {
            res.json(data)
        }
    })
})

module.exports = router;