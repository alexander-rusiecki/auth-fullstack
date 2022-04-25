const signinSchema = require('../../schemas/signinSchema');
const User = require('../../models/userModel');

const useSignup = async (req, res, next) => {
  try {
    const validUsername = await signinSchema.validate(req.body);
    if (validUsername) {
      const user = await User.findOne({
        username: req.body.username,
      });
      res.json({ user });
    }
  } catch (err) {
    next(err.errors);
  }
};

module.exports = useSignup;
