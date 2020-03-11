const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('./db.service');

let Contact = sequelize.define('contact', {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
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
  },
  density: Sequelize.INTEGER,
  price: Sequelize.DECIMAL(10, 2),
}, {});

// let PaperPrice = sequelize.define('paperPrice', {
//   id: {
//     type: Sequelize.UUID,
//     defaultValue: Sequelize.UUIDV1,
//     primaryKey: true,
//     //allowNull: false,
//   },
//   paperId: {
//     type: Sequelize.UUID,
//     allowNull: false,
//   },
//   startDate: Sequelize.DATE,
//   endDate: Sequelize.DATE,
//   price: Sequelize.DECIMAL(10, 2),
// }, {});

let PostPressType = sequelize.define('postPressType', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    //allowNull: false,
  },
  name: Sequelize.STRING,
}, {});

let Work = sequelize.define('work', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    //allowNull: false,
  },
  name: Sequelize.STRING,
  // postPress: {
  //   type: Sequelize.INTEGER, // -1 нет, 0 да, 1 только блок, 2 только обложка
  //   defaultValue: -1
  // }
  // postPressCover: Sequelize.BOOLEAN,
  // postPressBlock: Sequelize.BOOLEAN,
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

  countOfItem: Sequelize.INTEGER,
  sheetsInItem : Sequelize.INTEGER,
  width: Sequelize.INTEGER,
  height: Sequelize.INTEGER,
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
  //workType: Sequelize.ENUM('cover', 'block'),
  // count: Sequelize.INTEGER,
  // countAdj: Sequelize.INTEGER,
  color1: Sequelize.INTEGER,
  color2: Sequelize.INTEGER,
  option: Sequelize.STRING,
  price: Sequelize.DECIMAL(10, 2),
});

let EquipmentFormat = sequelize.define('equipmentFormat');

Equipment.Work = Equipment.belongsTo(Work);
Work.Equipment = Work.hasMany(Equipment);

Equipment.belongsToMany(Format, {through: 'equipmentFormat'});//, foreignKey: 'equipmentId'
Format.belongsToMany(Equipment, {through: 'equipmentFormat'});//, foreignKey: 'formatId'
Equipment.hasMany(EquipmentFormat);

Paper.belongsTo(Material, {foreignKey: 'materialId', sourceKey: 'id'});
Material.hasMany(Paper);
Paper.belongsTo(Format, {foreignKey: 'formatId', sourceKey: 'id'});

//Paper.hasMany(PaperPrice);
//PaperPrice.belongsTo(Paper);

Work.WorkPrice = Work.hasMany(WorkPrice);
WorkPrice.Work = WorkPrice.belongsTo(Work);

WorkPrice.Format = WorkPrice.belongsTo(Format, {foreignKey: 'formatId', sourceKey: 'id'});

Work.PostPressType = Work.belongsTo(PostPressType);

Division.hasMany(Subdivision);

//sequelize.models.division.hasMany(order);
Order.Division = Order.belongsTo(Division, {foreignKey: 'divisionId', sourceKey: 'id'});
//sequelize.models.division.hasMany(order, {foreignKey: 'subdivisionId', sourceKey: 'id'});
Order.Subdivision = Order.belongsTo(Subdivision, {foreignKey: 'subdivisionId', sourceKey: 'id'});
//sequelize.models.contact.hasMany(order);
Order.Contact = Order.belongsTo(Contact, {foreignKey: 'contactId', sourceKey: 'id'});
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

//Order.PostPress = Order.hasMany(OrderPostPress, {as: 'postPress'});
OrderPress.PostPress = OrderPress.hasMany(OrderPostPress, {as: 'postPress'});

OrderPress.belongsTo(Contact, {foreignKey: 'contactId', sourceKey: 'id'});
OrderPress.belongsTo(Equipment, {foreignKey: 'equipmentId', sourceKey: 'id'});
OrderPress.belongsTo(Format, {foreignKey: 'formatId', sourceKey: 'id'});
OrderPress.belongsTo(Material);
OrderPress.belongsTo(Paper, {foreignKey: 'paperId', sourceKey: 'id'});

OrderPostPress.belongsTo(Contact, {foreignKey: 'contactId', sourceKey: 'id'});
OrderPostPress.belongsTo(Work, {foreignKey: 'workId', sourceKey: 'id'});

