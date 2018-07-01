const {MongoClient} = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/TodoApp",{ useNewUrlParser: true },(err,client)=>{

    if(err)
    {
      return console.log("Unable to connect to database");
    }

    const db = client.db("TodoApp");
    db.collection("Users").find({locations:"amityville"}).toArray().then((docs)=>{

      console.log(JSON.stringify(docs,undefined,2));

    },(err)=>{

        console.log(err);

    });



});
