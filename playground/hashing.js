const {SHA256} = require('crypto-js');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = "123abc!";
bcrypt.genSalt(10,(err,salt)=>{
  bcrypt.hash(password,salt,(err,hash)=>{
    console.log(typeof(hash));
  });
});

var hashedpassword="$2a$10$2cnZcHxikKQ1g0sL4XOWKuNYXb5pM8/Y3BJ0xZznNw6H8no.zhIiW";

bcrypt.compare(password,hashedpassword,(err,res)=>{
  console.log(res);
});
// var data={
//   id:10
// };
//
// var token=jwt.sign(data,"abc123");
// console.log(token);
//
// var decoded=jwt.verify(token,"abc123");
// console.log(decoded);

// var m ="i am a boy";
// var a =SHA256(m).toString();
//
// console.log(m);
// console.log(a);
//
//
// var data={
//   id:4
// };
//
// var token ={
//   data,
//   hash:SHA256(JSON.stringify(data)+"somestring").toString()
// }
//
// var res=SHA256(JSON.stringify(token.data)+"somestring").toString();
