const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',{useNewUrlParser:true},(err,client)=>{
  if(err)
  {
    return console.log("Unable to connect to database");
  }

  const db = client.db("TodoApp");
  // db.collection("Users").deleteMany({name:'lichi'}).then((result)=>{
  //   console.log(JSON.stringify(result,undefined,2));
  // },(err)=>{
  //   console.log(err);
  // });
  db.collection("Users").findOneAndDelete({_id:new ObjectID("5b39bbf5ac196b817f9c29eb")}).then((result)=>{
    console.log(JSON.stringify(result,undefined,2));

  },(err)=>{
    console.log(err);
  });


});
