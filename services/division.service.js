const Sequelize = require('sequelize');
const sequelize = require('./db.service');
//const contact = require('./contact.service');
//const order = require('./order.service');

// Создаём описание таблички
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

division.hasMany(division);

// division.sync({ force: true }).then(() => {
//     // Now the `users` table in the database corresponds to the model definition
//     // return User.create({
//     //   firstName: 'John',
//     //   lastName: 'Hancock'
//     // });
// });

division.sync({ force: true }).then(result=>{
  console.log(result);

  let newI = {
    name: 'Тест division',
  }
  let newDBRecord = sequelize.models.division.create(newI);
  })
  .catch(err=> console.log(err));  

class DivisionService{
    async getDivision(query){
      return await sequelize.models.division.findAll();
    }
   
    createDivision(data){
      return new Promise((res, rej) => {
        fs.writeFile('data.json', JSON.stringify(data), (err, response) => {
          if(err)
            return res(false);
   
          return res({message: 'Division created.'});
        });
      });
    }
}

module.exports = new DivisionService();
   