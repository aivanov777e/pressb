const express = require("express"),
router = express.Router(),
orderRoutes = require("./order.routes");
divisionRoutes = require("./division.routes");

router.use(async (req, res, next) => {
  console.log('index.js');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  next();
});

router.use('/order', orderRoutes);
router.use('/division', divisionRoutes);

module.exports = router;
