const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const middlewares = require("../middlewares/index.middleware");
const auth = require("../middlewares/auth.middleware");



module.exports = router;