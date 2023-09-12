const { HttpHelper } = require("../utils/http-helper");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { GestorModel } = require('../models/gestor-model');

class GestorController {
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
            const userAlreadyExists = await GestorModel.findOne({ where: { cpf } });
            if (userAlreadyExists) return httpHelper.badRequest('Usuário já cadastrado!');
            const passwordHashed = await bcrypt.hash(
                password,
                Number(process.env.SALT)
            );
            const gestor = await GestorModel.create({
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
            if (!gestor) return httpHelper.badRequest('Houve um erro ao criar usuário');
            const accessToken = jwt.sign(
                { id: gestor.id },
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
            const userExists = await GestorModel.findOne({ where: { email } });
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
            const usuariosExists = await GestorModel.findOne({ where: { id } });
            if (!usuariosExists) return httpHelper.notFound('Gestor não encontrado!');
            await GestorModel.destroy({ where: { id } });
            return httpHelper.ok({
                message: 'Gestor deletado com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const gestor = await GestorModel.findAll();
            return httpHelper.ok(gestor);
        } catch (error) {
            return httpHelper.internalError(gestor);
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
            const gestorExists = await GestorModel.findByPk(id);
            if (!gestorExists) return httpHelper.notFound('Gestor não encontrado!');
            await GestorModel.update({
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
                message: 'Gestor atualizado com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = { GestorController };
