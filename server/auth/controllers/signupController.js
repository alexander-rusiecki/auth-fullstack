const signinSchema = require('../../schemas/signinSchema');
const User = require('../../models/userModel');

async function useSignup(req, res, next) {
  try {
    const result = await signinSchema.validate(req.body);
    if (result) {
      const user = await User.findOne({
        username: req.body.username,
      });
      res.json({ user });
    }
  } catch (err) {
    next(err.errors);
  }
}

module.exports = useSignup;
