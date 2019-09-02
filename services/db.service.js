const Sequelize = require('sequelize');

console.log('db.service')

const sequelize = new Sequelize('press', 'postgres', ',bkfqy1', {
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
        timestamps: false
    }    
});

sequelize.authenticate()
    .then(() => console.log('Connected postgres.'))
    .catch(err => console.error('Connection postgres error: ', err));
    
module.exports = sequelize;

require('../services/db.service.models');