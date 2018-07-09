const {ObjectID} = require("mongodb")
const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {Users} = require("./../server/models/user");
var id = "5b4376a0daffc120b0842be";
// Todo.find({
//   _id:id
// }).then((todos)=>{
//   console.log('todos',todos);
// });
//
//
// Todo.findOne({
//   _id:id
// }).then((todo)=>{
//   console.log('todo',todo);
// });
// if(!ObjectID.isValid(id)){
//   console.log("ID not valid");
// }
//

Users.findById(id).then((user)=>{
   if(!user){
     return console.log("sorry");
   }
   console.log(JSON.stringify(user,undefined,2));
 }).catch((e)=>console.log("sorry hi"));
