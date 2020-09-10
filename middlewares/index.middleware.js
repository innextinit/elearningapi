const User = require("../models/user.model");
const Course = require("../models/course.model")
const bcrypt = require("bcrypt");
const { model, findById } = require("../models/user.model");
const { application } = require("express");

// note check why bcrypt isnt working
module.exports.newUser = async (user, callback) => {
    await bcrypt.hash(user.password, 18, async (err, hash) => {
        if (err) {
            return err
        } else {
           user.password = hash
        }
    });
    const newUser = new User(user);
    await newUser.save(callback);
    console.log(newUser)
};

module.exports.newApplication = async (application, callback) => {
    User.findByIdAndUpdate(
        application._id,
        {$push: {"course": application.course_id}},
        { new: true, upsert: true},
        callback
        )
};

module.exports.courses = (course, callback) => {
    const newCourse = new Course(course)
    newCourse.save(callback)
};

module.exports.courseUpdate = (course, callback) => {
    Course.findByIdAndUpdate(
        course.id,
        {
            "title": course.title,
            "description": course.description,
            "image": course.image,
            "durationPerQuestion": course.durationPerQuestion,
            "totalQuestion": course.totalQuestion,
            "price": course.price,
            "headline": course.headline
        },
        {new: true, upsert: true},
        callback
    )
}

module.exports.article = (article, callback) => {
    Course.findByIdAndUpdate(
        article.course_id,
        {
            $push: {"article": article}
        },
        {new: true, upsert: true},
        callback
    )
    console.log(article)
}