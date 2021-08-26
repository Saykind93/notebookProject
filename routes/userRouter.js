const router = require('express').Router();
const { User } = require('../db/models');
const bcrypt = require('bcrypt');

router.route('/signIn')
  .get(async (req, res) => {

    res.render('signIn')
  })

  .post(async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      const currentUser = await User.findOne({ where: { email } });
      if (currentUser && (await bcrypt.compare(password, currentUser.hashpass))) {
        req.session.user = { name: currentUser.name, id: currentUser.id };
        return res.redirect('/')
      } else {
        return res.redirect('/user/signIn')
      }
    }
  })

router.route('/signUp')
  .get(async (req, res) => {
    console.log(req.body)
    res.render('signUp')
  })
  .post(async (req, res) => {
    const { name, email, password } = req.body;
    if (name && email && password) {
      const hashPass = await bcrypt.hash(password, +process.env.SALTROUND);
      const newUser = await User.create({ name, email, hashpass: hashPass }, { returning: true, plain: true });
      req.session.user = { name: newUser.name, id: newUser.id };
      return res.redirect('/')
    } else {
      return res.redirect('/user/signUp/?err')
    }
  })

router.route('/logout')
  .get(async (req, res) => {
    req.session.destroy();
    res.clearCookie('sId').redirect('/')
  })

module.exports = router
