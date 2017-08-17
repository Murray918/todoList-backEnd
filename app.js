const bodyParser = require('body-parser');
const express = require('express')
const mustacheExpress = require('mustache-express');
const validator = require('express-validator');

const app = express();

const todoListArray = [{
    'name': 'Learn Node Basics',
    'completion': false,
    'id' : 0,
  }, {
    'name': 'Learn Express Basics',
    'completion': false,
    'id' : 1,
  }, {
    'name': 'Learn Mustache',
    'completion': false,
    'id' : 2,
  }, {
    'name': 'Learn HTML forms with Express',
    'completion': true,
    'id' : 3,
  }
]

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.get('/', function(req,res){
   res.render('todo', {
    todos: todoListArray
  });
})

app.post('/fire', function(req, res){
    console.log(req.body);
    function makeNu (todo){
    let nuObject = {};
    nuObject.name = req.body.todo;
    nuObject.completion = false;
    //help from yoyu mah
    nuObject.id = todoListArray.length+1;
    todoListArray.push(nuObject);
    }
})

function move(i){
  todoListArray[i].completion = true;
}

app.post('/:id', function(req, res){
    console.log(req.param.id);
    move(req.params.id)
    res.redirect('/')
})



app.listen(3000, function () {
  console.log('Successfully started express application!');
})
