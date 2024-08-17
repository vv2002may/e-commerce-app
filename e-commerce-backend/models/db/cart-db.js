const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
   email: {
      type: String,
      required:true
   },
   itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'items'
   },
   quantity: {
      type: Number,
      default: 1,
   },
})

const cart = mongoose.model('cart', cartSchema);

module.exports = cart;