const express = require("express")
const router = express.Router()
const controller = require("../controller/user.controller")

const auth = require("../middleware/auth.middleware")

// user
router.post("/", controller.newUser)

router.post("/login", controller.login)

router.put("/:id", auth.decodeToken, (req, res) => {
    // const user = {
    //     id: req.params.id,
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     otherName: req.body.otherName,
    //     title: req.body.title,
    //     gender: req.body.gender,
    //     phone: req.body.phone,
    //     email: req.body.email,
    //     zipcode: req.body.zipcode,
    //     city: req.body.city,
    //     streetName: req.body.streetName,
    //     country: req.body.country,
    //     state: req.body.state,
    //     DP: req.body.DP
    // }

    // controller.userUpdate(user, (err, data) => {
    //     if (err) {
    //         res.json({"error": err});
    //     } else {
    //         res.json(data);
    //     }
    // })

    console.log("welcome man you make it")
})

router.delete("/:id", auth.decodeToken, controller.delUser) //auth.logout

// courses
router.get("/courses", (req, res) => {
    controller.courses((err, course) => {
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

    controller.getCourseArticle(article, (err, data) => {
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

    controller.getCourseQuestion(question, (err, data) => {
        if (err) {
            res.json({"error": err})
        } else {
            res.json(data)
        }
    })
})

// uncheck
router.post("/question/:id", (req, res) => {
    const question = {
        id: req.params.id,
        optionPicked: req.body.optionPicked
    }

    controller.checkAns(question, (err, data) => {
        if (err) {
            res.json({"error": err})
        } else {
            console.log(data)
            // if (data.correctAnswer === question.optionPicked) {
            //     console.log(true)
            //     data = true
            //     console.log(data)
            //     res.send(data)
            // } else {
            //     console.log(false)
            //     data = false
            //     console.log(data)
            //     res.send(data)
            // }
            res.json(data)
        }
    })
})

// application
router.post("/application", (req, res) => {
    const application = {
        appID: req.body.appID,
        //_id: req.user._id,
        _id: req.body._id
    }

    controller.newApplication(application, (err, newApplication) => {
        if (err) {
            res.json({"errror": err});
        } else {
            res.json(newApplication)
        }
    })
});

router.delete("/application/:id", (req, res) => {
    const application = {
        //  _id: req.user._id,
        id: req.params.id,
        appID: req.body.appID
    }

    controller.delApplication(application, (err, data) => {
        if (err) {
            res.json({"errror": err});
        } else {
            res.json(data)
        }
   })
})

module.exports = router;