const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    double:true,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  addDate:{
    type:Date,
    default:Date.now
  },
  status:{
    type:Boolean,
    default:true,
  },
});
module.exports = productSchema;