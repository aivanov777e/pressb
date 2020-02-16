const Sequelize = require('sequelize');
const sequelize = require('./db.service');

let Contact = sequelize.define('contact', {
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
    //allowNull: false,
    type: Sequelize.UUID,
  },
},{});

let Division = sequelize.define('division', {
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

let Subdivision = sequelize.define('subdivision', {
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

let Format = sequelize.define('format', {
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

// let color = sequelize.define('color', {
//   id: {
//     type: Sequelize.UUID,
//     defaultValue: Sequelize.UUIDV1,
//     primaryKey: true,
//     //allowNull: false,
//   },
//   name: Sequelize.STRING,
// }, {});

let Material = sequelize.define('material', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    //allowNull: false,
  },
  name: Sequelize.STRING,
}, {});

let Paper = sequelize.define('paper', {
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

let PaperPrice = sequelize.define('paperPrice', {
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

let Work = sequelize.define('work', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    //allowNull: false,
  },
  name: Sequelize.STRING,
  //postPress: Sequelize.INTEGER, // 0 нет, 1 блок, 2 обложка
  postPressCover: Sequelize.BOOLEAN,
  postPressBlock: Sequelize.BOOLEAN,
}, {});

let WorkPrice = sequelize.define('workPrice', {
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
  option: Sequelize.STRING,
  price: Sequelize.DECIMAL(10, 2),
}, {});

let Equipment = sequelize.define('equipment', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    //allowNull: false,
  },
  name: Sequelize.STRING,
});

let Order = sequelize.define('order', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    //allowNull: false,
  },
  regDate: Sequelize.DATE,
  name: Sequelize.STRING,
  number: Sequelize.STRING,
  count: Sequelize.INTEGER,
  width: Sequelize.INTEGER,
  heigth: Sequelize.INTEGER,
  // coverCount: Sequelize.INTEGER,
  // blockCount: Sequelize.INTEGER,
  // coverCountAdj: Sequelize.INTEGER,
  // blockCountAdj: Sequelize.INTEGER,
  // coverColor1: Sequelize.INTEGER,
  // coverColor2: Sequelize.INTEGER,
  // blockColor1: Sequelize.INTEGER,
  // blockColor2: Sequelize.INTEGER,
  price: Sequelize.DECIMAL(10, 2),
}, {});

let OrderPress = sequelize.define('orderPress', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    //allowNull: false,
  },
  count: Sequelize.INTEGER,
  countAdj: Sequelize.INTEGER,
  color1: Sequelize.INTEGER,
  color2: Sequelize.INTEGER,
  pricePaper: Sequelize.DECIMAL(10, 2),
  pricePress: Sequelize.DECIMAL(10, 2),
});

let OrderPostPress = sequelize.define('orderPostPress', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    //allowNull: false,
  },
  workType: Sequelize.ENUM('cover', 'block'),
  // count: Sequelize.INTEGER,
  // countAdj: Sequelize.INTEGER,
  // color1: Sequelize.INTEGER,
  // color2: Sequelize.INTEGER,
  option: Sequelize.STRING,
  price: Sequelize.DECIMAL(10, 2),
});

let EquipmentFormat = sequelize.define('equipmentFormat');

Equipment.belongsTo(Work);
Equipment.belongsToMany(Format, {through: 'equipmentFormat'});//, foreignKey: 'equipmentId'
Format.belongsToMany(Equipment, {through: 'equipmentFormat'});//, foreignKey: 'formatId'
Equipment.hasMany(EquipmentFormat);

Paper.belongsTo(Material, {foreignKey: 'materialId', sourceKey: 'id'});
Material.hasMany(Paper);
Paper.belongsTo(Format, {foreignKey: 'formatId', sourceKey: 'id'});

Paper.hasMany(PaperPrice);
PaperPrice.belongsTo(Paper);

Work.hasMany(WorkPrice);
WorkPrice.belongsTo(Work);
WorkPrice.belongsTo(Format, {foreignKey: 'formatId', sourceKey: 'id'});


Division.hasMany(Subdivision);

//sequelize.models.division.hasMany(order);
Order.belongsTo(Division, {foreignKey: 'divisionId', sourceKey: 'id'});
//sequelize.models.division.hasMany(order, {foreignKey: 'subdivisionId', sourceKey: 'id'});
Order.belongsTo(Subdivision, {foreignKey: 'subdivisionId', sourceKey: 'id'});
//sequelize.models.contact.hasMany(order);
Order.belongsTo(Contact, {foreignKey: 'contactId', sourceKey: 'id'});
Order.belongsTo(Format, {foreignKey: 'formatId', sourceKey: 'id'});

// order.belongsTo(contact, {foreignKey: 'coverPerformerId', sourceKey: 'id'});
// order.belongsTo(contact, {foreignKey: 'blockPerformerId', sourceKey: 'id'});

