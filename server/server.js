require('./config/config');




const _= require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {Users} = require('./models/user');

var app = express();
const port = process.env.PORT ;

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

app.patch('/todos/:id',(req,res)=>{
  var id=req.params.id;
  var body = _.pick(req.body,['text','completed']);
  if(!ObjectID.isValid(id))
    res.status(404).send({hi:"hi"});
  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt=new Date().getTime();
  }
  else{
    body.completed=false;
    body.completedAt=null;
  }
  Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
    if(!todo)
    {


      return res.status(404).send();
    }

    res.send({todo});


  }).catch((e)=>{
    res.status(404).send();

  })
});

app.listen(port,()=>{

  console.log(`Started at port ${port}`);

});

module.exports ={app};
