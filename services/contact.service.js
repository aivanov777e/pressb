const Sequelize = require('sequelize');
const sequelize = require('./db.service');
const division = require('./division.service');

// Создаём описание таблички
let contact = sequelize.define('contact', {
  id: {
    primaryKey: true,
    allowNull: false,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tel: Sequelize.STRING
},{});

sequelize.models.division.hasMany(contact);

contact.sync().then(result=>{
  console.log(result);
})
  .catch(err=> console.log(err));  