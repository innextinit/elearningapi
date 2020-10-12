const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.sendFile("/NODEJS/elearningapi/readme.html")
})

module.exports = router;