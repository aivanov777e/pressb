const express = require("express"),
    router = express.Router(),
    orderController = require('../controllers/order.controller')
    //OrderService = require('../services/order.service');

router.use(async (req, res, next) => {
  console.log('order.routes.js');
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  next();
// let data = await OrderService.getOrder();

// if(data){
//   req.order = data;
//   next();
// }else
//   return res.status(500).send({message: 'Error while getting order'});
// 
});

router.route('/')
.get(orderController.getOrder)
.post(orderController.createOrder)
// .put(OrderController.updateOrder)
// .delete(OrderController.deleteOrder);

module.exports = router;
