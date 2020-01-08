const express = require("express"),
router = express.Router(),
orderRoutes = require("./order.routes");
divisionRoutes = require("./division.routes");
contactRoutes = require("./contact.routes");
handbookRoutes = require("./handbook.routes");
paperRoutes = require("./paper.routes");

router.use(async (req, res, next) => {
  console.log('index.js');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

router.use('/order', orderRoutes);
router.use('/division', divisionRoutes);
router.use('/contact', contactRoutes);
router.use('/handbook', handbookRoutes);
router.use('/paper', paperRoutes);

module.exports = router;
