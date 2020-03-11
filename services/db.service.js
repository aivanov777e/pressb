const Sequelize = require('sequelize');

console.log('db.service')

// const sequelize = new Sequelize('press', 'postgres', ',bkfqy1', {
const config =  {
    // username: 'press_pg',
    // password: ',bkfqy1', // Для sqlite пароль не обязателен
    // database: 'press_pg', // Имя базы данных
    // host: '127.0.0.1', // Адрес субд, для sqlite всегда локалхост
      
    dialect: 'postgres',
    pool: {
      max: 10, //максимальное кол-во соединений в пуле (Default: 5)
      min: 0, //минимальное кол-во соединений в пуле (Default: 0)
      acquire: 30000, //время в миллисекундах, в течение которого будет осуществляться попытка установить соединение, прежде чем будет сгенерировано исключение (Default: 60000)
      idle: 10000 //время простоя в миллисекундах, по истечении которого соединение покинет пул (Default: 1000)
    },
    define: {
        // The `timestamps` field specify whether or not the `createdAt` and `updatedAt` fields will be created.
        // This was true by default, but now is false by default
        timestamps: false,
    },
    // logging: console.log, // Включаем логи запросов, нужно передать именно функцию, либо false
    // storage: './test_db.db', // Путь к файлу БД
    //operatorsAliases: Sequelize.Op // Передаём алиасы параметров (дальше покажу нафига)  
    //operatorsAliases: false
};
//const sequelize = new Sequelize(config);
console.log(process.env.DATABASE_URL)
const sequelize = new Sequelize(process.env.DATABASE_URL, config);

sequelize.authenticate()
    .then(() => console.log('Connected postgres.'))
    .catch(err => console.error('Connection postgres error: ', err));
    
module.exports = sequelize;

require('../services/db.service.models');