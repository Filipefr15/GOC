const { HttpHelper } = require("../utils/http-helper");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UsuariosModel } = require('../models/usuarios-model');

class UsuariosController {
    async register(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { name, password, email, cpf, rg, estado, municipio, bairro, cep, dataNasc } = request.body;
            if (!name ||
                !email ||
                !password ||
                !cpf ||
                !rg ||
                !estado ||
                !municipio ||
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
                municipio,
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

    async authToken(request, response){
        const httpHelper = new HttpHelper(response);
        try {
            const authorizationHeader = request.headers.authorization;

            const token = authorizationHeader.replace('Bearer ', ''); // Remove "Bearer " do cabeçalho

            const jwt = require('jsonwebtoken');

            jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
            if (err) {
                return httpHelper.badRequest('Token não autenticado');
            } else {
                return httpHelper.ok(decodedToken.id);
            }
            });

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

    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const usuariosExists = await UsuariosModel.findOne({ where: { id } });
            if (!usuariosExists) return httpHelper.notFound('Usuário não encontrado!');
            await UsuariosModel.destroy({ where: { id } });
            return httpHelper.ok({
                message: 'Usuário deletado com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const usuarios = await UsuariosModel.findAll();
            return httpHelper.ok(usuarios);
        } catch (error) {
            return httpHelper.internalError(usuarios);
        }
    }

    async getOne(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const usuarios = await UsuariosModel.findOne({where: {id}});
            return httpHelper.ok(usuarios);
        } catch (error) {
            return httpHelper.internalError(usuarios);
        }
    }

    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const { name, email, password, cpf, rg, estado, municipio, bairro, cep, dataNasc } = request.body;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            // if (unidadeMedida) {
            //     const unityIsValid = Validates.validUnity(unidadeMedida);
            //     if (!unityIsValid) return httpHelper.badRequest('Unidade de medida inválido!');
            // }
            const usuariosExists = await UsuariosModel.findByPk(id);
            if (!usuariosExists) return httpHelper.notFound('Usuário não encontrado!');
            await UsuariosModel.update({
                name,
                email,
                password,
                cpf,
                rg,
                estado,
                municipio,
                bairro,
                cep,
                dataNasc
            }, {
                where: { id }
            });
            return httpHelper.ok({
                message: 'Usuário atualizado com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

}

module.exports = { UsuariosController };
