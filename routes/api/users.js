const express = require('express');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const jtw = require('jsonwebtoken');
const gravatar = require('gravatar');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route       POST api/users
// @desc        Register user
// @access      Public
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6, })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
    }

    const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });

    user = new User({
      name,
      email,
      password,
      avatar,
    })

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { user: { id: user.id, } }

    jtw.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 10800 }, // 3 hours
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
});

module.exports = router;
