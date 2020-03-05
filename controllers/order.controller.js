const Sequelize = require('sequelize');
const sequelize = require('../services/db.service');
const Op = Sequelize.Op
const Order = sequelize.models.order
const OrderPress = sequelize.models.orderPress
const OrderPostPress = sequelize.models.orderPostPress
const Contact = sequelize.models.contact
const Work = sequelize.models.work
const WorkPrice = sequelize.models.workPrice
const Paper = sequelize.models.paper
const Equipment = sequelize.models.equipment
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

async function createAssociations(body) {
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

async function updatePrice(body) {
  let priceCover = await updatePressPrice(body.cover);
  let priceBlock = await updatePressPrice(body.block);
  body.price = priceCover + priceBlock;
}

async function updatePressPrice(press) {
  let paper = await Paper.findByPk(press.paperId);
  const cnt = (+press.count || 0) + (+press.countAdj || 0);
  press.pricePaper = cnt * (paper && +paper.price);

  const wps = await WorkPrice.findAll({
    where: { color1: press.color1, color2: press.color2, 
      [Op.or]: [{formatId: press.formatId}, {formatId: {[Op.is]: null}}], 
      [Op.or]: [{countFrom: {[Op.lt]: cnt}}, {countFrom: {[Op.is]: null}}]
    },
    order: [['countFrom', 'DESC'], ['formatId', 'ASC']],
    //include: [{model: Equipment, where: {id: press.equipmentId, workId: sequelize.col('workPrices.workId')}}]
    include: [
      {association: WorkPrice.Work, required: true, include: [
        {association: Work.Equipment, where: {id: press.equipmentId}}
      ]}
    ]
  });
  let p, p0;
  wps.forEach(async wp => {
    if (!p0 && !wp.countFrom) {p0 = wp}
    if (!p && wp.countFrom) {p = wp}
  })
  press.pricePress = (p0 ? +p0.price : 0) + ((p ? +p.price : 0) * cnt)

  // if (wp.length) {
  //   let p = wp[0], p0 = {price: 0};
  //   if (p.countFrom === null && wp.length > 1) {
  //     p0 = p;
  //     p = wp[1]
  //   }
  //   press.pricePress = +p0.price + (+p.price * cnt);
  // }

  let price = press.pricePress + press.pricePaper
  // press.postPress && await press.postPress.forEach(async pp => {
  // for (const pp of press.postPress) {
  //   price += await updatePostPressPrice(pp, cnt);
  // });
  if (press.postPress) {
    // делаем "map" массива в промисы
    var upp = updatePostPressPrice.bind(undefined, cnt)
    const promises = press.postPress.map(upp);
    // ждем когда всё промисы будут выполнены
    const res = await Promise.all(promises);
    res.forEach(v => price += v)
  }
  return price;
}

async function updatePostPressPrice(cnt, pp) {
  const wps = await WorkPrice.findAll({
    where: {
      [Op.or]: [{color1: pp.color1}, {color1: {[Op.is]: null}}], 
      [Op.or]: [{color2: pp.color2}, {color2: {[Op.is]: null}}], 
      [Op.or]: [{formatId: pp.formatId}, {formatId: {[Op.is]: null}}], 
      [Op.or]: [{countFrom: {[Op.lt]: cnt}}, {countFrom: {[Op.is]: null}}]
    },
    order: [['countFrom', 'DESC'], ['formatId', 'ASC'], ['color1', 'ASC'], ['color2', 'ASC']],
    include: [
      {association: WorkPrice.Work, where: {id: pp.workId}}
    ]
  });
  let p, p0;
  wps.forEach(async wp => {
    if (!p0 && !wp.countFrom) {p0 = wp}
    if (!p && wp.countFrom) {p = wp}
  })
  pp.price = (p0 ? +p0.price : 0) + ((p ? +p.price : 0) * cnt);
  return pp.price;
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
        data = await sequelize.models.order.findAll({ order: [['regDate', 'DESC']], raw: true, include: [
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

  async createOrder(req, res, next){
    try {
      console.log('createOrder');
      console.log(req.body);

      await createAssociations(req.body);
      await updatePrice(req.body);

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
    } catch (err) {
      next(err);
    }
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
  
  async updateOrder(req, res, next) {
    try {
      console.log('updateOrder');
      console.log(req.body);

      await createAssociations(req.body);
      await updatePrice(req.body);

      await sequelize.models.order.update(req.body, { where: { id: req.body.id } });
      await OrderPress.update(req.body.cover, { where: { id: req.body.cover.id } });
      await OrderPress.update(req.body.block, { where: { id: req.body.block.id } });

      const pp = req.body.cover.postPress.concat(req.body.block.postPress);
      console.log(pp);

      //const ppiu = pp.filter(v => v.crud === 'i' || v.crud === 'u');
      const ppiu = pp.filter(v => v.crud !== 'd');
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
    } catch (err) {
      next(err);
    }
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
