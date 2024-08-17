const { Router } = require("express");
const items = require('../models/db/items-db');
const users = require("../models/db/user-db");
const usersZod = require('../models/zod/user-zod');
const jwt = require('jsonwebtoken');
const userMiddleware = require("../middleware/userMiddleware");
const cart = require('../models/db/cart-db')

const routes = Router();

routes.get('/', (req, res) => {
  try {
    items.find()
      .then((result) => {
        return res.json({
          success: true,
          items: result
        })
      })
      .catch(err => {
        return res.json({
          success: false,
          message: err.message
        })
      })
  }
  catch (err) {
    return res.json({
      error: err
    })
  }
})

routes.get('/cart', userMiddleware, (req, res) => {
  try {
    const email = req.headers.email;
    cart.find({ email: email })
      .populate('itemId')
      .then(result => {
        res.json({
          success: true,
          items: result
        })
      })
      .catch(err => {
        return res.json({
          success: false,
          message: err
        })
      })

  }
  catch (err) {
    res.json({
      success: false,
      message: err
    })
  }

})

routes.post('/add-cart', userMiddleware, (req, res) => {
  const itemId = req.body.itemId;
  const email = req.headers.email;
  cart.findOne({ email: email, itemId: itemId })
    .populate('itemId')
    .then(result => {
      if (result) {
        result.quantity += 1;
        result.save()
          .then(result => {
            return res.json({
              success: true,
              message: 'Quatity Updated!'
            })
          })
      }
      else {
        items.findOne({ _id: itemId })
          .then(result => {
            const cartItem = new cart({ email: email, itemId: result });
            cartItem.save()
              .then(result => {
                return res.json({
                  success: true,
                  message: 'Item Added To Cart!'
                })
              })
          })
      }
    })
    .catch(err => {
      console.log(err)
      return res.json({
        success: false,
        message: err
      })
    })
})



routes.put('/quantity-update', userMiddleware, (req, res) => {
  try {
    const email = req.headers.email;
    const itemId = req.body.itemId;
    const quantity = req.body.quantity
    cart.findOne({ email, itemId })
      .then(result => {
        if (result) {
          result.quantity = quantity ? quantity : 1;
          result.save()
            .then(result => {
              res.json({
                success: true,
                message: result
              })
            })
            .catch(err => {
              return res.json({
                success: false,
                message: err
              })
            })
        }
      })
      .catch(err => {
        return res.json({
          success: false,
          message: err
        })
      })
  }
  catch (err) {
    return res.json({
      success: false,
      message: err
    })
  }
})

routes.post('/signup', (req, res) => {
  try {
    const user = new users(req.body);
    user.save()
      .then(result => {
        const token = jwt.sign({ email:req.body.email }, process.env.jwtSecret)
        return res.json({
          success: true,
          token: token,
          message: 'Account Created!'
        })
      })
      .catch(err => {
        return res.json({
          success: false,
          message: err.message
        })
      })
  }
  catch (err) {
    return res.json({
      success: false,
      message: err
    })
  }
})

routes.post('/signin', (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    users.findOne({ email, password })
      .then(result => {
        if (result) {
          const token = jwt.sign({ email }, process.env.jwtSecret)
          return res.json({
            success: true,
            message: 'You have Signed In!',
            token: token,
            name: result.name
          })
        }
        else {
          return res.json({
            success: false,
            message: 'Wrong Email Or Password!'
          })
        }
      })
      .catch(err => {
        return res.json({
          success: false,
          message: err
        })
      })
  }
  catch (err) {
    res.json({
      success: false,
      message: err
    })
  }
})

routes.delete('/cart-remove', userMiddleware, (req, res) => {
  try {
    const itemId = req.body.itemId;
    // console.log(req.body)
    cart.deleteOne({ itemId })
      .then(result => {

        if (result.deletedCount) {
          return res.json({
            success: true,
            message: 'Item Deleted!'
          })
        }
        else {
          return res.json({
            success: true,
            message: 'Item Not Deleted!'
          })
        }
      })
      .catch(err => {
        return res.json({
          success: false,
          message: err
        })
      })
  }
  catch (err) {
    return res.json({
      success: false,
      message: err
    })
  }
})


module.exports = routes