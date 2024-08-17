const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
   title: {
      type: String,
      required:true
   },
   price: {
      type: Number,
      required:true
   },
   description: {
      type: String,
      required:true
   },
   category: {
      type: String,
      required:true
   },
   image: {
      type: String,
      required:true
   },
   rating: {
      rate: {
         type: Number,
         default:0
      },
      count: {
         type: Number,
         default:0
      }
   }
},{timestamps:true})

const items = mongoose.model('items', itemSchema);

module.exports=items