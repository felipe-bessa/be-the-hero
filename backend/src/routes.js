const express = require('express');

const OngCtrl = require('./controllers/OngCtrl');
const IncidentCtrl = require('./controllers/IncidentCtrl');
const ProfileCtrl = require('./controllers/ProfileCtrl');

const routes = express.Router();

routes.post('/ongs', OngCtrl.create);
routes.get('/ongs', OngCtrl.read);

routes.post('/incidents', IncidentCtrl.create);
routes.get('/incidents', IncidentCtrl.read);
routes.delete('/incidents/:id', IncidentCtrl.delete);

routes.get('/profile', ProfileCtrl.read);

module.exports = routes;