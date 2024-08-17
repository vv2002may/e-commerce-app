const jwt = require('jsonwebtoken');
const admins = require('../models/db/admin-db');

function adminMiddleware(req, res, next) {
   try {
      const token = req.headers.token;
      const decoded = jwt.verify(token, process.env.jwtSecret);
      if (decoded.email) {
         admins.findOne({ email:decoded.email })
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

module.exports = adminMiddleware