// order.belongsTo(equipment, {foreignKey: 'coverEquipmentId', sourceKey: 'id'});
// order.belongsTo(equipment, {foreignKey: 'blockEquipmentId', sourceKey: 'id'});

// order.belongsTo(format, {foreignKey: 'coverFormatId', sourceKey: 'id'});
// order.belongsTo(format, {foreignKey: 'blockFormatId', sourceKey: 'id'});

// order.belongsTo(paper, {foreignKey: 'coverPaperId', sourceKey: 'id'});
// order.belongsTo(paper, {foreignKey: 'blockPaperId', sourceKey: 'id'});
// order.belongsTo(material, {foreignKey: 'coverMaterialId', sourceKey: 'id'});
// order.belongsTo(material, {foreignKey: 'blockMaterialId', sourceKey: 'id'});

// order.belongsTo(color, {foreignKey: 'coverColor1Id', sourceKey: 'id'});
// order.belongsTo(color, {foreignKey: 'coverColor2Id', sourceKey: 'id'});
// order.belongsTo(color, {foreignKey: 'blockColor1Id', sourceKey: 'id'});
// order.belongsTo(color, {foreignKey: 'blockColor2Id', sourceKey: 'id'});

Order.Cover = Order.belongsTo(OrderPress, {foreignKey: 'coverId', as: 'cover', sourceKey: 'id'});
Order.Block = Order.belongsTo(OrderPress, {foreignKey: 'blockId', as: 'block', sourceKey: 'id'});

Order.hasMany(OrderPostPress);

OrderPress.belongsTo(Contact, {foreignKey: 'contactId', sourceKey: 'id'});
OrderPress.belongsTo(Equipment, {foreignKey: 'equipmentId', sourceKey: 'id'});
OrderPress.belongsTo(Format, {foreignKey: 'formatId', sourceKey: 'id'});
OrderPress.belongsTo(Material);
OrderPress.belongsTo(Paper, {foreignKey: 'paperId', sourceKey: 'id'});

OrderPostPress.belongsTo(Contact, {foreignKey: 'contactId', sourceKey: 'id'});
OrderPostPress.belongsTo(Work, {foreignKey: 'workId', sourceKey: 'id'});

sequelize.sync({ force: true }).then(result=>{
  console.log(result);  

  createTestData();

  })
.catch(err=> console.log(err));  

