const Sequelize = require('sequelize');
const sequelize = require('./db.service');

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

let division = sequelize.define('division', {
  id: {
      primaryKey: true,
      allowNull: false,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }},{}
);

let order = sequelize.define('order', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    //allowNull: false,
  },
  regDate: Sequelize.DATE,
  name: Sequelize.STRING,
  number: Sequelize.STRING,
}, {});

sequelize.models.division.hasMany(order);
sequelize.models.division.hasMany(order, {foreignKey: 'subdivisionId', sourceKey: 'id'});
sequelize.models.contact.hasMany(order);

division.hasMany(division);

sequelize.sync({ force: true }).then(result=>{
  console.log(result);  

  let newOrder = {
    regDate: Date.now(),
    name: 'Тест order',
    number: '123'
  }
  let newOrderRecord = sequelize.models.order.create(newOrder);

  let newDivision = {
    name: 'Тест division',
  }
  let newDivisionRecord = sequelize.models.division.create(newDivision);

  })
.catch(err=> console.log(err));  

//async function 