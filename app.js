const bodyParser = require('body-parser');
const express = require('express')
const mustacheExpress = require('mustache-express');
const validator = require('express-validator');
// const todoListArray = require('./modles/modles')
const MongoClient = require('mongodb').MongoClient,
  assert = require('assert');
const app = express();
const url = 'mongodb://localhost:27017/todo';
// const todoListArray = [{
//   'name': 'Learn Node Basics',
//   'completion': false,
//   'id': 0,
// }, {
//   'name': 'Learn Express Basics',
//   'completion': false,
//   'id': 1,
// }, {
//   'name': 'Learn Mustache',
//   'completion': false,
//   'id': 2,
// }, {
//   'name': 'Learn HTML forms with Express',
//   'completion': true,
//   'id': 3,
// }]

let database;

// let collection = db.collection('todo')



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(validator());

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')


app.get('/', function(req, res) {
  // console.log(todoListArray);
  // console.log(todoListArray.length)
  // Find some documents
  let collection = database.collection('todos');
  collection.find({}).toArray(function(err, todos) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(todos)
    // callback(todos);
    res.render('todo', {
      todos: todos
    });
  });

})

app.post('/fire', function(req, res) {
  let collection = database.collection('todos');
  let name = req.body.todo;
  let nuObj = {
    name: name,
    completion: false,
  }
  collection.insertOne(nuObj, function(err, todos) {
    // console.log(req.body)
    // nuObject.completion = false;

    // res.render('todo', {
    //   todos: todoListArray
    // });

    res.redirect('/')
  })
})





function move(i) {
  todoListArray[i].completion = true;
  // console.log(todoListArray[i].completion)
  // console.log(todoListArray.length)
}

app.post('/results/:id', function(req, res) {
  // console.log(req.param.id);
  move(req.params.id)
  res.redirect('/')
  // console.log(req.params);
})



// Get the documents collection


MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to mongodb");
  database = db;
});

process.on('SIGINT', function() {
  console.log("\nshutting down");
  database.close(function() {
    console.log('mongodb disconnected on app termination');
    process.exit(0);
  });
});



app.listen(3000, function() {
  console.log('Successfully started express application!');
})
