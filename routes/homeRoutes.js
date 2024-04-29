const router = require('express').Router();
const { logger } = require('sequelize/lib/utils/logger');
const { Review, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const reviewData = await Review.findAll({
            include: [{ model: Comment }, { model: User }],
        });

        const reviews = reviewData.map((project) => project.get({ plain: true }));

        res.render('homepage', {
            reviews,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log('Error', err);
        res.status(500).json(err);
    }
});

router.get('/review/:id', async (req, res) => {
    try {
        const reviewData = await Review.findByPk(req.params.id, {
            include: [{ model: Comment}, { model: User }],
        });
        const review = reviewData.get({ plain: true });

        res.render('review', {
            ...review,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/profile', withAuth, async (req, res) => {
    console.log('Profile:', req.session.user_id);
    try {
        const userData = await User.findByPk(req.session.user_id,
        {
            attributes: { exclude: ['password'] },
            include: [{ model: Review }],
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;