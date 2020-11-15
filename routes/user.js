const express = require("express"),
    router = express.Router(),
    authService = require("../services/auth");
const isAuth = require('../middlewares/isAuth');

// import AuthService from '../services/auth';
// import checkRole from '../middlewares/checkRole';
// import isAuth from '../middlewares/isAuth';
// import attachCurrentUser from '../middlewares/attachCurrentUser';

router.use(async (req, res, next) => {
  console.log('user.routes.js');
  next();
});

router.route('/login')
.post(async (req, res, next) => {
    const name = req.body.user.name;
    const password = req.body.user.password;
    try {
      //const authServiceInstance = new AuthService();
      const { user, token } = await authService.Login(name, password);
      return res.status(200).json({ user, token }).end();
    } catch(ex) {
      //return res.json(e).status(500).end();
      next(ex);
    }
})

router.route('/signup')
  .post( async (req, res, next) => {
    try {
      const { name, password, email } = req.body.user;
      //const authServiceInstance = new AuthService();
      const { user, token } = await authService.SignUp(name, password, email);
      return res.json({ user, token }).status(200).end();
    } catch (ex) {
      //return res.json(e).status(500).end();
      next(ex);
    }
  })

module.exports = router;