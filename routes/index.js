const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")

const User = require("../models/user.model")
const Course = require("../models/course.model")
const middlewares = require("../middlewares/index.middleware")
const auth = require("../middlewares/auth.middleware")

// user
router.get("/", (req, res) => {
    User.find({}).populate("course").exec((err, user) => {
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
router.get("/courses", (req, res) => {
    Course.find({}, (err, course) => {
        if (err) {
            res.json({"error": err})
        } else {
            res.json(course)
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
        headline: req.body.headline
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
        headline: req.body.headline
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

// application
router.post("/application", (req, res) => {
    const application = {
        appID: req.body.course_id,
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
})

router.delete("/application/:id", (req, res) => {
    const application = {
        //  _id: req.user._id,
        id: req.params.id,
        appID: req.body.appID
    }

    middlewares.delApplication(application, (err, data) => {
        if (err) {
            res.json({"errror": err});
        } else {
            res.json(data)
        }
   })
})

module.exports = router;