const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err,client)=>{
  if(err){
    return console.log("unable to connect");
  }
  console.log('connected to database');
  // const db = client.db('TodoApp');
  //
  // db.collection('Todos').insertOne({
  //
  //   text:'something to do',
  //   completed:false
  //
  // },(err,result)=>{
  //   if(err){
  //     return console.log('unable to insert',err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined,2));
  // });
  const db = client.db("TodoApp");
  db.collection('Users').insertOne({

    name:'sameer',
    age: 25,
    locations:"amityville"

  },(err,result)=>{

    if(err){
      return console.log("There is an error",err);
    }
    console.log(JSON.stringify(result.ops,undefined,2));
  });

  client.close();
});
