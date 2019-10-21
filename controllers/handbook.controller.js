const Sequelize = require('sequelize');
const sequelize = require('../services/db.service');
    
class HandbookController {
  async getPrinter(req, res){
    console.log('getPrinter');
    //let wh = {divisionId: req.query.divisionId}
    let wh = {}
    if (req.query.mask) {
      wh.name = {[Sequelize.Op.like]: '%' + req.query.mask + '%'};
    }
    let data = await sequelize.models.printer.findAll({where: wh});
    return res.status(200).send(data);
  }

  async getFormat(req, res){
    console.log('getFormat');
    //let wh = {divisionId: req.query.divisionId}
    let wh = {}
    if (req.query.printerId) {
      wh.name = {[Sequelize.Op.like]: '%' + req.query.mask + '%'};
    }
    let data = await sequelize.models.format.findAll({
      include: [{ model: sequelize.models.printer, as: 'printers', through: 'printerFormat', where:{id: req.query.printerId}}]
    });
    return res.status(200).send(data);
  }

  async getColor(req, res){
    console.log('getColor');
    // let wh = {divisionId: req.query.divisionId}
    // let wh = {}
    // if (req.query.printerId) {
    //   wh.name = {[Sequelize.Op.like]: '%' + req.query.mask + '%'};
    // }
    let data = await sequelize.models.color.findAll({ order: [['name', 'ASC']]});
    return res.status(200).send(data);
  }

  async getMaterial(req, res){
    console.log('getMaterial');
    // let wh = {divisionId: req.query.divisionId}
    // let wh = {}
    // if (req.query.printerId) {
    //   wh.name = {[Sequelize.Op.like]: '%' + req.query.mask + '%'};
    // }
    let data = await sequelize.models.material.findAll({ order: [['name', 'ASC']]});
    return res.status(200).send(data);
  }
}

module.exports = new HandbookController();
