const express = require("express")
const router = express.Router()
const middlewares = require("../middlewares/index.middleware")

// courses
router.get("/courses", (req, res) => {
    middlewares.course((err, data) => {
        if (err) {
            res.json({"error": err})
        } else {
            res.json(data)
        }
    })
})

// user
router.get("/", (req, res) => {
    middlewares.user((err, user) => {
        if (err) {
            res.json({"error": err})
        } else {
            res.json(user)
        }
    })
})

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
        DP: req.body.DP,
        password: req.body.password,
        role: req.body.role,
        courses: req.body.courses
    }

    middlewares.newUser(user, (err, data) => {
        if (err) {
            res.json({"error": err});
        } else {
            res.json(data);
        }
    })
})

// query
router.get("/query", (req, res) => {
    const userEmail = {
        email: req.query.email
    }

    middlewares.findUser(userEmail, (err, data) => {
        if (err) {
            res.json({"error": err})
        } else {
            res.json(data)
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
        DP: req.body.DP,
        password: req.body.password,
        role: req.body.role,
        courses: req.body.courses
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
    const user = {
        id: req.params.id
    }

    middlewares.delUser(user, (err, data) => {
        if (err) {
            res.json({"error": err})
        } else {
            res.json(data)
        }
    })
})

// courses
router.get("/courses/query", (req, res) => {
    const courseTitle = {
        title: req.query.title
    }

    middlewares.findCourse(courseTitle, (err, data) => {
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
        isPaid: req.body.isPaid,
        isPrivate: req.body.isPrivate,
        numTeachers: req.body.numTeachers,
        priceCurrency: req.body.priceCurrency,
        tutor: req.body.tutor,
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
router.put("/question/:idQ", (req, res) => {
    const question = {
        idQ: req.params.idQ,
        question: req.body.question,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4,
        correctAnswer: req.body.correctAnswer,
        // tutor: req.user._id,
        tutor: req.body.tutor
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

module.exports = router