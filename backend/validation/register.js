const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty strings for validator functions
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  // Check Name
  if (validator.isEmpty(data.name)) {
    errors.name = 'Name field is required. Please enter Name.';
  }

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

  if (validator.isEmpty(data.password2)) {
    errors.password2 = 'Password confirmation field is required. Please enter password confirmation.'
  }

  if (!validator.isLength(data.password, { min: 7, max: 30 })) {
    errors.password = 'Password must be at least 6 characters. Please re-enter a valid password.';
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};