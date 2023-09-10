const { Router, request } = require('express');

//const { FoodController } = require('./controllers/food');
const { UsuariosController } = require('./controllers/usuarios');
const { GestorController } = require('./controllers/gestor');
const { authMiddleware } = require('./middleware/auth-middleware');

const routes = Router();

//const foodController = new FoodController();
const usuariosController = new UsuariosController();
const gestorController = new GestorController();

// routes.post('/food', authMiddleware, foodController.create);
// routes.get('/foods', authMiddleware, foodController.getAll);
// routes.delete('/food/:id', authMiddleware, foodController.delete);
// routes.put('/food/:id', authMiddleware, foodController.update);

routes.post('/register', usuariosController.register);
routes.post('/login', usuariosController.login);

routes.post('/register/gestor', gestorController.register);
routes.post('/login/gestor', gestorController.login);

module.exports = { routes };
