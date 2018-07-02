const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',{useNewUrlParser:true},(err,client)=>{
  if(err)
  {
    return console.log("Unable to connect to database");
  }

  const db = client.db("TodoApp");
  // db.collection("Todos").findOneAndUpdate({_id:new ObjectID("5b38a80222836363c87d7ce4")},{
  //   $set:{
  //     completed:true
  //   }
  // },{
  //   returnOriginal:false
  // }).then((result)=>{
  //   console.log(result);
  // });

  db.collection("Users").findOneAndUpdate({name:"banana"},{
    $inc:{
      age:5
    }

  },{
    returnOriginal:false
  }).then((result)=>{
    console.log(result);
  });



});
