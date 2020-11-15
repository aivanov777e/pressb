const jwt = require('express-jwt');

const getTokenFromHeader = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
}

//export default 
module.exports = jwt({
  secret: 'klsdkrfHVD62*^hcsh%!!gwOmaqPA',
  algorithms: ['HS256'],
  //userProperty: 'token', // this is where the next middleware can find the encoded data generated in services/auth:generateToken
  //getToken: getTokenFromHeader
})
