const express = require("express"),
  router = express.Router(),
  orderRoutes = require("./order.routes"),
  divisionRoutes = require("./division.routes"),
  contactRoutes = require("./contact.routes"),
  handbookRoutes = require("./handbook.routes"),
  paperRoutes = require("./paper.routes"),
  workRoutes = require("./work.routes"),
  equipmentRoutes = require("./equipment.routes"),
  userRoutes = require("./user");
const isAuth = require('../middlewares/isAuth');

  //import userRoutes from './user';

router.use(async (req, res, next) => {
  console.log('index.js');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

router.use('/user', userRoutes);

router.use(isAuth);
// router.use(function (err, req, res, next) {
//   if (err.name === 'UnauthorizedError') {
//     res.status(401).send('invalid token...');
//   }
// });

router.use('/order', orderRoutes);
router.use('/division', divisionRoutes);
router.use('/contact', contactRoutes);
router.use('/handbook', handbookRoutes);
router.use('/paper', paperRoutes);
router.use('/work', workRoutes);
router.use('/equipment', equipmentRoutes);


module.exports = router;
