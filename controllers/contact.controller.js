const Sequelize = require('sequelize');
const sequelize = require('../services/db.service');
const Op = Sequelize.Op;

class ContactController {
  async getContact(req, res){
    console.log('getContact');
    let wh = {};
    if (req.query.divisionId) {
      wh.divisionId = req.query.divisionId;
    } else {
      wh.divisionId = {[Op.is]: null};
    }
    if (req.query.mask) {
      wh.name = {[Sequelize.Op.like]: '%' + req.query.mask + '%'};
    }
    let data = await sequelize.models.contact.findAll({where: wh, order: [['name', 'ASC']], });
    return res.status(200).send(data);
  }
}

module.exports = new ContactController();
