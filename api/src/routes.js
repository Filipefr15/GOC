const { Router, request } = require('express');

//const { FoodController } = require('./controllers/food');
const { UsuariosController } = require('./controllers/usuarios');
const { GestorController } = require('./controllers/gestor');
const { authMiddleware } = require('./middleware/auth-middleware');
const { BoletimOcorrenciaController } = require('./controllers/boletimOcorrencia');

const routes = Router();

//const foodController = new FoodController();
const usuariosController = new UsuariosController();
const gestorController = new GestorController();
const boletimOcorrenciaController = new BoletimOcorrenciaController();

// routes.post('/food', authMiddleware, foodController.create);
// routes.get('/foods', authMiddleware, foodController.getAll);
// routes.delete('/food/:id', authMiddleware, foodController.delete);
// routes.put('/food/:id', authMiddleware, foodController.update);

routes.post('/register/usuarios', usuariosController.register);
routes.post('/login/usuarios', usuariosController.login);
routes.delete('/delete/usuarios/:id', authMiddleware, usuariosController.delete);
routes.get('/all/usuarios', authMiddleware, usuariosController.getAll);
routes.put('/update/usuarios/:id', authMiddleware, usuariosController.update);

routes.post('/register/gestor', gestorController.register);
routes.post('/login/gestor', gestorController.login);
routes.delete('delete/gestor/:id', authMiddleware, gestorController.delete);
routes.get('/gestores', authMiddleware, gestorController.getAll);
routes.put('/gestor/:id', authMiddleware, gestorController.update);

routes.post('/register/boletimOcorrencia', authMiddleware, boletimOcorrenciaController.register)
routes.delete('/delete/boletimOcorrencia/:id', authMiddleware, boletimOcorrenciaController.delete);
routes.get('/achar/boletimOcorrencia', authMiddleware, boletimOcorrenciaController.getAll)
routes.put('/atualizar/boletimOcorrencia/:id', authMiddleware, boletimOcorrenciaController.update)

module.exports = { routes };
