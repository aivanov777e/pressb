const express = require("express"),
    router = express.Router(),
    OrderController = require('../controllers/order.controller'),
    OrderService = require('../services/order.service');

router.use(async (req, res, next) => {
let data = await OrderService.getOrder();

if(data){
  req.order = data;
  next();
}else
  return res.status(500).send({message: 'Error while getting order'});
});

router.route('/')
.get(OrderController.getOrder)
.post(OrderController.createOrder)
.put(OrderController.updateOrder)
.delete(OrderController.deleteOrder);

module.exports = router;
