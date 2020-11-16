//import * as argon2 from 'argon2';
const argon2 = require('argon2');
//import { randomBytes } from 'crypto';
const crypto = require('crypto');

//import UserModel from '../models/user';
const sequelize = require('../services/db.service');
const UserModel = sequelize.models.user;

//import * as jwt from 'jsonwebtoken'
var jwt = require('jsonwebtoken');

//export default 
class AuthService {
  constructor(){}

  async Login(name, password) {
    const userRecord = await UserModel.findOne({where: { 'name': name}});
    if (!userRecord) {
      throw new Error('User not found')
    } else {
      const correctPassword = await argon2.verify(userRecord.password, password);
      if (!correctPassword) {
        throw new Error('Incorrect password')
      }
    }

    return {
      user: {
        email: userRecord.email,
        name: userRecord.name,
      },
      token: this.generateJWT(userRecord),
    }
  }

  // public async LoginAs(email): Promise<any> {
  //   const userRecord = await UserModel.findOne({ email });
  //   console.log('Finding user record...');
  //   if (!userRecord) {
  //     throw new Error('User not found');
  //   }
  //   return {
  //     user: {
  //       email: userRecord.email,
  //       name: userRecord.name,
  //     },
  //     token: this.generateJWT(userRecord),
  //   }
  // }

  async SignUp(name, password, email) {

    throw new Error('SignUp disabled!')

    const salt = crypto.randomBytes(32);
    //const passwordHashed = await argon2.hash(password, { salt });
    const passwordHashed = await argon2.hash(password);

    const userRecord = await UserModel.create({
      password: passwordHashed,
      email,
      salt: salt.toString('hex'),
      name,
    });
    const token = this.generateJWT(userRecord);
    return {
      user: {
        email: userRecord.email,
        name: userRecord.name,
      },
      token,
    }
  }

  generateJWT(user) {
    return jwt.sign({
      data: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }, 'klsdkrfHVD62*^hcsh%!!gwOmaqPA', { expiresIn: '6h' }); // @TODO move this to an env var
  }

}

module.exports = new AuthService();