const Sequelize = require('sequelize');
const sequelize = require('../services/db.service');
// const OrderService = require('../services/order.service');
const Op = Sequelize.Op
//import * as moment from 'moment';
var moment = require('moment');
    
class PaperController {
  async getPaper(req, res){
    console.log('getPaper');
    //console.log(req.query.at);
    const at = moment(req.query.at)//.toDate();
    //console.log(at);
    let data;
    if (req.query.id) {
      if (req.query.id === '-1') {
        //const dataLast = await sequelize.models.paper.findOne({ order: [['regDate', 'DESC']], raw: true });
        data = {}
      } else {
        data = await sequelize.models.paper.findByPk(req.query.id, {include: [{ all: true, nested: false }]});
      }
    } else {
      //data = await sequelize.models.order.findAll({ order: [['regDate', 'DESC']], raw: true, include: [{ all: true, nested: true }] });
      data = await sequelize.models.paper.findAll({ 
        order: [['material', 'name', 'ASC'], ['format', 'name', 'ASC'], ['density', 'ASC']], 
        raw: true, 
        include: [
          { all: true, nested: false },
          { model: sequelize.models.paperPrice, 
            nested: false, 
            required: false,
            where: { 
              'startDate': { [Op.lte]: at }, 
              [Op.or]: [
                {'endDate': { [Op.gt]: at }},
                {'endDate': { [Op.is ]: null}}
              ]
            }
          }
        ] 
      });
      //data = await sequelize.models.order.findAll({ order: [['regDate', 'DESC']], raw: true, include: [{ model: sequelize.models.division, as: 'division' }] });
    }
    //console.log(data);
    //console.log(JSON.stringify(data))
    return res.status(200).send(data);
  }

  async createPaper(req, res){
    console.log('createPaper');
    //console.log(req);
    let newPaper = await sequelize.models.paper.create(req.body);
    let data = await sequelize.models.paper.findByPk(newPaper.id, {include: [{ all: true, nested: false }]});
    return res.status(200).send(data);
  }

  async updatePaper(req, res) {
    console.log('updatePaper');
    //console.log(req);
    //await sequelize.models.paper.update(req.body, { where: { id: req.body.id } });
    await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async tran => {
      await sequelize.models.paperPrice.destroy({ where: { paperId: {[Op.eq]: req.body.id} }, transaction: tran });
      await sequelize.models.paperPrice.bulkCreate(req.body.paperPrices, { transaction: tran });
    }).then(async result => {
      let data = await sequelize.models.paper.findByPk(req.body.id, {include: [{ all: true, nested: false }]});
      return res.status(200).send(data);
        // transaction has been committed. Do something after the commit if required.
    }).catch(err => {
      return res.status(400).send(err);
    });
    // await sequelize.models.paperPrice.destroy({ where: { paperId: {[Op.eq]: req.body.id} } });
    // await sequelize.models.paperPrice.bulkCreate(req.body.paperPrices);
  }
}
    
module.exports = new PaperController();
