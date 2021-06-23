const express = require("express");
const app = express();
const config = require('./config/config');
const dbConn = require('./config/dbConnection');
const routes = require('./server/index.route');

const bodyParser = require('body-parser');

//take json input
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
app.use(routes);

//db connections
let db = {};
db.postgres = new dbConn(config.postgres);
app.set('db', db);



app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

module.exports = app;