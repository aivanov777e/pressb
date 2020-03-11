const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  routes = require('./routes/index');

const Sentry = require('@sentry/node');

Sentry.init({ dsn: 'https://f667d93437df4e2188019a8bb2a702b7@sentry.io/2968077' });

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler({
  transaction: 'handler'
}));

const HOST = '127.0.0.1';
const PORT = 7000;
Error.stackTraceLimit = 30; 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/pressb/api', routes);

app.get('/debug-sentry', function mainHandler(req, res) {
  throw new Error('My first Sentry error!');
});
app.get('/test', function mainHandler(req, res) {
  return res.status(200).send('test ok');
});

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());
// app.use(Sentry.Handlers.errorHandler({
//     shouldHandleError(error) {
//       // Capture all 404 and 500 errors
//       if (error.status === 404 || error.status === 500) {
//         return true
//       }
//       return false
//     }
//   }));

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  //res.statusCode = 500;
  //res.end(res.sentry + "\n");
  res.status(500).send({message: `${err.message}`});
});  

// Initialize the app.
//app.listen(port, host, () => console.log(`Server listens http://${host}:${port}`));
var server = app.listen(process.env.PORT || PORT, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

