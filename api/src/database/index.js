const { Sequelize } = require('sequelize');
const configDatabase = require('./config');

//const { FoodModel } = require('../models/food-model');
const { UsuariosModel } = require('../models/usuarios-model');
const { GestorModel } = require('../models/gestor-model');
const { BoletimOcorrenciaModel } = require('../models/boletimOcorrencia-model');

const database = new Sequelize(configDatabase);

//FoodModel.init(database);
UsuariosModel.init(database);
GestorModel.init(database);
BoletimOcorrenciaModel.init(database);

module.exports = database;
