class authenticate {
    static isAuthenticated (req, res, next) {
        if (req.isAuthenticated()) {
            return next
        } else {
            res.redirct("/login", 401)
        }
    }

    static isUser (req, res, next) {
        if (req.user.role === user) {
            return next
        } else {
            res.json({"message": "role isnt user"})
        }
    }

    static isTutor (req, res, next) {
        if (req.user.role === tutor) {
            return next
        } else {
            res.json({"message": "role isnt tutor"})
        }
    }

    static isAdmin (req, res, next) {
        if (req.user.role === admin) {
            return next
        } else {
            res.json({"message": "role isnt admin"})
        }
    }

    static isCS (req, res, next) {
        if (req.user.role === cs) {
            return next
        } else {
            res.json({"message": "role isnt customer service"})
        }
    }

    static isCourseOwner (req, res, next) {
        if (courseID === req.user._id) {
            return next
        } else {
            res.json({"message": "you dont own this course >("})
        }
    }

    static isArticleOwner (req, res, next) {
        if (articleID === req.user._id) {
            return next
        } else {
            res.json({"message": "you dont own this article >("})
        }
    }

    static isQuestionOwn (req, res, next) {
        if (questionID === req.user._id) {
            return next
        } else {
            res.json({"message": "you dont own this question >("})
        }
    }

    static isCourseMember (req, res, next) {
        if (req.user._id  ) {
            return next
        } else {
            res.json({"message": "you not a member of this course"})
        }
    }

    static isHavingCouse (req, res, next) {
        if (req.user.courses.courseID === courseID) {
            return next
        } else {
            res.json({"message": "you arent having this course"})
        }
    }
}

module.exports = authenticate