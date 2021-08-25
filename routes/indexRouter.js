const router = require('express').Router();
// const { Post } = require('../db/models');


router.route('/')
  .get(async (req, res) => {
    // res.locals.user = req.session.user
    // const posts = await Post.findAll();
    // res.locals.posts = posts
    res.render('index')
  })






module.exports = router
