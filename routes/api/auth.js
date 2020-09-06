const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const config = require('config');
const bcrypt = require('bcryptjs');
const jtw = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route       GET api/auth
// @desc        Check if user is authenticated
// @access      Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route       POST api/users
// @desc        Authenticate user & get token
// @access      Public
router.post('/', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })
    }

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
