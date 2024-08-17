const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Name is required!']
   },
   email: {
      type: String,
      required: [true, 'Email is required!'],
      unique: [true, 'Email already exits!']
   },
   password: {
      type: String,
      required: [true, 'Password is required!']
   },
}, { timestamps: true })

const users = mongoose.model('users', userSchema);

module.exports = users;