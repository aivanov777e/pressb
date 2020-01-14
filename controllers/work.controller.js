const Sequelize = require('sequelize');
const sequelize = require('../services/db.service');
// const OrderService = require('../services/order.service');
const Op = Sequelize.Op
//import * as moment from 'moment';
var moment = require('moment');
    
class WorkController {
  async getWork(req, res){
    console.log('getWork');
    //console.log(req.query.at);
    const at = moment(req.query.at)//.toDate();
    //console.log(at);
    let data;
    if (req.query.id) {
      if (req.query.id === '-1') {
        //const dataLast = await sequelize.models.work.findOne({ order: [['regDate', 'DESC']], raw: true });
        data = {}
      } else {
        data = await sequelize.models.work.findByPk(req.query.id, {include: [{ all: true, nested: false }]});
      }
    } else {
      //data = await sequelize.models.order.findAll({ order: [['regDate', 'DESC']], raw: true, include: [{ all: true, nested: true }] });
      data = await sequelize.models.work.findAll({ 
        order: [['name', 'ASC']], 
        raw: true, 
      });
      //data = await sequelize.models.order.findAll({ order: [['regDate', 'DESC']], raw: true, include: [{ model: sequelize.models.division, as: 'division' }] });
    }
    //console.log(data);
    //console.log(JSON.stringify(data))
    return res.status(200).send(data);
  }

  async createWork(req, res){
    console.log('createWork');
    //console.log(req);
    let newWork = await sequelize.models.work.create(req.body);
    let data = await sequelize.models.work.findByPk(newWork.id);
    return res.status(200).send(data);
  }

  async updateWork(req, res) {
    console.log('updateWork');
    //console.log(req);
    await sequelize.models.work.update(req.body, { where: { id: req.body.id } });
    let data = await sequelize.models.work.findByPk(req.body.id);
    return res.status(200).send(data);
    // await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async tran => {
    //   await sequelize.models.workPrice.destroy({ where: { workId: {[Op.eq]: req.body.id} }, transaction: tran });
    //   await sequelize.models.workPrice.bulkCreate(req.body.workPrices, { transaction: tran });
    // }).then(async result => {
    //   let data = await sequelize.models.work.findByPk(req.body.id, {include: [{ all: true, nested: false }]});
    //   return res.status(200).send(data);
    //     // transaction has been committed. Do something after the commit if required.
    // }).catch(err => {
    //   return res.status(400).send(err);
    // });
    // await sequelize.models.workPrice.destroy({ where: { workId: {[Op.eq]: req.body.id} } });
    // await sequelize.models.workPrice.bulkCreate(req.body.workPrices);
  }

  async createWorkPrice(req, res){
    console.log('createWorkPrice');
    //console.log(req);
    let newWork = await sequelize.models.workPrice.create(req.body);
    let data = await sequelize.models.workPrice.findByPk(newWork.id);
    return res.status(200).send(data);
  }

  async updateWorkPrice(req, res) {
    console.log('updateWorkPrice');
    //console.log(req);
    await sequelize.models.workPrice.update(req.body, { where: { id: req.body.id } });
    let data = await sequelize.models.workPrice.findByPk(req.body.id);
    return res.status(200).send(data);
  }

  async deleteWorkPrice(req, res) {
    console.log('deleteWorkPrice');
    //console.log(req);
    await sequelize.models.workPrice.destroy({ where: { id: {[Op.eq]: req.body.id} } });
    return res.status(200).send({});
  }
}
    
module.exports = new WorkController();
