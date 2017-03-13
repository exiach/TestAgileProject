var express = require('express'),
    cors = require('cors'),
    app = express(),
    bodyParser = require('body-parser'),
    database = require('./database'),
    port = process.env.PORT || 3000,
    token = require('./utils/middlewares.js');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));
app.use(require('./routes'));

database.init().then(function () {
    app.listen(port);
    console.log('Server is running on port: ' + port);
}).catch(function (err) {
    console.log(err);
});
