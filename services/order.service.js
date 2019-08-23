const fs = require('fs');
const Sequelize = require('sequelize');
const sequelize = require('./db.service');
const division = require('./division.service');
const contact = require('./contact.service');

// Создаём описание таблички
let order = sequelize.define('order', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: Sequelize.DataTypes.UUID,
      defadefaultValue: Sequelize.UUIDV1
    },
    reg_date: Sequelize.DATE,
    name: Sequelize.STRING,
    number: Sequelize.STRING,
}, {});

sequelize.models.division.hasMany(order);
sequelize.models.division.hasMany(order, {foreignKey: 'subdivisionId', sourceKey: 'id'});
sequelize.models.contact.hasMany(order);

order.sync({ force: true }).then(result=>{
  console.log(result);  
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
