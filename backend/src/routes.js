const express = require('express');

const OngCtrl = require('./controllers/OngCtrl');

const routes = express.Router();

routes.post('/ongs', OngCtrl.create);
routes.get('/ongs', OngCtrl.read);

module.exports = routes;