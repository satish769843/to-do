const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const userDB = require('../../module/user');
const { check, validationResult } = require('express-validator');

router.post(
  '/',
  [
    check('email', 'Please Enter email').not().isEmpty(),
    check('password', 'Please Enter password').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await userDB.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already Exit' }] });
      }
      user = new userDB({
        email,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
  }
);

module.exports = router;
