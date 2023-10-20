const {Sequelize} = require('sequelize');

const dbConfig = require('../config/db.config');

const connect = new Sequelize(dbConfig);


module.exports = {connect};