const express = require('express');
const bcrypt = require('bycryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// Get express router
const router = express.Router();

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = requireI('../../validation/login');

// Load User model
const User = require('../../models/User');

// Number of salt rounds for bcrypt password hashing
const SALT_ROUNDS = 10;

/* @route POST api/users/register
 * @desc Register user
 * @access Public
 */
router.post('/register', (req, res, next) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
      return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json( { email: 'Email is already in use. Please enter a differnet email.' });
      } else {
        const newUser = new User ({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        // Hash password before storing in database
        bcrypt.genSalt(SALT_ROUNDS, (error, salt) => {
          if (error) return next(error);
          bcrypt.hash(newUser.password, salt, (error, hash) => {
            if (error) return next(error);
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(error => console.log(error));
          });
        });
      }
    })
    .catch(error => {
      console.log('Error in finding user:', error);
    });
}); 