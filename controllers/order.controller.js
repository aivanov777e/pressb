const OrderService = require('../services/order.service');
    
    class OrderController {
     getOrder(req, res){
       if(req.query.id){
         if(req.order.hasOwnProperty(req.query.id))
           return res.status(200).send({data: req.order[req.query.id]});
         else
           return res.status(404).send({message: 'Order not found.'});
       }else if(!req.order)
         return res.status(404).send({message: 'Order not found.'});
    
       return res.status(200).send({data: req.order});
     }
    
     async createOrder(req, res){
       if(req.body.order && req.body.order.id){
         if(req.order.hasOwnProperty(req.body.order.id))
           return res.status(409).send({message: 'Order already exists.'});
    
         req.order[req.body.order.id] = req.body.order;
    
         let result = await OrderService.createOrder(req.order);
    
         if(result)
           return res.status(200).send(result);
         else
           return res.status(500).send({message: 'Unable create order.'});
       }else
         return res.status(400).send({message: 'Bad request.'});
     }
    
     async updateOrder(req, res){
       if(req.body.order && req.body.order.id){
         if(!req.order.hasOwnProperty(req.body.order.id))
           return res.status(404).send({message: 'Order not found.'});
    
         req.order[req.body.order.id] = req.body.order;
    
         let result = await OrderService.updateOrder(req.order);
    
         if(result)
           return res.status(200).send(result);
         else
           return res.status(500).send({message: 'Unable update order.'});
       }else
         return res.status(400).send({message: 'Bad request.'});
     }
    
     async deleteOrder(req, res){
       if(req.query.id){
         if(req.order.hasOwnProperty(req.query.id)){
           delete req.order[req.query.id];
    
           let result = await OrderService.deleteOrder(req.order);
    
           if(result)
             return res.status(200).send(result);
           else
             return res.status(500).send({message: 'Unable delete order.'});
         } else
           return res.status(404).send({message: 'Order not found.'});
       }else
         return res.status(400).send({message: 'Bad request.'});
     }
    }
    
    module.exports = new OrderController();
