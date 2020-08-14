const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const userDB = require('../../module/user');

router.post(
  '/',
  [
    check('email', 'Please Enter email').not().isEmpty(),
    check('password', 'Please Enter password').not().isEmpty(),
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(400).json({ error: err.array() });
    }
    const { email, password } = req.body;

    try {
      const user = await userDB.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid email id' }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(404).json({ errors: [{ msg: 'Invalid Password' }] });
      }
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
      res.status(500).json({ errors: [{ msg: 'server error' }] });
    }
  }
);

module.exports = router;
