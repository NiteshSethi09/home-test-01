# home-test-01

An API based on Node.js without __User Interface__.

### Requirements
* MongoDb compass installed on your system with working port __27017__.
* You can use Postman or Postwomen for getting result from this API.
* You need to install some modules to make it work. The modules are:
  * Express
  * Mongoose
  * Nodemon

## Command:
```javascript
npm i express mongoose --save
```
And 
```javascript
npm i nodemon -D
```
> This is to run server with __npm run run:dev__ command else use __node server.js__ for running server once only.

### Routes
There are 3 routes out of which 2 are of post type rest the remaining one is of get type.

1. Post: /create
This route will accept 2 things, name and email (email should be unique) in it's body for registering a new candidate.

1. Post": /test
This route needs 3 things, round nunber, candidateId and marks in it's body for assigning marks to a candidate.
> Note that, there are only 3 rounds (1, 2, 3) and can assign marks from 0-10 only.

1. Get: /result
This route takes only one thing, ie. Round nunber from it's body and provides you the average marks, highest scoring marks and the candidate's details who scored highest in the test in json form.
___
__That's ALL__
