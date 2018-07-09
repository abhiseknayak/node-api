const {ObjectID} = require("mongodb")
const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {Users} = require("./../server/models/user");
var id = "6b436c2a40de811dd42a85e3";
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

Todo.findById(id).then((todo)=>{
  console.log(todo);
},(err)=>{
  console.log("shit");
});
