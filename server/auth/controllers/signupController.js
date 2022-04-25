const bcrypt = require('bcryptjs');
const signinSchema = require('../../schemas/signinSchema');
const User = require('../../models/userModel');

const useSignup = async (req, res, next) => {
  try {
    const validUsername = await signinSchema.validate(req.body);
    if (validUsername) {
      const user = await User.findOne({
        username: req.body.username,
      });
      if (user) {
        const error = new Error('Username already exists');
        next(error);
      } else {
        bcrypt.hash(
          req.body.password.trim(),
          12,
          async (err, hashedPassword) => {
            const hashedUser = {
              username: req.body.username,
              password: hashedPassword,
            };
            const newUser = await User.create(hashedUser);
            res.json({
              _id: newUser._id,
              username: newUser.username,
            });
          }
        );
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports = useSignup;
