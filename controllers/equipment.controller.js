const Sequelize = require('sequelize');
const sequelize = require('../services/db.service');
const Op = Sequelize.Op
//import * as moment from 'moment';
var moment = require('moment');
    
class EquipmentController {
  async getEquipment(req, res){
    console.log('getEquipment');
    //let wh = {divisionId: req.query.divisionId}
    let data;
    if (req.query.id) {
      if (req.query.id === '-1') {
        //const dataLast = await sequelize.models.work.findOne({ order: [['regDate', 'DESC']], raw: true });
        data = {}
      } else {
        data = await sequelize.models.equipment.findByPk(req.query.id, {
          include: [
            { model: sequelize.models.equipmentFormat, nested: false, required: false }
          ]
        });
      }
    } else {
      let fo = {
        order: [['name', 'ASC']],
        raw: true,
        include: [
          { model: sequelize.models.work, nested: false, required: false, attributes: ['name'] },
        ]
      }
      if (req.query.mask) {
        fo.where = {};
        fo.where.name = {[Sequelize.Op.like]: '%' + req.query.mask + '%'};
      }
      data = await sequelize.models.equipment.findAll(fo);
    }
    return res.status(200).send(data);
  }

  async createEquipment(req, res){
    console.log('createEquipment');
    //console.log(req);
    let newEquipment = await sequelize.models.equipment.create(req.body);
    let data = await sequelize.models.equipment.findByPk(newEquipment.id);
    if (req.body.equipmentFormats) {
      req.body.equipmentFormats.forEach(v => v.equipmentId = newEquipment.id);
      await sequelize.models.equipmentFormat.bulkCreate(req.body.equipmentFormats);
    }
    return res.status(200).send(data);
  }

  async updateEquipment(req, res) {
    console.log('updateEquipment');
    //console.log(req);
    await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async tran => {
      await sequelize.models.equipment.update(req.body, { where: { id: req.body.id }, transaction: tran });
      await sequelize.models.equipmentFormat.destroy({ where: { equipmentId: {[Op.eq]: req.body.id} }, transaction: tran });
      await sequelize.models.equipmentFormat.bulkCreate(req.body.equipmentFormats, { transaction: tran });
    }).then(async result => {
      let data = await sequelize.models.equipment.findByPk(req.body.id, {
        include: [
          { model: sequelize.models.equipmentFormat, nested: false, required: false }
        ]
      });
      return res.status(200).send(data);
    }).catch(err => {
      return res.status(400).send(err);
    });

    // await sequelize.models.equipment.update(req.body, { where: { id: req.body.id } });
    // let data = await sequelize.models.equipment.findByPk(req.body.id);
    // return res.status(200).send(data);
  }
}

module.exports = new EquipmentController();
