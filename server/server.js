var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {Users} = require('./models/user');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());


app.post('/todos',(req,res)=>{

  var todo = new Todo({
    text:req.body.text
  });
  todo.save().then((result)=>{
    res.send(result);
  },(err)=>{
    res.status(400).send(err);
  });
});

app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  },(err)=>{
    res.status(400).send(err);
  });
});


app.get('/todos/:id',(req,res)=>{
  var id = req.params.id;

  if(!ObjectID.isValid(id))
  {
    res.status(404).send();
  }
  else {
    Todo.findById(id).then((todo)=>{
      if(todo)
        res.send({todo});
      else {
        res.status(404).send();
      }

    },(err)=>{
      res.status(400).send();
    });
  }

});


app.delete('/todos/:id',(req,res)=>{
  var id=req.params.id;
  if(!ObjectID.isValid(id))
    res.status(404).send();
  else {
    Todo.findByIdAndRemove((""+id)).then((todo)=>{
      if(todo)
        res.send({todo});
      else {
        res.status(404).send();
      }
    },(err)=>{
        res.status(400).send();
    })

}

});

app.listen(port,()=>{

  console.log(`Started at port ${port}`);

});

module.exports ={app};
