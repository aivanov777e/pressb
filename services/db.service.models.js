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

let format = sequelize.define('format', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    //allowNull: false,
  },
  name: Sequelize.STRING,
  width: Sequelize.INTEGER,
  height: Sequelize.INTEGER,
}, {});

let color = sequelize.define('color', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    //allowNull: false,
  },
  name: Sequelize.STRING,
}, {});

let material = sequelize.define('material', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    //allowNull: false,
  },
  name: Sequelize.STRING,
}, {});

let printer = sequelize.define('printer', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    //allowNull: false,
  },
  name: Sequelize.STRING,
}, {});

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
  productCount: Sequelize.INTEGER,
  productWidth: Sequelize.INTEGER,
  productHeigth: Sequelize.INTEGER,
  coverCount: Sequelize.INTEGER,
  blockCount: Sequelize.INTEGER,
  coverCountAdj: Sequelize.INTEGER,
  blockCountAdj: Sequelize.INTEGER,  
}, {});

division.hasMany(subdivision);

printer.belongsToMany(format, {through: 'printerFormat'});//, foreignKey: 'printerId'
format.belongsToMany(printer, {through: 'printerFormat'});//, foreignKey: 'formatId'

//sequelize.models.division.hasMany(order);
order.belongsTo(division, {foreignKey: 'divisionId', sourceKey: 'id'});
//sequelize.models.division.hasMany(order, {foreignKey: 'subdivisionId', sourceKey: 'id'});
order.belongsTo(subdivision, {foreignKey: 'subdivisionId', sourceKey: 'id'});
//sequelize.models.contact.hasMany(order);
order.belongsTo(contact, {foreignKey: 'contactId', sourceKey: 'id'});

order.belongsTo(contact, {foreignKey: 'coverPerformerId', sourceKey: 'id'});
order.belongsTo(contact, {foreignKey: 'blockPerformerId', sourceKey: 'id'});

order.belongsTo(printer, {foreignKey: 'coverPrinterId', sourceKey: 'id'});
order.belongsTo(printer, {foreignKey: 'blockPrinterId', sourceKey: 'id'});

order.belongsTo(format, {foreignKey: 'coverFormatId', sourceKey: 'id'});
order.belongsTo(format, {foreignKey: 'blockFormatId', sourceKey: 'id'});

order.belongsTo(material, {foreignKey: 'coverMaterialId', sourceKey: 'id'});
order.belongsTo(material, {foreignKey: 'blockMaterialId', sourceKey: 'id'});

order.belongsTo(color, {foreignKey: 'coverColor1Id', sourceKey: 'id'});
order.belongsTo(color, {foreignKey: 'coverColor2Id', sourceKey: 'id'});
order.belongsTo(color, {foreignKey: 'blockColor1Id', sourceKey: 'id'});
order.belongsTo(color, {foreignKey: 'blockColor2Id', sourceKey: 'id'});




sequelize.sync({ force: true }).then(result=>{
  console.log(result);  

  createTestData();

  })
