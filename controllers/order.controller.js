const Sequelize = require('sequelize');
const sequelize = require('../services/db.service');
const Op = Sequelize.Op
const Order = sequelize.models.order
const OrderPress = sequelize.models.orderPress
const OrderPostPress = sequelize.models.orderPostPress
const Contact = sequelize.models.contact
const Work = sequelize.models.work
// const OrderService = require('../services/order.service');
var moment = require('moment');

async function getOrderById(id) {
  return await Order.findByPk(id, {
    include: [
      { all: true, nested: false },
      { model: OrderPress, as: 'cover', include: [{ model: Contact}, { association: OrderPress.PostPress, include: [{ model: Contact}, { model: Work}]}]},
      { association: Order.Block, include: [{ model: Contact}, { association: OrderPress.PostPress, include: [{ model: Contact}, { model: Work}]}]},
      //{ association: Order.PostPress, include: [{ model: Contact}, { model: Work}]}
    ]    
  });
}
    
class OrderController {
  async getOrder(req, res, next){
    try {
      console.log('getOrder');
      let data;
      if (req.query.id) {
        if (req.query.id === '-1') {
          const dataLast = await sequelize.models.order.findOne({ order: [['regDate', 'DESC']], raw: true });
          data = {number: +dataLast.number + 1, regDate: moment()}
        } else {
          // data = await sequelize.models.order.findByPk(req.query.id, {
          //   include: [
          //     { all: true, nested: false },
          //     { model: OrderPress, as: 'cover', include: [{ model: Contact}]},
          //     { association: Order.Block, include: [{ model: Contact}]},
          //     { association: Order.PostPress, include: [{ model: Contact}, { model: Work}]}
          //   ]    
          // });
          data = await getOrderById(req.query.id);
        }
      } else {
        data = await sequelize.models.order.findAll({ order: [['regDate1', 'DESC']], raw: true, include: [
          { association: Order.Division },
          { association: Order.Subdivision },
          { association: Order.Contact }
        ]});
        //data = await sequelize.models.order.findAll({ order: [['regDate', 'DESC']], raw: true, include: [{ all: true, nested: false }] });
        console.log(data);
        console.log(JSON.stringify(data))
        //data = await sequelize.models.order.findAll({ order: [['regDate', 'DESC']], raw: true, include: [{ model: sequelize.models.division, as: 'division' }] });
      }
      return res.status(200).send(data);
    } catch (err) {
      //return res.status(500).send({message: `Ошибка получения данных ${e.message}`});
      //return res.status(500).send(e);
      next(err);
    }


  //  if(req.query.id){
  //    if(req.order.hasOwnProperty(req.query.id))
  //      return res.status(200).send({data: req.order[req.query.id]});
  //    else
  //      return res.status(404).send({message: 'Order not found.'});
  //  }else if(!req.order)
  //    return res.status(404).send({message: 'Order not found.'});

  //  return res.status(200).send({data: req.order});
  }

  async createAssociations(body) {
    console.log('createAssociations');
    if (!body.division.id) {
      // let division = await sequelize.models.division.create({name: body.division});
      // body.divisionId = division.id;
      const newDiv = {name: body.division}
      const [division, created] = await sequelize.models.division.findOrCreate({where: newDiv, defaults: newDiv});
      //console.log(division);
      body.divisionId = division.id;
    }

    if (!body.subdivisionId && body.subdivision) {
      const newSubDiv = {divisionId: body.divisionId, name: body.subdivision}
      const [subdivision, created] = await sequelize.models.subdivision.findOrCreate({where: newSubDiv, defaults: newSubDiv});
      //console.log(subdivision);
      body.subdivisionId = subdivision.id;
    }

    if (!body.contactId && body.contact) {
      const newContact = {
        divisionId: body.subdivisionId || body.divisionId,
        name: body.contact,
        tel: body.contactTel || '',
      }
      //const [contact, created] = await sequelize.models.contact.findOrCreate({where: {divisionId: divisionId, name: body.contact.name}, defaults: body.contact});
      const contact = await sequelize.models.contact.create(newContact);
      //console.log(contact);
      body.contactId = contact.id;
    } else if (body.contactId && body.contact && body.contactTel !== body.contact.tel ) {
      // Если надо обновим телефон
      const tel = body.contactTel || '';
      let up = await Contact.update(
        {tel: tel},
        //{where: {id: body.contactId, [Op.or]:[{tel: {[Op.ne]: tel}}, {tel: {[Op.is]: null}}]}}
        {where: {id: body.contactId}}
      );
      console.log(up);
    }

    if (!body.cover.contactId && body.cover.contact) {
      const newContact = {name: body.cover.contact}
      const [contact, created] = await sequelize.models.contact.findOrCreate({where: newContact, defaults: newContact});
      //const contact = await sequelize.models.contact.create(newContact);
      //console.log(contact);
      body.cover.contactId = contact.id;
    }

    if (!body.block.contactId && body.block.contact) {
      const newContact = {name: body.block.contact}
      const [contact, created] = await sequelize.models.contact.findOrCreate({where: newContact, defaults: newContact});
      body.block.contactId = contact.id;
    }
  }

  async createOrder(req, res){
    console.log('createOrder');
    console.log(req.body);

    await module.exports.createAssociations(req.body);

    let newOrder = await Order.create(req.body, { include: [{ association: Order.Cover }, { association: Order.Block }] });//

    //let data = await sequelize.models.order.findByPk(newOrder.id, {include: [{ all: true, nested: false }]});
    // let data = await sequelize.models.order.findByPk(newOrder.id, {
    //   include: [
    //     { all: true, nested: false },
    //     { model: OrderPress, as: 'cover', include: [{ model: Contact}]},
    //     { association: Order.Block, include: [{ model: Contact}]}
    //   ]
    // });
    const data = await getOrderById(newOrder.id);
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
    console.log(req.body);

    await module.exports.createAssociations(req.body);

    await sequelize.models.order.update(req.body, { where: { id: req.body.id } });
    await OrderPress.update(req.body.cover, { where: { id: req.body.cover.id } });
    await OrderPress.update(req.body.block, { where: { id: req.body.block.id } });

    const pp = req.body.cover.postPress.concat(req.body.block.postPress);
    console.log(pp);

    const ppiu = pp.filter(v => v.crud === 'i' || v.crud === 'u');
    if (ppiu.length) {
      await OrderPostPress.bulkCreate(ppiu, {updateOnDuplicate: ['option', 'price', 'contactId', 'workId']});
    }

    const ppd = pp.filter(v => v.crud === 'd').map(v => v.id);
    if (ppd.length) {
      await OrderPostPress.destroy({where: {id: ppd}});
    }

    //let data = await sequelize.models.order.findByPk(req.body.id, {include: [{ all: true, nested: false }]});
    // let data = await sequelize.models.order.findByPk(req.body.id, {
    //   include: [
    //     { all: true, nested: false },
    //     { model: OrderPress, as: 'cover', include: [{ model: Contact}]},
    //     { association: Order.Block, include: [{ model: Contact}]}
    //   ]
    // });
    const data = await getOrderById(req.body.id);
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
