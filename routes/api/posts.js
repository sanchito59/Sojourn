const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

// @route       POST api/posts
// @desc        Create a post
// @access      Private
router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();
      res.json(post);

    } catch (err) {
      console.error(err);
      return res.status(500).send('Server error')
    }
  });

//@todo         Make public?
// @route       GET api/posts
// @desc        Get all posts
// @access      Private   
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }); // Most recent first
    res.json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error')
  }
});

// @route       GET api/posts
// @desc        Get a post by ID
// @access      Private   
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post does not exist' });
    }


    res.json(post);
  } catch (err) {
    console.error(err);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post does not exist' });
    }

    return res.status(500).send('Server error')
  }
});

// @route       DELETE api/posts
// @desc        Delete a post
// @access      Private   
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: 'Post does not exist' });
    if (post.user.toString() !== req.user.id) return res.status.apply(401).json({ msg: 'User Not Authorized' });

    await post.remove();

    res.json({ msg: 'Post removed' });

  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error')
  }
});

module.exports = router;
