const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const signinSchema = require('../../schemas/signinSchema');
const User = require('../../models/userModel');

const useLogin = async (req, res, next) => {
  const respondError422 = (res, next) => {
    res.status(422);
    const error = new Error('Unable to login');
    next(error);
  };

  try {
    const validUser = await signinSchema.validate(req.body);
    if (validUser) {
      const user = await User.findOne({
        username: req.body.username,
      });
      if (user) {
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
          const payload = {
            _id: user._id,
            username: user.username,
          };
          jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            {
              expiresIn: '1d',
            },
            (err, token) => {
              if (err) {
                respondError422(res, next);
              } else {
                res.json({ token });
              }
            }
          );
        } else {
          respondError422(res, next);
        }
      } else {
        respondError422(res, next);
      }
    }
  } catch (err) {
    respondError422(res, next);
  }
};

module.exports = useLogin;
