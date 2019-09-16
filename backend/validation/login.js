const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Convert empty fields to an empty strings for validator functions
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.email) ? data.password : '';

  // Check Email
  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field is required. Please enter Email.'
  } else if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid. Please enter a valid Email.';
  }

  // Check Password and Password confirmation
  if (validator.isEmpty(data.password)) {
    errors.password = 'Password field is required. Please enter password.'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};