const { Router, request } = require('express');

//const { FoodController } = require('./controllers/food');
const { UsuariosController } = require('./controllers/usuarios');
const { GestorController } = require('./controllers/gestor');
const { authMiddleware } = require('./middleware/auth-middleware');
const { BoletimOcorrenciaController } = require('./controllers/boletimOcorrencia');
const { DelegaciaController } = require('./controllers/delegacia');


const routes = Router();


const usuariosController = new UsuariosController();
const gestorController = new GestorController();
const boletimOcorrenciaController = new BoletimOcorrenciaController();
const delegaciaController = new DelegaciaController();


routes.post('/register/usuarios', usuariosController.register);
routes.post('/login/usuarios', usuariosController.login);
routes.delete('/delete/usuarios/:id', authMiddleware, usuariosController.delete);
routes.get('/all/usuarios', authMiddleware, usuariosController.getAll);
routes.get('/one/usuarios/:id', authMiddleware, usuariosController.getOne);
routes.put('/update/usuarios/:id', authMiddleware, usuariosController.update);
routes.get('/auth', authMiddleware, usuariosController.authToken);

routes.post('/register/gestor', gestorController.register);
routes.post('/login/gestor', gestorController.login);
routes.delete('delete/gestor/:id', authMiddleware, gestorController.delete);
routes.get('/all/gestores', authMiddleware, gestorController.getAll);
routes.put('/update/gestor/:id', authMiddleware, gestorController.update);

routes.post('/create/delegacia', delegaciaController.register);
routes.delete('/delete/delegacia/:id', authMiddleware, delegaciaController.delete);
routes.get('/all/delegacias', authMiddleware, delegaciaController.getAll);
routes.put('/update/delegacia/:id', authMiddleware, delegaciaController.update);
routes.get('/one/delegacia/:id', authMiddleware, delegaciaController.getOne);

routes.post('/register/boletimOcorrencia', authMiddleware, boletimOcorrenciaController.register)
routes.delete('/delete/boletimOcorrencia/:id', authMiddleware, boletimOcorrenciaController.delete);
routes.get('/achar/boletimOcorrencia', authMiddleware, boletimOcorrenciaController.getAll)
routes.put('/atualizar/boletimOcorrencia/:id', authMiddleware, boletimOcorrenciaController.update)

routes.get('/contar/boletimOcorrencia/furtos', authMiddleware, boletimOcorrenciaController.countFurtos);
routes.get('/contar/boletimOcorrencia/roubos', authMiddleware, boletimOcorrenciaController.countRoubos);
routes.get('/contar/boletimOcorrencia/injurias', authMiddleware, boletimOcorrenciaController.countInjurias);
routes.get('/boletimOcorrencia/urgente', authMiddleware, boletimOcorrenciaController.countBoletinsUrgentes);






module.exports = { routes };
