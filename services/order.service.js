const fs = require('fs');
const Sequelize = require('sequelize');
const sequelize = require('./db.service');

// Создаём описание таблички
let order = sequelize.define('order', {
    id: {
      allowNull: false,
      type: Sequelize.DataTypes.UUID,
      defadefaultValue: Sequelize.UUIDV1
    },
    title: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: Sequelize.DataTypes.STRING
    }
  }, {
    timestamps: true // Колонки createdAt и updatedAt будут созданы автоматически
  });

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
