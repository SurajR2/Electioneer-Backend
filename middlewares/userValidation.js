const { body, validationResult } = require('express-validator');
const fs= require('fs');
// const path= require('path');

exports.validate= [


  // Validate email
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email provided is not valid '),

  // Validate password
  body('password')
   .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  // for validating errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (req.file) {
        const filePath = req.file.path;
        fs.unlinkSync(filePath);
      }
        // const error = errors.array()[0].msg; // Get the first error message
        // return res.status(400).json({ error });
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];