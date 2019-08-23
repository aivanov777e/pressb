const express = require("express"),
router = express.Router(),
orderRoutes = require("./order.routes");
divisionRoutes = require("./division.routes");

router.use('/order', orderRoutes);
router.use('/division', divisionRoutes);

module.exports = router;
