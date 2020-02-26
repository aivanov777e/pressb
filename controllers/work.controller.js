const Sequelize = require('sequelize');
const sequelize = require('../services/db.service');
// const OrderService = require('../services/order.service');
const Op = Sequelize.Op
//import * as moment from 'moment';
var moment = require('moment');
const Work = sequelize.models.work
const WorkPrice = sequelize.models.workPrice
const Format = sequelize.models.format
    
class WorkController {
  async getWork(req, res, next){
    try {
      console.log('getWork');
      //console.log(req.query.at);
      const at = moment(req.query.at)//.toDate();
      //console.log(at);
      let data;
      if (req.query.id) {
        if (req.query.id === '-1') {
          //const dataLast = await sequelize.models.work.findOne({ order: [['regDate', 'DESC']], raw: true });
          data = {postPressTypeId: 0}
        } else {
          data = await Work.findByPk(req.query.id, {//{include: [{ all: true, nested: true }]
            include: [
              { model: WorkPrice, nested: false, required: false,
                include: [{ model: Format, nested: false, required: false}]
              }            ]
          });
        }
      } else if (req.query.postPressTypeId) {
        data = await sequelize.models.work.findAll({ 
          order: [['name', 'ASC']], 
          where: {[Op.or]: [{postPressTypeId: 3}, {postPressTypeId: req.query.postPressTypeId}]},
          raw: true,
        });
      } else {
        //data = await sequelize.models.order.findAll({ order: [['regDate', 'DESC']], raw: true, include: [{ all: true, nested: true }] });
        data = await sequelize.models.work.findAll({ 
          order: [['name', 'ASC']], 
          raw: true, 
          include: [{association: Work.PostPressType}],
        });
        //data = await sequelize.models.order.findAll({ order: [['regDate', 'DESC']], raw: true, include: [{ model: sequelize.models.division, as: 'division' }] });
      }
      //console.log(data);
      //console.log(JSON.stringify(data))
      return res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  }

  async createWork(req, res, next) {
    try {
      console.log('createWork');
      //console.log(req);
      let newWork = await sequelize.models.work.create(req.body);
      let data = await sequelize.models.work.findByPk(newWork.id);
      return res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  }

  async updateWork(req, res, next) {
    try {
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
    } catch (err) {
      next(err);
    }
  }

  async createWorkPrice(req, res, next) {
    try {
      console.log('createWorkPrice');
      //console.log(req);
      let newWork = await sequelize.models.workPrice.create(req.body);
      let data = await sequelize.models.workPrice.findByPk(newWork.id, {include: [{ model: sequelize.models.format, nested: false, required: false}]});
      return res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  }

  async updateWorkPrice(req, res, next) {
    try {
      console.log('updateWorkPrice');
      //console.log(req);
      await sequelize.models.workPrice.update(req.body, { where: { id: req.body.id } });
      let data = await sequelize.models.workPrice.findByPk(req.body.id, {include: [{ model: sequelize.models.format, nested: false, required: false}]});
      return res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  }

  async deleteWorkPrice(req, res, next) {
    try{
      console.log('deleteWorkPrice');
      //console.log(req);
      await sequelize.models.workPrice.destroy({ where: { id: {[Op.eq]: req.body.id} } });
      return res.status(200).send({});
    } catch (err) {
      next(err);
    }
  }
}
    
module.exports = new WorkController();
