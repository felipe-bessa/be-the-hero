const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const SessionCtrl = require('./controllers/SessionCtrl');
const OngCtrl = require('./controllers/OngCtrl');
const IncidentCtrl = require('./controllers/IncidentCtrl');
const ProfileCtrl = require('./controllers/ProfileCtrl');

const routes = express.Router();

routes.post('/sessions', celebrate({
  [Segments.BODY]: Joi.object().keys({
    //ID da ONG obrigatório para o login
    id: Joi.string().required()
  })
}), SessionCtrl.create);

routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    //nome é obrigatório
    name: Joi.string().required(),

    //email é obrigatório
    //email tem de ser válido
    email: Joi.string().required().email(),

    //whatsapp é obrigatório
    //e é composto por 10 ou 11 digitos, incluindo DDD
    whatsapp: Joi.string().required().min(10).max(11),

    //cidade é obrigatório
    city: Joi.string().required(),

    //Unidade Federativa é obrigatório
    //e deve ser representada por 2 caracteres
    uf: Joi.string().length(2)
  })
}), OngCtrl.create);
routes.get('/ongs', OngCtrl.read);

routes.post('/incidents', celebrate({
  [Segments.BODY]: Joi.object().keys({
    //O título do caso é obrigatório
    title: Joi.string().required(),

    //A descrição do caso é obrigatória
    //Uma descrição sucinta e detalhada é fundamental para passar confiança e cativar heróis
    description: Joi.string().required(),
    
    //O valor do orçamento do caso é obrigatório
    //O valor deve ser numérico
    value: Joi.number().required()
  }),
  [Segments.HEADERS]: Joi.object({
    //A autenticação é obrigatória para esta rota
    authorization: Joi.string().required()
  }).unknown()
}), IncidentCtrl.create);
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    //A página deve ser numérica
    page: Joi.number()
  })
}), IncidentCtrl.read);
routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    //O Identificador do caso é obrigatório
    //O Identificador do caso deve ser numérico
    id: Joi.number().required()
  })
}), IncidentCtrl.delete);

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    //A autenticação é obrigatória para esta rota
    authorization: Joi.string().required()
  }).unknown()
}), ProfileCtrl.read);

module.exports = routes;