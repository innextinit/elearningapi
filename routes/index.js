const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const middlewares = require("../middlewares/index.middleware");
const auth = require("../middlewares/auth.middleware");

router.get("/", (req, res) => {
    res.status(200);
    res.json(User);
});

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

    middlewares.newUser(user, (err) => {
        if (err) {
            res.json({"error": err});
        } else {
            res.json(user);
        }
    });
});

router.post("/application", (req, res) => {
    const application = {
        course_id: req.body.course_id,
        //_id: req.user._id,
        _id: req.body._id
    }

    middlewares.newApplication(application, (err) => {
        if (err) {
            res.json({"errror": err});
        } else {
            res.json(application)
        }
    })
});

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

    middlewares.courses(course, (err) => {
        if (err) {
            res.json({"error": err})
        } else {
            res.json(course)
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
    
    middlewares.courseUpdate(course, (err) => {
        if (err) {
            res.json({"error": err})
        } else {
            res.json(course)
        }
    })
})

router.post("/article", (req, res) => {
    const article = {
        course_id: req.body.course_id,
        section: req.body.section,
        title: req.body.title,
        body: req.body.body
    }

    middlewares.article(article, (err) => {
        if (err) {
            res.json({"error": err})
        } else {
            res.json(article)
        }
    })
})

module.exports = router;