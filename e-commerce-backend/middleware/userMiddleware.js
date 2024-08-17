const jwt = require('jsonwebtoken');
const users = require('../models/db/user-db');

function userMiddleware(req, res, next) {
   try {
      const token = req.headers.token;
      const decoded = jwt.verify(token, process.env.jwtSecret);
      console.log(decoded)
      if (decoded.email) {
         users.findOne({ email:decoded.email })
            .then(result => {
               if (result) {
                  req.headers.email = decoded.email;
                  next();
               }
               else {
                  return res.json({
                     success: false,
                     message: "You are not authenticated!"
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
      else {
         res.json({
            success: false,
            message: "You are not authenticated!"
         })
      }
   }
   catch (err) {
      res.json({
         success: false,
         message: err
      })
   }
}

module.exports = userMiddleware