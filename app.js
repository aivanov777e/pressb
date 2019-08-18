const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    routes = require('./routes/index');

const host = '127.0.0.1';
const port = 7000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', routes);

app.listen(port, host, () => console.log(`Server listens http://${host}:${port}`));
