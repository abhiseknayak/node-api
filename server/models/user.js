var mongoose = require('mongoose');


var Users = mongoose.model('Users',{
  email:{
    type:String,
    trim:true,
    minlength:1,
    required:true
  }

});

module.exports={Users};
