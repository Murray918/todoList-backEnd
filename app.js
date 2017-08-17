const bodyParser = require('body-parser');
const express = require('express')
const mustacheExpress = require('mustache-express');
const validator = require('express-validator');

const app = express();

const todoListArray = [{
  'name': 'Learn Node Basics',
  'completion': false,
  'id': 0,
}, {
  'name': 'Learn Express Basics',
  'completion': false,
  'id': 1,
}, {
  'name': 'Learn Mustache',
  'completion': false,
  'id': 2,
}, {
  'name': 'Learn HTML forms with Express',
  'completion': true,
  'id': 3,
}]

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
  res.render('todo', {todos: todoListArray});
})

app.post('/fire', function(req, res) {
  // console.log(req.body);
  let nuObject = {};
  nuObject.name = req.body.todo;
  nuObject.completion = false;
  //help from yoyu mah
  nuObject.id = todoListArray.length;
  todoListArray.push(nuObject);
  // console.log(todoListArray);
  // console.log(todoListArray.length)
  res.render('todo', {todos: todoListArray});
  // if (req.checkBody('todo')matches('todo')){
  //   alert('Please Enter a Todo.')
  // }
  // console.log(nuObject);
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



app.listen(3000, function() {
  console.log('Successfully started express application!');
})
