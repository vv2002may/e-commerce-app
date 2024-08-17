const { Router } = require("express");
const items = require('../models/db/items-db');

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
  }
  catch (err) {
    res.json({
      error: err
    })
  }
})

routes.post('/add-item', (req, res) => {
  try {
    const item = new items(req.body);
    item.save()
      .then(result => {
        res.json({
          success: true,
          message: 'Item is added'
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
    res.json({
      message: err
    })
  }
})


module.exports = routes