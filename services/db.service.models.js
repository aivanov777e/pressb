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

let paper = sequelize.define('paper', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    //allowNull: false,
  },
  //name: Sequelize.STRING,
  density: Sequelize.INTEGER,
  // price: Sequelize.DECIMAL(10, 2),
  // startDate: Sequelize.DATE,
  // endDate: Sequelize.DATE 
}, {});

let paperPrice = sequelize.define('paperPrice', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    //allowNull: false,
  },
  paperId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  startDate: Sequelize.DATE,
  endDate: Sequelize.DATE,
  price: Sequelize.DECIMAL(10, 2),
}, {});

let work = sequelize.define('work', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    //allowNull: false,
  },
  name: Sequelize.STRING,
  //postPress: Sequelize.INTEGER, // 0 нет, 1 блок, 2 обложка
  postPressBlock: Sequelize.BOOLEAN,
  postPressCover: Sequelize.BOOLEAN,
}, {});

let workPrice = sequelize.define('workPrice', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    //allowNull: false,
  },
  workId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  // startDate: Sequelize.DATE,
  // endDate: Sequelize.DATE,
  color1: Sequelize.INTEGER,
  color2: Sequelize.INTEGER,
  countFrom: Sequelize.INTEGER,
  price: Sequelize.DECIMAL(10, 2),
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

paper.belongsTo(material, {foreignKey: 'materialId', sourceKey: 'id'});
paper.belongsTo(format, {foreignKey: 'formatId', sourceKey: 'id'});

paper.hasMany(paperPrice);
paperPrice.belongsTo(paper);

work.hasMany(workPrice);
workPrice.belongsTo(work);
workPrice.belongsTo(format, {foreignKey: 'formatId', sourceKey: 'id'});

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

  let materialOfs = await sequelize.models.material.create({name: 'Офсет'});
  let materialVHI = await sequelize.models.material.create({name: 'ВХИ'});
  let materialSne = await sequelize.models.material.create({name: 'Снегурочка'});
  let materialSam = await sequelize.models.material.create({name: 'Самоклеющиеся бумага'});
  let materialDis = await sequelize.models.material.create({name: 'Дизайнерская бумага'});
  let materialMel = await sequelize.models.material.create({name: 'Мелованная бумага'});
  let materialKar = await sequelize.models.material.create({name: 'Картон'});
  let materialBan = await sequelize.models.material.create({name: 'Банер'});
  let materialFot = await sequelize.models.material.create({name: 'Фото бумага'});
  let materialPle = await sequelize.models.material.create({name: 'Плёнка'});

  await paper.create({materialId: materialOfs.id, formatId: formatA3.id, density: 70})
  .then(p => {
    paperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 0.57})
    paperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2018, 0, 1)), endDate: new Date(Date.UTC(2019, 0, 1)), price: 0.33})
  });
  await paper.create({materialId: materialOfs.id, formatId: formatA2.id, density: 70}).then(p => paperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 1.14}));
  await paper.create({materialId: materialVHI.id, formatId: formatA3.id, density: 180}).then(p => paperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 1.63}));
  await paper.create({materialId: materialVHI.id, formatId: formatA2.id, density: 180}).then(p => paperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 3.26}));
  await paper.create({materialId: materialSne.id, formatId: formatA3.id, density: 80}).then(p => paperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 0.93}));
  await paper.create({materialId: materialSam.id, formatId: formatA3.id, density: 70}).then(p => paperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 15.73}));
  await paper.create({materialId: materialDis.id, formatId: formatA3.id, density: 120}).then(p => paperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 38.78}));
  await paper.create({materialId: materialDis.id, formatId: formatA3.id, density: 250}).then(p => paperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 75.75}));
  await paper.create({materialId: materialMel.id, formatId: formatA3.id, density: 115}).then(p => paperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 2.47}));
  await paper.create({materialId: materialMel.id, formatId: formatA3.id, density: 150}).then(p => paperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 2.67}));
  await paper.create({materialId: materialMel.id, formatId: formatA3.id, density: 170}).then(p => paperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 3.09}));
  await paper.create({materialId: materialMel.id, formatId: formatA3.id, density: 200}).then(p => paperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 4.14}));
  await paper.create({materialId: materialMel.id, formatId: formatA3.id, density: 300}).then(p => paperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 5.19}));
  await paper.create({materialId: materialKar.id, formatId: formatA3.id, density: 300}).then(p => paperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 7.06}));

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