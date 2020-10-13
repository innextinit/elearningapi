const express = require("express")
const router = express.Router()
const middlewares = require("../middlewares/cs.middleware")

// user
router.get("/", (req, res) => {
    const userMail = {
        query: req.query.email
    }

    middlewares.findUser(userMail, (err, data) => {
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
        isDisable: req.body.isDisable,
        hasActivated: req.body.hasActivated
    }

    middlewares.userUpdate(user, (err, data) => {
        if (err) {
            res.json({"error": err});
        } else {
            res.json(data);
        }
    })
})

// courses
router.get("/courses", (req, res) => {
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

// application
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