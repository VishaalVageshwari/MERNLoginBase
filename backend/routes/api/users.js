const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// Get express router
const router = express.Router();

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/user.model');

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

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res, next) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email })
    .then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json( {emailnotfound: 'Email not found' });
      }

      // Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              name: user.name
            }

            // Sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              {
                expiresIn: 31556926 // One year in seconds
              },
              (error, token) => {
                if (error) return next(error); 

                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              }
            );
          } else {
            return res.status(400).json({ passwordincorrect: 'Password incorrect' });
          }
        })
        .catch(error => console.log('Error comparing password:', error));
  })
  .catch(error => console.log('Error in finding user email:', error));
});

module.exports = router;