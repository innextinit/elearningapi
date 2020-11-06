const express = require("express")
const router = express.Router()
const controller = require("../controller/index.controller")

router.get("/", (req, res) => {
    res.sendFile("/NODEJS/elearningapi/readme.html")
})

// courses
router.get("/courses", controller.courses)


module.exports = router;