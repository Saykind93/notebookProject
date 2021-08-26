const router = require('express').Router();
const { Notebook } = require('../db/models');


router.route('/')
  .get(async (req, res) => {
    res.locals.user = req.session.user
    // const allBooks = await Notebook.findAll({ where: { userId: req.session.user.id } });
    // console.log(allBooks);
    // res.locals.allBooks = allBooks
    res.render('index')
  })






module.exports = router
