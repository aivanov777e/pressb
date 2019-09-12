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
  tel: Sequelize.STRING,
  divisionId: {
    allowNull: false,
    type: Sequelize.UUID,
  },
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

let subdivision = sequelize.define('subdivision', {
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

//sequelize.models.division.hasMany(order);
order.belongsTo(division, {foreignKey: 'divisionId', sourceKey: 'id'});
//sequelize.models.division.hasMany(order, {foreignKey: 'subdivisionId', sourceKey: 'id'});
order.belongsTo(subdivision, {foreignKey: 'subdivisionId', sourceKey: 'id'});
//sequelize.models.contact.hasMany(order);
order.belongsTo(contact, {foreignKey: 'contactId', sourceKey: 'id'});

division.hasMany(subdivision);

let printer = sequelize.define('printer', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    //allowNull: false,
  },
  name: Sequelize.STRING,
}, {});

let format = sequelize.define('format', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    //allowNull: false,
  },
  name: Sequelize.STRING,
  width: Sequelize.NUMBER,
  height: Sequelize.NUMBER,
}, {});



// sequelize.sync({ force: true }).then(result=>{
//   console.log(result);  

//   createTestData();

//   })
// .catch(err=> console.log(err));  

async function createTestData() {
  let newDivision = {
    name: 'Тест division',
  }
  let newDivisionRecord = await sequelize.models.division.create(newDivision);

  let newOrder = {
    regDate: Date.now(),
    name: 'Тест order',
    number: '123',
    divisionId: newDivisionRecord.id
  }
  let newOrderRecord = await sequelize.models.order.create(newOrder);

  let newFormats = [
    {name: 'А0', width: 1189, height: 841},
    {name: 'А1', width: 841, height: 594},
    {name: 'А2', width: 594, height: 420},
    {name: 'А3', width: 420, height: 297},
    {name: 'А4', width: 297, height: 210},
    {name: 'А5', width: 210, height: 148},
    {name: 'А6', width: 148, height: 105},
    {name: 'А7', width: 105, height: 74},
    {name: 'Рулон', width: 300},
    {name: 'Рулон', width: 420},
    {name: 'Рулон', width: 841},
    {name: 'Рулон', width: 1000},
    {name: 'Рулон', width: 1250},
    {name: 'Рулон', width: 1360},
    {name: 'Рулон', width: 1500},
    {name: 'Рулон', width: 1600},
  ]
  await sequelize.models.format.bulkCreate(newFormats);
}