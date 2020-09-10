const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator')

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route       GET api/profile/me
// @desc        Get current user's profile
// @access      Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user!' })
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       POST api/profile
// @desc        Create or update a user's profile
// @access      Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('hobbies', 'Hobbies is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { company, website, location, bio, status, hobbies, youtube, facebook, twitter, instagram, linkedin, alltrails, } = req.body;

    const profileFields = {}

    profileFields.user = req.user.id;

    // @TODO remove if-tower
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (hobbies) { profileFields.hobbies = hobbies.split(',').map(hobby => hobby.trim()); }

    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;
    if (alltrails) profileFields.social.alltrails = alltrails;


    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) { // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      profile = new Profile(profileFields); // Create
      await profile.save();

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server error')
    }
  }
);

// @route       GET api/profile
// @desc        Get all profiles
// @access      Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route       GET api/profile/user/:user_id
// @desc        Get profile by USER ID
// @access      Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found." });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: "Profile not found." });
    }
    return res.status(500).send('Server Error');
  }
});

// @route       DELETE api/profile
// @desc        Delete profile, user, and posts
// @access      Private
router.delete('/', auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });

    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User and profile removed' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route       PUT api/profile/experience
// @desc        Add profile experience
// @access      Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { title, company, location, from, to, current, description } = req.body;

    const newExp = { title, company, location, from, to, current, description, }

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);
      await profile.save()

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route       PUT api/profile/education
// @desc        Add profile education
// @access      Private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldofstudy', 'Field of study is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { school, degree, fieldofstudy, from, to, current, description } = req.body;

    const newEdu = { school, degree, fieldofstudy, from, to, current, description, }

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);
      await profile.save()

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route       DELETE api/profile/experience/:exp_id
// @desc        Delete profile experience
// @access      Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);

  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route       DELETE api/profile/education/:edu_id
// @desc        Delete profile education
// @access      Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);

  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route       Get api/profile/weather/:location
// @desc        Get weather in user's city
// @access      Public
router.get('/weather/:city', async (req, res) => {
  try {
    const options = {
      uri: `https://api.openweathermap.org/data/2.5/forecast?q=${req.params.city},&units=imperial&appid=${config.get('openWeatherKey')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No weather for your location' });
      }

      res.json(JSON.parse(body));
    });

  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error')
  }
});

module.exports = router;
