const Sequelize = require('sequelize');
const sequelize = require('../services/db.service');
    
class ContactController {
  async getContact(req, res){
    console.log('getContact');
    let wh = {divisionId: req.query.divisionId}
    if (req.query.mask) {
      wh.name = {[Sequelize.Op.like]: '%' + req.query.mask + '%'};
    }
    let data = await sequelize.models.contact.findAll({where: wh});
    return res.status(200).send(data);
  }
}

module.exports = new ContactController();
