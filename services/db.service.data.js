//const Sequelize = require('sequelize');
const sequelize = require('./db.service');
const Order = sequelize.models.order
const OrderPress = sequelize.models.orderPress
const Contact = sequelize.models.contact
const Paper = sequelize.models.paper
//const PaperPrice = sequelize.models.paperPrice
const Work = sequelize.models.work
const WorkPrice = sequelize.models.workPrice
const PostPressType = sequelize.models.postPressType
const Format = sequelize.models.format

console.log('db.service.data')
console.log('RECREATE_DB=' + process.env['RECREATE_DB']);
if (process.env['RECREATE_DB'] === '1') {
  console.log('db.service.data RECREATEING DATA')
  sequelize.sync({ force: true, logging: console.log })
  .then(async result => {
    //console.log(result);  
    await createTestData();
    console.log('RECREATED DB');
    })
  .catch(err => console.log(err));  
}


async function createTestData() {
  console.log('db.service.data createTestData()')

  const contactIva = await Contact.create({name: 'Иванова Е.В.'});
  const contactBol = await Contact.create({name: 'Болотина А.Н.'});
  const contactMon = await Contact.create({name: 'Моносян З.Г.'});


  let formatA0 = await Format.create({name: 'А0', width: 1189, height: 841});
  let formatA1 = await Format.create({name: 'А1', width: 841, height: 594});
  let formatA2 = await Format.create({name: 'А2', width: 594, height: 420});
  let formatA3 = await Format.create({name: 'А3', width: 420, height: 297});
  let formatA4 = await Format.create({name: 'А4', width: 297, height: 210});
  let formatA5 = await Format.create({name: 'А5', width: 210, height: 148});
  let formatA6 = await Format.create({name: 'А6', width: 148, height: 105});
  let formatA7 = await Format.create({name: 'А7', width: 105, height: 74});
  let format300 = await Format.create({name: 'Рулон 300 мм', width: 300});
  let format420 = await Format.create({name: 'Рулон 420 мм', width: 420});
  let format841 = await Format.create({name: 'Рулон 841 мм', width: 841});
  let format1000 = await Format.create({name: 'Рулон 1000 мм', width: 1000});
  let format1250 = await Format.create({name: 'Рулон 1250 мм', width: 1250});
  let format1360 = await Format.create({name: 'Рулон 1360 мм', width: 1360});
  let format1500 = await Format.create({name: 'Рулон 1500 мм', width: 1500});
  let format1600 = await Format.create({name: 'Рулон 1600 мм', width: 1600});

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

  await Paper.create({materialId: materialOfs.id, formatId: formatA3.id, density: 70, price: 0.57})
  // .then(p => {
  //   PaperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 0.57})
  //   PaperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2018, 0, 1)), endDate: new Date(Date.UTC(2019, 0, 1)), price: 0.33})
  // });
  let paperOfsA270 = await Paper.create({materialId: materialOfs.id, formatId: formatA2.id, density: 70, price: 1.14})
  //.then(p => PaperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 1.14}));
  //PaperPrice.create({paperId: paperOfsA270.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 1.14})
  await Paper.create({materialId: materialVHI.id, formatId: formatA3.id, density: 180, price: 1.63})
  //.then(p => PaperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 1.63}));
  let paperVHIA2180 = await Paper.create({materialId: materialVHI.id, formatId: formatA2.id, density: 180})//.then(p => PaperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 3.26}));
  //PaperPrice.create({paperId: paperVHIA2180.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 3.26})
  await Paper.create({materialId: materialSne.id, formatId: formatA3.id, density: 80, price: 0.93})
  //.then(p => PaperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 0.93}));
  await Paper.create({materialId: materialSam.id, formatId: formatA3.id, density: 70, price: 15.73})
  //.then(p => PaperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 15.73}));
  await Paper.create({materialId: materialDis.id, formatId: formatA3.id, density: 120, price: 38.78})
  //.then(p => PaperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 38.78}));
  await Paper.create({materialId: materialDis.id, formatId: formatA3.id, density: 250, price: 75.75})
  //.then(p => PaperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 75.75}));
  await Paper.create({materialId: materialMel.id, formatId: formatA3.id, density: 115, price: 2.47})
  //.then(p => PaperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 2.47}));
  await Paper.create({materialId: materialMel.id, formatId: formatA3.id, density: 150, price: 2.67})
  //.then(p => PaperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 2.67}));
  await Paper.create({materialId: materialMel.id, formatId: formatA3.id, density: 170, price: 3.09})
  //.then(p => PaperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 3.09}));
  await Paper.create({materialId: materialMel.id, formatId: formatA3.id, density: 200, price: 4.14})
  //.then(p => PaperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 4.14}));
  await Paper.create({materialId: materialMel.id, formatId: formatA3.id, density: 300, price: 5.19})
  //.then(p => PaperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 5.19}));
  await Paper.create({materialId: materialKar.id, formatId: formatA3.id, density: 300, price: 7.06})
  //.then(p => PaperPrice.create({paperId: p.id, startDate: new Date(Date.UTC(2019, 0, 1)), price: 7.06}));

  await PostPressType.create({id: 0, name: 'Нет'});
  await PostPressType.create({id: 1, name: 'Только обложка'});
  await PostPressType.create({id: 2, name: 'Только блок'});
  await PostPressType.create({id: 3, name: 'Да'});

  let workOfs = await Work.create({name: 'Офсетная печать', postPressTypeId: 0})//.then(w => {
    WorkPrice.create({workId: workOfs.id, formatId: formatA2.id, color1: 1, color2: 0, countFrom: 1, price: 4.23})
    WorkPrice.create({workId: workOfs.id, formatId: formatA2.id, color1: 1, color2: 0, countFrom: 1000, price: 2.75})
    WorkPrice.create({workId: workOfs.id, formatId: formatA2.id, color1: 1, color2: 0, countFrom: 2000, price: 1.85})

    WorkPrice.create({workId: workOfs.id, formatId: formatA2.id, color1: 1, color2: 1, countFrom: 1, price: 5.09})
    WorkPrice.create({workId: workOfs.id, formatId: formatA2.id, color1: 1, color2: 1, countFrom: 1000, price: 3.30})
    WorkPrice.create({workId: workOfs.id, formatId: formatA2.id, color1: 1, color2: 1, countFrom: 2000, price: 2.21})
  //});
  const workZif = await Work.create({name: 'Цифровая печать', postPressTypeId: 0});
  const workShF = await Work.create({name: 'Широкоформатная печать', postPressTypeId: 0});
  const workShg = await Work.create({name: 'Шелкография', postPressTypeId: 3});
    WorkPrice.create({workId: workShg.id, color1: 1, color2: 0, countFrom: null, price: 350})
    WorkPrice.create({workId: workShg.id, color1: 1, color2: 0, countFrom: 1, price: 12.44})
    WorkPrice.create({workId: workShg.id, color1: 1, color2: 0, countFrom: 50, price: 10.71})
    WorkPrice.create({workId: workShg.id, color1: 1, color2: 0, countFrom: 100, price: 8.24})
    WorkPrice.create({workId: workShg.id, color1: 1, color2: 0, countFrom: 200, price: 7.06})
    WorkPrice.create({workId: workShg.id, color1: 1, color2: 0, countFrom: 300, price: 6.12})
    WorkPrice.create({workId: workShg.id, color1: 1, color2: 0, countFrom: 500, price: 5.61})

    WorkPrice.create({workId: workShg.id, color1: 2, color2: 0, countFrom: null, price: 350 + 350})
    WorkPrice.create({workId: workShg.id, color1: 2, color2: 0, countFrom: 1, price: 12.44 + 8.72})
    WorkPrice.create({workId: workShg.id, color1: 2, color2: 0, countFrom: 50, price: 10.71 + 7.49})
    WorkPrice.create({workId: workShg.id, color1: 2, color2: 0, countFrom: 100, price: 8.24 + 5.76})
    WorkPrice.create({workId: workShg.id, color1: 2, color2: 0, countFrom: 200, price: 7.06 + 4.94})
    WorkPrice.create({workId: workShg.id, color1: 2, color2: 0, countFrom: 300, price: 6.12 + 4.28})
    WorkPrice.create({workId: workShg.id, color1: 2, color2: 0, countFrom: 500, price: 5.61 + 3.92})

  let workLaP = await Work.create({name: 'Ламинация пакетная', postPressTypeId: 3});
  let workLaR = await Work.create({name: 'Ламинация рулонная', postPressTypeId: 3});
  let workVyr = await Work.create({name: 'Вырубка', postPressTypeId: 1});
  let workSLi = await Work.create({name: 'Счёт листов', postPressTypeId: 2});
    WorkPrice.create({workId: workSLi.id, countFrom: 1, price: 0.22})
    WorkPrice.create({workId: workSLi.id, countFrom: 1000, price: 0.17})
    WorkPrice.create({workId: workSLi.id, countFrom: 5000, price: 0.13})
    WorkPrice.create({workId: workSLi.id, countFrom: 10000, price: 0.10})
    WorkPrice.create({workId: workSLi.id, countFrom: 30000, price: 0.09})
    WorkPrice.create({workId: workSLi.id, countFrom: 50000, price: 0.06})

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
  // await Format.bulkCreate(newFormats);

  let equipmentRol = await sequelize.models.equipment.create({name: 'Роланд', workId: workOfs.id});
  let equipmentHam = await sequelize.models.equipment.create({name: 'Хамада', workId: workOfs.id});
  let equipmentX75 = await sequelize.models.equipment.create({name: 'Xerox 75', workId: workZif.id});
  let equipmentX700 = await sequelize.models.equipment.create({name: 'Xerox 700', workId: workZif.id});
  let equipmentX7535 = await sequelize.models.equipment.create({name: 'Xerox 7535', workId: workZif.id});
  let equipmentX95 = await sequelize.models.equipment.create({name: 'Xerox 95', workId: workZif.id});
  let equipmentD550 = await sequelize.models.equipment.create({name: 'Duplo 550', workId: workZif.id});
  let equipmentMim = await sequelize.models.equipment.create({name: 'Mimaki', workId: workShF.id});
  let equipmentX6200 = await sequelize.models.equipment.create({name: 'Xerox 6200', workId: workShF.id});
  let equipmentSh = await sequelize.models.equipment.create({name: 'Шелкография', workId: workShg.id});

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

  await sequelize.models.equipmentFormat.create({equipmentId: equipmentSh.id, formatId: formatA0.id});
  await sequelize.models.equipmentFormat.create({equipmentId: equipmentSh.id, formatId: formatA1.id});
  await sequelize.models.equipmentFormat.create({equipmentId: equipmentSh.id, formatId: formatA2.id});
  await sequelize.models.equipmentFormat.create({equipmentId: equipmentSh.id, formatId: formatA3.id});
  await sequelize.models.equipmentFormat.create({equipmentId: equipmentSh.id, formatId: formatA4.id});
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

  let divisionTest = await sequelize.models.division.create({name: 'Тест division'});
  const contactTest = await Contact.create({name: 'contactTest', divisionId: divisionTest.id});

  let orderTest = await Order.create({
      regDate: Date.now(),
      name: 'Тест order',
      number: '123',
      divisionId: divisionTest.id,
      contactId: contactTest.id,
      countOfItem: 10,
      sheetsInItem: 6,
      formatId: formatA5.id, width: 210, height: 148,
      cover: {equipmentId: equipmentRol.id, formatId: formatA2.id, materialId: materialVHI.id, paperId: paperVHIA2180.id, color1: 1, color2: 0, count: 12, contactId: contactIva.id,
        postPress: [
          {contactId: contactBol.id, workId: workLaP.id},
          {contactId: contactIva.id, workId: workShg.id, color1: 1, color2: 0}]},
      block: {equipmentId: equipmentRol.id, formatId: formatA2.id, materialId: materialOfs.id, paperId: paperOfsA270.id, color1: 1, color2: 1, count: 22,
        postPress: [
          {contactId: contactBol.id, workId: workSLi.id}]},
      // postPress: [
      //   {workType: 'cover', contactId: contactBol.id, workId: workLam.id},
      //   {workType: 'cover', contactId: contactIva.id, workId: workVyr.id},
      //   {workType: 'block', contactId: contactIva.id, workId: workSch.id}]
    },{ include: [
      { association: Order.Cover, include: [{ association: OrderPress.PostPress }] }, 
      { association: Order.Block, include: [{ association: OrderPress.PostPress }] }]
      //{ association: Order.PostPress }] 
    }
  );

}