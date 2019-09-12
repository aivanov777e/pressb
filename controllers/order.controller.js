const Sequelize = require('sequelize');
const sequelize = require('../services/db.service');
// const OrderService = require('../services/order.service');
    
class OrderController {
  async getOrder(req, res){
  console.log('getOrder');
  let data;
  if (req.query.id) {
    if (req.query.id === '-1') {
      const dataLast = await sequelize.models.order.findOne({ order: [['regDate', 'DESC']], raw: true });
      data = {number: +dataLast.number + 1}
    } else {
      data = await sequelize.models.order.findByPk(req.query.id, {include: [{ all: true, nested: false }]});
    }
  } else {
    //data = await sequelize.models.order.findAll({ order: [['regDate', 'DESC']], raw: true, include: [{ all: true, nested: true }] });
    data = await sequelize.models.order.findAll({ order: [['regDate', 'DESC']], raw: true, include: [{ all: true, nested: false }] });
    console.log(data);
    console.log(JSON.stringify(data))
    //data = await sequelize.models.order.findAll({ order: [['regDate', 'DESC']], raw: true, include: [{ model: sequelize.models.division, as: 'division' }] });
  }
  return res.status(200).send(data);



  //  if(req.query.id){
  //    if(req.order.hasOwnProperty(req.query.id))
  //      return res.status(200).send({data: req.order[req.query.id]});
  //    else
  //      return res.status(404).send({message: 'Order not found.'});
  //  }else if(!req.order)
  //    return res.status(404).send({message: 'Order not found.'});

  //  return res.status(200).send({data: req.order});
  }

  async createOrder(req, res){
    console.log('createOrder');
    console.log(req);
    if (!req.body.division.id) {
      let division = await sequelize.models.division.create(req.body.division);
      req.body.divisionId = division.id;
    }
    if (!req.body.subdivisionId && req.body.subdivision && req.body.subdivision.name) {
      const [subdivision, created] = await sequelize.models.subdivision.findOrCreate({where: {divisionId: req.body.divisionId, name: req.body.subdivision.name}, defaults: req.body.subdivision});
      console.log(subdivision);
      req.body.subdivisionId = subdivision.id;
    }
    if (!req.body.contactId) {
      req.body.contact.divisionId = req.body.subdivisionId || req.body.divisionId;
      //const [contact, created] = await sequelize.models.contact.findOrCreate({where: {divisionId: divisionId, name: req.body.contact.name}, defaults: req.body.contact});
      const contact = await sequelize.models.contact.create(req.body.contact);
      console.log(contact);
      req.body.contactId = contact.id;
    } else {
      // Если надо обновим телефон
      let up = await sequelize.models.contact.update({tel: req.body.contact.tel}, {where: {id: req.body.contactId, tel: {[Sequelize.Op.not]: req.body.tel}}});
      console.log(up);
    }
    let newOrder = await sequelize.models.order.create(req.body);
    let data = await sequelize.models.order.findByPk(newOrder.id, {include: [{ all: true, nested: false }]});
    return res.status(200).send(data);
  }
  //  async createOrder(req, res){
  //    if(req.body.order && req.body.order.id){
  //      if(req.order.hasOwnProperty(req.body.order.id))
  //        return res.status(409).send({message: 'Order already exists.'});
  
  //      req.order[req.body.order.id] = req.body.order;
  
  //      let result = await OrderService.createOrder(req.order);
  
  //      if(result)
  //        return res.status(200).send(result);
  //      else
  //        return res.status(500).send({message: 'Unable create order.'});
  //    }else
  //      return res.status(400).send({message: 'Bad request.'});
  //  }
  
  async updateOrder(req, res) {
    console.log('updateOrder');
    if (!req.body.divisionId) {
      //let division = await sequelize.models.division.create(req.body.division);
      //req.body.divisionId = division.id;
      const [division, created] = await sequelize.models.division.findOrCreate({where: {name: req.body.division.name}, defaults: req.body.division});
      console.log(division);
      req.body.divisionId = division.id;
    }
    if (!req.body.subdivisionId && req.body.subdivision && req.body.subdivision.name) {
      const [subdivision, created] = await sequelize.models.subdivision.findOrCreate({where: {divisionId: req.body.divisionId, name: req.body.subdivision.name}, defaults: req.body.subdivision});
      console.log(subdivision);
      req.body.subdivisionId = subdivision.id;
    }
    if (!req.body.contactId) {
      req.body.contact.divisionId = req.body.subdivisionId || req.body.divisionId;
      //const [contact, created] = await sequelize.models.contact.findOrCreate({where: {divisionId: divisionId, name: req.body.contact.name}, defaults: req.body.contact});
      const contact = await sequelize.models.contact.create(req.body.contact);
      console.log(contact);
      req.body.contactId = contact.id;
    } else {
      // Если надо обновим телефон
      let up = await sequelize.models.contact.update({tel: req.body.contact.tel}, {where: {id: req.body.contactId, tel: {[Sequelize.Op.not]: req.body.contact.tel}}});
      console.log(up);
    }
    await sequelize.models.order.update(req.body, { where: { id: req.body.id } });
    let data = await sequelize.models.order.findByPk(req.body.id, {include: [{ all: true, nested: false }]});
    return res.status(200).send(data);
  }
  //  async updateOrder(req, res){
  //    if(req.body.order && req.body.order.id){
  //      if(!req.order.hasOwnProperty(req.body.order.id))
  //        return res.status(404).send({message: 'Order not found.'});
  
  //      req.order[req.body.order.id] = req.body.order;
  
  //      let result = await OrderService.updateOrder(req.order);
  
  //      if(result)
  //        return res.status(200).send(result);
  //      else
  //        return res.status(500).send({message: 'Unable update order.'});
  //    }else
  //      return res.status(400).send({message: 'Bad request.'});
  //  }
  
  //  async deleteOrder(req, res){
  //    if(req.query.id){
  //      if(req.order.hasOwnProperty(req.query.id)){
  //        delete req.order[req.query.id];
  
  //        let result = await OrderService.deleteOrder(req.order);
  
  //        if(result)
  //          return res.status(200).send(result);
  //        else
  //          return res.status(500).send({message: 'Unable delete order.'});
  //      } else
  //        return res.status(404).send({message: 'Order not found.'});
  //    }else
  //      return res.status(400).send({message: 'Bad request.'});
  //  }
}
    
module.exports = new OrderController();
