const fs = require('fs');
const Sequelize = require('sequelize');
const sequelize = require('./db.service');
const division = require('./division.service');
const contact = require('./contact.service');

// Создаём описание таблички
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

order.sync({ force: true }).then(result=>{
  console.log(result);  

  let newOrder = {
    regDate: Date.now(),
    name: 'Тест order',
    number: '123'
  }
  let newDBRecord = sequelize.models.order.create(newOrder);
  })
.catch(err=> console.log(err));  

class OrderService{
 getOrder(){
   return new Promise((res, rej) => {
     fs.readFile('data.json', (err, data) => {
       if(err) {
         return res(false);
       }
       return res(JSON.parse(data));
     });
   });
 }

 createOrder(data){
   return new Promise((res, rej) => {
     fs.writeFile('data.json', JSON.stringify(data), (err, response) => {
       if(err)
         return res(false);

       return res({message: 'Order created.'});
     });
   });
 }

 updateOrder(data){
   return new Promise((res, rej) => {
     fs.writeFile('data.json', JSON.stringify(data), (err, response) => {
       if(err)
         return res(false);

       return res({message: 'Order updated.'});
     });
   });
 }

 deleteOrder(data){
   return new Promise((res, rej) => {
     fs.writeFile('data.json', JSON.stringify(data), (err, response) => {
       if(err)
         return res(false);

       return res({message: 'Order deleted.'});
     });
   });
 }
}

module.exports = new OrderService();
