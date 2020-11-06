const express = require("express")
const router = express.Router()
const controller = require("../controller/user.controller")

const auth = require("../middleware/auth.middleware")

// user
router.post("/", controller.newUser)

router.post("/login", controller.login)

router.put("/", auth.decodeToken, controller.userUpdate)

router.delete("/:id", auth.decodeToken, controller.delUser)

// application || course registration
router.post("/application", auth.decodeToken, controller.newApplication)

router.get("/application/", auth.decodeToken, controller.delApplication)

module.exports = router;