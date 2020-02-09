const Sequelize = require('sequelize');
const sequelize = require('../services/db.service');
const Op = Sequelize.Op
var moment = require('moment');

class HandbookController {
  async getFormat(req, res){
    console.log('getFormat');
    //let wh = {divisionId: req.query.divisionId}
    //let data
    let includeEquipment = []
    if (req.query.equipmentId) {
      //wh.name = {[Op.like]: '%' + req.query.mask + '%'};
      //includeEquipment = [{ model: sequelize.models.equipment, as: 'equipments', through: 'equipmentFormat', where:{id: req.query.equipmentId}}]
      includeEquipment = [{ model: sequelize.models.equipment, where:{id: req.query.equipmentId}}]
    }
    let data = await sequelize.models.format.findAll({
//      include: [{ model: sequelize.models.equipment, as: 'equipments', through: 'equipmentFormat', where:{id: req.query.equipmentId}}]
        attributes: ['id', 'name'],
        include: includeEquipment,
        order: [['name', 'ASC']]
    });
    return res.status(200).send(data);
  }

  async getColor(req, res){
    console.log('getColor');
    // let wh = {divisionId: req.query.divisionId}
    // let wh = {}
    // if (req.query.equipmentId) {
    //   wh.name = {[Sequelize.Op.like]: '%' + req.query.mask + '%'};
    // }
    //let data = await sequelize.models.color.findAll({ order: [['name', 'ASC']]});
    let data = [];
    if (req.query.equipmentId && req.query.formatId) {
      // data = await sequelize.models.workPrice.findAll({ 
      //   attributes: [[sequelize.fn('DISTINCT', sequelize.col('col_name')), 'alias_name']],
      //   order: [['name', 'ASC']]
      // });
      data = await sequelize.query(`
        select distinct color1::text || '+' || color2 as "name", color1, color2 from "workPrices" wp
          inner join "equipment" e on wp."workId" = e."workId"
          where e.id = '` + req.query.equipmentId + `'
            and wp."formatId" = '` + req.query.formatId + `'
          order by 1`
      , { type: sequelize.QueryTypes.SELECT });
    }
    return res.status(200).send(data);
  }

  async getMaterial(req, res){
    console.log('getMaterial');
    // let wh = {divisionId: req.query.divisionId}
    // let wh = {}
    // if (req.query.equipmentId) {
    //   wh.name = {[Sequelize.Op.like]: '%' + req.query.mask + '%'};
    // }
    let data;

    if (req.query.formatId) {
      const at = moment(req.query.at)
      data = await sequelize.models.material.findAll({ 
        attributes: ['id', 'name'],
        order: [['name', 'ASC']],
        //raw: true, 
        include: [
          { model: sequelize.models.paper,
            attributes: [],
            where: {'formatId': req.query.formatId},
            include: [
              { model: sequelize.models.paperPrice, 
                attributes: [],
                where: { 
                  'startDate': { [Op.lte]: at }, 
                  [Op.or]: [
                    {'endDate': { [Op.gt]: at }},
                    {'endDate': { [Op.is ]: null}}
                  ]
                }
              }
            ]
          }
        ]
      });
    } else {
      data = await sequelize.models.material.findAll({ 
        attributes: ['id', 'name'],
        order: [['name', 'ASC']]
      });
    }
    return res.status(200).send(data);
  }
}

module.exports = new HandbookController();
