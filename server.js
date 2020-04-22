const express = require('express');
const app = express();
const bodyParser = require('body-parser')

// https://expressjs.com/en/starter/basic-routing.html
app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


var toDoList = [
      {
        id : 1,
        name: 'Lau nha'
      },
      {
        id : 2,
        name: 'Rua bat'
      },
      {
        id : 3,
        name: 'Nau com'
      },
    ]
app.get('/todos', function(req,res){
    res.render('index', { 
    toDoList
  })
})

app.get('/todos/search', function(req, res){
  var q = req.query.q;
  var matchedItems = toDoList.filter(function(item){
    return item.name.indexOf(q) !== -1;
  })
  res.render('index', { 
    toDoList : matchedItems
  })
}) 

app.get('/todos/create', function(req, res){
  res.render('./create')
}) 

app.post('/todos/create', function(req, res){
  toDoList.push(req.body);
  res.redirect('/todos')
})


app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});