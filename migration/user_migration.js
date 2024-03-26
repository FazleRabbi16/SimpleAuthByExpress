const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  password:{
    type:String,
    required:true
  },
  status:{
    type:Boolean,
    default:true,
  },
});
module.exports = userSchema;