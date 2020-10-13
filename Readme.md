## About this work

This is the API for the test Elearning site am working on. This site is to show my learning of Backend with JavaScript i.e [Node.JS](http://nodejs.org). To the best of my learning I am building to have an Industry standard working API that I would be consuming with JavaScript framework.

I will/am using [MongoDB](https://mongodb.com), [Express](https://expressjs.com), [Mongoose](https://mongoosejs.com), [Bcrypt]()

## Installation

Installing is done with the [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locall) but before that you must have node installed, to check use
```bash
$ node -v
$ npm -v
```
this would give you the version of the node you have installed and that of its package manager

## Usage

```bash
$ npm install
$ node app.js
```

Method          | Route                     | Description
===================
    POST    | {{baseURL}}                     | firstName, lastName, email, password are required
    GET     | {{baseURL}}                     | this returns all users details or one with the query params
    PUT     | {{baseURL}}/:id                 | this takes data to be edited with userID
    DELETE  | {{baseURL}}/:id                 | this takes the userID to be deleted

    POST    | {{baseURL}}/courses/            | title, description, durationPerQuestion, totalQuestion, headline, price are required
    GET     | {{baseURL}}/courses/            | this returns all courses or one with the query params
    PUT     | {{baseURL}}/courses/:id         | this takes data to be edited with courseID
    DELETE  | {{baseURL}}/courses/:id         | this takes the courseID to be deleted

    POST    | {{baseURL}}/courses/:id/article | title, body, section are required with courseID
    GET     | {{baseURL}}/courses/:id/article | this returns article with the courseID
    PUT     | {{baseURL}}/article/:idA        | this takes data to be edited with articleID
    DELETE  | {{baseURL}}/article/:idA        | this takes the articleID to be deleted

    POST    | {{baseURL}}/courses/:id/question| question, option1 - option4, correctAnswer, courseID are required
    GET     | {{baseURL}}/courses/:id/question| this returns question with the courseID
    PUT     | {{baseURL}}/question/:idQ       | this takes data to be edited with questionID
    DELETE  | {{baseURL}}/question/:idQ       | this takes the questionID to be deleted

    POST    | {{baseURL}}/application         | this takes the courseID the user wants to register for
    DELETE  | {{baseURL}}/application/:id     | this takes the courseID to be removed from user

## Futher Explaination

The routes above is used to simplify the routes available and not all user have all the routes :). 

The `{{baseURL}}` changes depending on the role of the user of this API. Here are what the `{{baseURL}}` is for normal user `localhost:2020`, for tutor `localhost:2020/tutor/`, for admin `localhost:2020/admin/` and for custom service `localhost:2020/cs/`.

## Version 1.0

The version 1.0 is mainly to test all endpoint to see they carryout what they should. In this version we have four roles and they are admin with the route `{{adminURL}} or localhost:2020/admin,` the customer services with `{{csURL}} or localhost:2020/cs,` the tutor with `{{tutorURL}} or localhost:2020/tutor` and the user or student with `{{userURL}} or localhost:2020/.`

Since version 1.0 is for testing endpoints only, `no authentication nor authorization` is put in place yet. The [API Elearning.postman_collection.json](`./API_Elearning.postman_collection.json`) would be of help in testing this version.

This are still under development to meet up with up with the version 1.0
* During update, the object with values should not be over-written by null
* Use bcrypt to encrypt the password before saving
