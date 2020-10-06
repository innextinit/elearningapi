## About this work

This is the API for the test Elearning site am working on. This site is to show my learning of Backend with JavaScript i.e [Node.JS](http://nodejs.org). To the best of my learning I am building to have an Industry standard working API that I would be consuming with JavaScript framework.

The framework and package I will/am using include [MongoDB](https://mongodb.com), [Express](https://expressjs.com), [Mongoose](https://mongoosejs.com)

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
    GET     | {{baseURL}}                     | this returns all users details
    PUT     | {{baseURL}}/:id                 | this takes data to be edited with userID
    DELETE  | {{baseURL}}/:id                 | this takes the userID to be deleted

    POST    | {{baseURL}}/courses/            | title, description, durationPerQuestion, totalQuestion, headline, price are required
    GET     | {{baseURL}}/courses/            | this returns all courses
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

The `{{baseURL}}` changes depending on the user of the API and the route that would be available to the user. On local host the `{{baseURL}}` for normal user is `localhost:2020`, for tutor is `localhost:2020/tutor/`, for admin is `localhost:2020/admin/` and for custom service is `localhost:2020/cs/`.

## Version 1.0

The root user is still at index.js and no user role is implemented yet. This is still to test all API call to the route and may sure they carry out what is needed. In this version the routes that are working fine are

* post, get | {{baseURL}}
* put, delete | {{baseURL}}/:id
* post, get | {{baseURL}}/courses
* put, delete | {{baseURL}}/courses/:id
* post, get | {{baseURL}}/courses/:id/article
* put, delete | {{baseURL}}/article:idA
* post, get | {{baseURL}}//courses/:id/question
* put, delete | {{baseURL}}/question/:idQ
* post      | {{baseURL}}/application
* delete    | {{baseURL}}/application/:id

This route is still under development to meet up with up with the version 1.0
* *

This route are upcoming route for version 1.0
* Route for tutor to see all the student who enrolled for the course
* Route for tutor to see all the course they have
