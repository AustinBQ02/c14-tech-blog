const router = require('express').Router();
const { Blog, Comment, User } = require('../models/');

// get all blogs for homepage
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [User],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('all-blogs', { blogs });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single blog
router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (blogData) {
      const blog = blogData.get({ plain: true });

      res.render('single-blog', { blog });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
