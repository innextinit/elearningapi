const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")

const User = require("../models/user.model")
const Course = require("../models/course.model")
const middlewares = require("../middlewares/tutor.middleware")

// user
router.get("/", (req, res) => {
    const course = {
        courseID: req.body.courseID
    }

    middlewares.getCourseUser(course, (err, data) => {
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

    middlewares.getCourse(courses, (err, data) => {
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

    middlewares.courses(course, (err, data) => {
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

    middlewares.courseUpdate(course, (err, data) => {
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

    middlewares.delCourse(course, (err, data) => {
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

    middlewares.newArticle(article, (err, data) => {
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

    middlewares.articleUpdate(article, (err, data) => {
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

    middlewares.getCourseArticle(article, (err, data) => {
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

    middlewares.delArticle(article, (err, data) => {
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

    middlewares.newQuestion(question, (err, data) => {
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

    middlewares.getCourseQuestion(question, (err, data) => {
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

    middlewares.questionUpdate(question, (err, data) => {
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

    middlewares.delQuestion(question, (err, data) => {
        if (err) {
            res.json({"error": err})
        } else {
            res.json(data)
        }
    })
})

module.exports = router;