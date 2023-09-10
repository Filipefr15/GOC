const { HttpHelper } = require("../utils/http-helper");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UsuariosModel } = require('../models/usuarios-model');

class UsuariosController {
    async register(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { name, password, email, cpf, rg, estado, bairro, cep, dataNasc } = request.body;
            if (!name ||
                !email ||
                !password ||
                !cpf ||
                !rg ||
                !estado ||
                !bairro ||
                !cep ||
                !dataNasc) return httpHelper.badRequest('Algo está faltando!');
            const userAlreadyExists = await UsuariosModel.findOne({ where: { cpf } });
            if (userAlreadyExists) return httpHelper.badRequest('Usuário já cadastrado!');
            const passwordHashed = await bcrypt.hash(
                password,
                Number(process.env.SALT)
            );
            const usuarios = await UsuariosModel.create({
                name,
                email,
                password: passwordHashed,
                cpf,
                rg,
                estado,
                bairro,
                cep,
                dataNasc
            });
            if (!usuarios) return httpHelper.badRequest('Houve um erro ao criar usuário');
            const accessToken = jwt.sign(
                { id: usuarios.id },
                process.env.TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRES_IN }
            );
            return httpHelper.created({ accessToken });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async login(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { email, password } = request.body;
            if (!email || !password) return httpHelper.badRequest('E-mail e senha são obrigatórios!');
            const userExists = await UsuariosModel.findOne({ where: { email } });
            if (!userExists) return httpHelper.notFound('Usuário não encontrado!');
            const isPasswordValid = await bcrypt.compare(password, userExists.password);
            if (!isPasswordValid) return httpHelper.badRequest('Senha incorreta!');
            const accessToken = jwt.sign(
                { id: userExists.id },
                process.env.TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRES_IN }
            );
            return httpHelper.ok({ accessToken });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = { UsuariosController };
