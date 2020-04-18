const knex = require('knex');
const config = require('../../knexfile');

const environment = process.env.NODE_ENV === 'test' ? config.test : config.development;

const connection = knex(environment);

module.exports = connection;