.catch(err=> console.log(err));  

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


  let formatA0 = await sequelize.models.format.create({name: 'А0', width: 1189, height: 841});
  let formatA1 = await sequelize.models.format.create({name: 'А1', width: 841, height: 594});
  let formatA2 = await sequelize.models.format.create({name: 'А2', width: 594, height: 420});
  let formatA3 = await sequelize.models.format.create({name: 'А3', width: 420, height: 297});
  let formatA4 = await sequelize.models.format.create({name: 'А4', width: 297, height: 210});
  let formatA5 = await sequelize.models.format.create({name: 'А5', width: 210, height: 148});
  let formatA6 = await sequelize.models.format.create({name: 'А6', width: 148, height: 105});
  let formatA7 = await sequelize.models.format.create({name: 'А7', width: 105, height: 74});
  let format300 = await sequelize.models.format.create({name: 'Рулон 300 мм', width: 300});
  let format420 = await sequelize.models.format.create({name: 'Рулон 420 мм', width: 420});
  let format841 = await sequelize.models.format.create({name: 'Рулон 841 мм', width: 841});
  let format1000 = await sequelize.models.format.create({name: 'Рулон 1000 мм', width: 1000});
  let format1250 = await sequelize.models.format.create({name: 'Рулон 1250 мм', width: 1250});
  let format1360 = await sequelize.models.format.create({name: 'Рулон 1360 мм', width: 1360});
  let format1500 = await sequelize.models.format.create({name: 'Рулон 1500 мм', width: 1500});
  let format1600 = await sequelize.models.format.create({name: 'Рулон 1600 мм', width: 1600});

  // let newFormats = [
  //   {name: 'А0', width: 1189, height: 841},
  //   {name: 'А1', width: 841, height: 594},
  //   {name: 'А2', width: 594, height: 420},
  //   {name: 'А3', width: 420, height: 297},
  //   {name: 'А4', width: 297, height: 210},
  //   {name: 'А5', width: 210, height: 148},
  //   {name: 'А6', width: 148, height: 105},
  //   {name: 'А7', width: 105, height: 74},
  //   {name: 'Рулон 300 мм', width: 300},
  //   {name: 'Рулон 420 мм', width: 420},
  //   {name: 'Рулон 841 мм', width: 841},
  //   {name: 'Рулон 1000 мм', width: 1000},
  //   {name: 'Рулон 1250 мм', width: 1250},
  //   {name: 'Рулон 1360 мм', width: 1360},
  //   {name: 'Рулон 1500 мм', width: 1500},
  //   {name: 'Рулон 1600 мм', width: 1600},
  // ]
  // await sequelize.models.format.bulkCreate(newFormats);

  let printerRol = await sequelize.models.printer.create({name: 'Роланд'});
  let printerHam = await sequelize.models.printer.create({name: 'Хамада'});
  let printerX75 = await sequelize.models.printer.create({name: 'Xerox 75'});
  let printerX700 = await sequelize.models.printer.create({name: 'Xerox 700'});
  let printerX7535 = await sequelize.models.printer.create({name: 'Xerox 7535'});
  let printerX95 = await sequelize.models.printer.create({name: 'Xerox 95'});
  let printerD550 = await sequelize.models.printer.create({name: 'Duplo 550'});
  let printerMim = await sequelize.models.printer.create({name: 'Mimaki'});
  let printerX6200 = await sequelize.models.printer.create({name: 'Xerox 6200'});
  let printerSh = await sequelize.models.printer.create({name: 'Шелкография'});

  let color0 = await sequelize.models.color.create({name: '0'});
  let color1 = await sequelize.models.color.create({name: '1'});
  let color2 = await sequelize.models.color.create({name: '2'});
  let color3 = await sequelize.models.color.create({name: '3'});
  let color4 = await sequelize.models.color.create({name: '4'});

  let materialOfs = await sequelize.models.material.create({name: 'Офсет 70 гр'});
  let materialVHI = await sequelize.models.material.create({name: 'ВХИ 180 гр'});
  let materialSne = await sequelize.models.material.create({name: 'Снегурочка'});
  let materialSam = await sequelize.models.material.create({name: 'Самоклеющиеся бумага'});
  let materialD12 = await sequelize.models.material.create({name: 'Дизайнерская бумага 120 гр'});
  let materialD25 = await sequelize.models.material.create({name: 'Дизайнерская бумага 250 гр'});
  let materialM11 = await sequelize.models.material.create({name: 'Мелованная бумага 115 гр'});
  let materialM15 = await sequelize.models.material.create({name: 'Мелованная бумага 150 гр'});
  let materialM17 = await sequelize.models.material.create({name: 'Мелованная бумага 170 гр'});
  let materialM20 = await sequelize.models.material.create({name: 'Мелованная бумага 200 гр'});
  let materialM30 = await sequelize.models.material.create({name: 'Мелованная бумага 300 гр'});
  let materialK30 = await sequelize.models.material.create({name: 'Картон 300 гр'});
  let materialBan = await sequelize.models.material.create({name: 'Банер'});
  let materialFot = await sequelize.models.material.create({name: 'Фото бумага'});
  let materialPle = await sequelize.models.material.create({name: 'Плёнка'});

  // console.log(printerRol.id);  
  // console.log(formatA2.id);  
  await sequelize.models.printerFormat.create({printerId: printerRol.id, formatId: formatA2.id});
  await sequelize.models.printerFormat.create({printerId: printerHam.id, formatId: formatA3.id});
  await sequelize.models.printerFormat.create({printerId: printerMim.id, formatId: format1000.id});
  await sequelize.models.printerFormat.create({printerId: printerMim.id, formatId: format1250.id});
  await sequelize.models.printerFormat.create({printerId: printerMim.id, formatId: format1360.id});
  await sequelize.models.printerFormat.create({printerId: printerMim.id, formatId: format1500.id});
  await sequelize.models.printerFormat.create({printerId: printerMim.id, formatId: format1600.id});
  await sequelize.models.printerFormat.create({printerId: printerX6200.id, formatId: formatA0.id});
  await sequelize.models.printerFormat.create({printerId: printerX6200.id, formatId: formatA1.id});
  await sequelize.models.printerFormat.create({printerId: printerX6200.id, formatId: formatA2.id});
  await sequelize.models.printerFormat.create({printerId: printerX6200.id, formatId: format300.id});
  await sequelize.models.printerFormat.create({printerId: printerX6200.id, formatId: format420.id});
  await sequelize.models.printerFormat.create({printerId: printerX6200.id, formatId: format841.id});
  await sequelize.models.printerFormat.create({printerId: printerX75.id, formatId: formatA3.id});
  await sequelize.models.printerFormat.create({printerId: printerX700.id, formatId: formatA3.id});
  await sequelize.models.printerFormat.create({printerId: printerX95.id, formatId: formatA3.id});
  await sequelize.models.printerFormat.create({printerId: printerD550.id, formatId: formatA3.id});
  await sequelize.models.printerFormat.create({printerId: printerX7535.id, formatId: formatA3.id});
  // let newPrinters = [
  //   {name: 'Роланд'},
  //   {name: 'Хамада'},
  //   {name: 'Xerox 75'},
  //   {name: 'Xerox 700'},
  //   {name: 'Xerox 7535'},
  //   {name: 'Xerox 95'},
  //   {name: 'Duplo 550'},
  //   {name: 'Mimaki'},
  //   {name: 'Xerox 6200'},
  //   {name: 'Шелкография'},
  // ]
  // await sequelize.models.printer.bulkCreate(newPrinters);
}