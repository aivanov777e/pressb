const express = require("express"),
router = express.Router(),
orderRoutes = require("./order.routes");

router.use('/order', orderRoutes);

module.exports = router;
