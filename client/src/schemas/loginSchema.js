const yup = require('yup');

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username is too short - should be 5 chars minimum.')
    .max(20, 'Username is too long - should be 20 chars maximum.')
    .matches(
      /(^[a-zA-Z0-9_]+$)/,
      'Username can only contain latin letters, numbers or underscores.'
    )
    .required('Please provide your username'),
  password: yup
    .string()
    .min(10, 'Password is too short - should be 10 chars minimum.')
    .max(20, 'Password is too long - should be 20 chars maximum.')
    .trim()
    .matches(/^[a-zA-Z]+$/, 'Password can only contain Latin letters.')
    .required('Please provide your password'),
});

module.exports = loginSchema;
