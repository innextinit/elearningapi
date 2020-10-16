const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const passport = require("passport")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const expressSession = require("express-session")
const port = process.env.PORT

// connection to MongoDB
const url = process.env.DATABASE_URL
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log("MongoDB connected")
}).catch((error) => {
  console.log("unable to connect MongoDB")
  console.log(error)
})

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// session
app.use(cookieParser())
app.use(expressSession({ 
  secret: process.env.SESSION_KEY,
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 60 * 12 * 1000} //12 mins
}))
app.use(passport.initialize())
app.use(passport.session())

// header
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

const indexRouter = require("./routes/index")
const admin = require("./routes/admin")
const users = require("./routes/user")
const tutors = require("./routes/tutor")
const cs = require("./routes/cs")

app.use("/", indexRouter)
app.use("/admin", admin)
app.use("/user", users)
app.use("/tutor", tutors)
app.use("/cs", cs)

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})

module.exports = app