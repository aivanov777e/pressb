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
}

module.exports = new HandbookController();