async function createTestData() {
  let newDivision = await sequelize.models.division.create({name: 'Тест division'});

  let newOrder = await Order.create({
    regDate: Date.now(),
    name: 'Тест order',
    number: '123',
    divisionId: newDivision.id,
    cover: {},
    block: {}
  }, { include: [{ association: Order.Cover }, { association: Order.Block }] });

  Contact.create({name: 'Иванова Е.В.'});
  Contact.create({name: 'Болотина А.Н.'});
  Contact.create({name: 'Моносян З.Г.'});


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

  await Paper.create({materialId: materialOfs.id, formatId: formatA3.id, density: 70})
  .then(p => {
    PaperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 0.57})
    PaperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2018, 0, 1)), endDate: new Date(Date.UTC(2019, 0, 1)), price: 0.33})
  });
  await Paper.create({materialId: materialOfs.id, formatId: formatA2.id, density: 70}).then(p => PaperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 1.14}));
  await Paper.create({materialId: materialVHI.id, formatId: formatA3.id, density: 180}).then(p => PaperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 1.63}));
  await Paper.create({materialId: materialVHI.id, formatId: formatA2.id, density: 180}).then(p => PaperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 3.26}));
  await Paper.create({materialId: materialSne.id, formatId: formatA3.id, density: 80}).then(p => PaperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 0.93}));
  await Paper.create({materialId: materialSam.id, formatId: formatA3.id, density: 70}).then(p => PaperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 15.73}));
  await Paper.create({materialId: materialDis.id, formatId: formatA3.id, density: 120}).then(p => PaperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 38.78}));
  await Paper.create({materialId: materialDis.id, formatId: formatA3.id, density: 250}).then(p => PaperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 75.75}));
  await Paper.create({materialId: materialMel.id, formatId: formatA3.id, density: 115}).then(p => PaperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 2.47}));
  await Paper.create({materialId: materialMel.id, formatId: formatA3.id, density: 150}).then(p => PaperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 2.67}));
  await Paper.create({materialId: materialMel.id, formatId: formatA3.id, density: 170}).then(p => PaperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 3.09}));
  await Paper.create({materialId: materialMel.id, formatId: formatA3.id, density: 200}).then(p => PaperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 4.14}));
  await Paper.create({materialId: materialMel.id, formatId: formatA3.id, density: 300}).then(p => PaperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 5.19}));
  await Paper.create({materialId: materialKar.id, formatId: formatA3.id, density: 300}).then(p => PaperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 7.06}));

  let workOf = await Work.create({name: 'Офсетная печать'})//.then(w => {
    WorkPrice.create({workId: workOf.id, formatId: formatA2.id, color1: 1, color2: 0, countFrom: 1, price: 4.23})
    WorkPrice.create({workId: workOf.id, formatId: formatA2.id, color1: 1, color2: 0, countFrom: 1001, price: 2.75})
    WorkPrice.create({workId: workOf.id, formatId: formatA2.id, color1: 1, color2: 0, countFrom: 2001, price: 1.85})

    WorkPrice.create({workId: workOf.id, formatId: formatA2.id, color1: 1, color2: 1, countFrom: 1, price: 5.09})
    WorkPrice.create({workId: workOf.id, formatId: formatA2.id, color1: 1, color2: 1, countFrom: 1001, price: 3.30})
    WorkPrice.create({workId: workOf.id, formatId: formatA2.id, color1: 1, color2: 1, countFrom: 2001, price: 2.21})
  //});
  await Work.create({name: 'Цифровая печать'});
  await Work.create({name: 'Широкоформатная печать'});
  await Work.create({name: 'Шелкография'});

  await Work.create({name: 'Ламинация пакетная', postPressBlock: 1, postPressBlock: 1});
  await Work.create({name: 'Ламинация рулонная', postPressBlock: 1, postPressBlock: 1});
  await Work.create({name: 'Вырубка', postPressBlock: 1, postPressBlock: 1});
  await Work.create({name: 'Счёт листов', postPressBlock: 1, postPressBlock: 1});

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

  let equipmentRol = await sequelize.models.equipment.create({name: 'Роланд', workId: workOf.id});
  let equipmentHam = await sequelize.models.equipment.create({name: 'Хамада', workId: workOf.id});
  let equipmentX75 = await sequelize.models.equipment.create({name: 'Xerox 75'});
  let equipmentX700 = await sequelize.models.equipment.create({name: 'Xerox 700'});
  let equipmentX7535 = await sequelize.models.equipment.create({name: 'Xerox 7535'});
  let equipmentX95 = await sequelize.models.equipment.create({name: 'Xerox 95'});
  let equipmentD550 = await sequelize.models.equipment.create({name: 'Duplo 550'});
  let equipmentMim = await sequelize.models.equipment.create({name: 'Mimaki'});
  let equipmentX6200 = await sequelize.models.equipment.create({name: 'Xerox 6200'});
  let equipmentSh = await sequelize.models.equipment.create({name: 'Шелкография'});

  // let color0 = await sequelize.models.color.create({name: '0'});
  // let color1 = await sequelize.models.color.create({name: '1'});
  // let color2 = await sequelize.models.color.create({name: '2'});
  // let color3 = await sequelize.models.color.create({name: '3'});
  // let color4 = await sequelize.models.color.create({name: '4'});

  // console.log(equipmentRol.id);  
  // console.log(formatA2.id);  
  await sequelize.models.equipmentFormat.create({equipmentId: equipmentRol.id, formatId: formatA2.id});
  await sequelize.models.equipmentFormat.create({equipmentId: equipmentHam.id, formatId: formatA3.id});
  await sequelize.models.equipmentFormat.create({equipmentId: equipmentMim.id, formatId: format1000.id});
  await sequelize.models.equipmentFormat.create({equipmentId: equipmentMim.id, formatId: format1250.id});
  await sequelize.models.equipmentFormat.create({equipmentId: equipmentMim.id, formatId: format1360.id});
  await sequelize.models.equipmentFormat.create({equipmentId: equipmentMim.id, formatId: format1500.id});
  await sequelize.models.equipmentFormat.create({equipmentId: equipmentMim.id, formatId: format1600.id});
  await sequelize.models.equipmentFormat.create({equipmentId: equipmentX6200.id, formatId: formatA0.id});
  await sequelize.models.equipmentFormat.create({equipmentId: equipmentX6200.id, formatId: formatA1.id});
  await sequelize.models.equipmentFormat.create({equipmentId: equipmentX6200.id, formatId: formatA2.id});
  await sequelize.models.equipmentFormat.create({equipmentId: equipmentX6200.id, formatId: format300.id});
  await sequelize.models.equipmentFormat.create({equipmentId: equipmentX6200.id, formatId: format420.id});
  await sequelize.models.equipmentFormat.create({equipmentId: equipmentX6200.id, formatId: format841.id});
  await sequelize.models.equipmentFormat.create({equipmentId: equipmentX75.id, formatId: formatA3.id});
  await sequelize.models.equipmentFormat.create({equipmentId: equipmentX700.id, formatId: formatA3.id});
  await sequelize.models.equipmentFormat.create({equipmentId: equipmentX95.id, formatId: formatA3.id});
  await sequelize.models.equipmentFormat.create({equipmentId: equipmentD550.id, formatId: formatA3.id});
  await sequelize.models.equipmentFormat.create({equipmentId: equipmentX7535.id, formatId: formatA3.id});
  // let newEquipments = [
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
  // await sequelize.models.equipment.bulkCreate(newEquipments);
}