const express = require('express');

const OngCtrl = require('./controllers/OngCtrl');
const IncidentCtrl = require('./controllers/IncidentCtrl');

const routes = express.Router();

routes.post('/ongs', OngCtrl.create);
routes.get('/ongs', OngCtrl.read);

routes.post('/incidents', IncidentCtrl.create);
routes.get('/incidents', IncidentCtrl.read);
routes.delete('/incidents/:id', IncidentCtrl.delete);

module.exports = routes;