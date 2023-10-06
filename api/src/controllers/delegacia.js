const { HttpHelper } = require("../utils/http-helper");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { DelegaciaModel } = require('../models/delegacia-model');

class DelegaciaController {
    async register(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { delegado, nomeDelegacia, estadoDelegacia, municipioDelegacia, bairroDelegacia } = request.body;
            if (!delegado ||
                !nomeDelegacia ||
                !estadoDelegacia ||
                !municipioDelegacia ||
                !bairroDelegacia
            ) return httpHelper.badRequest('Algo está faltando!');

            const delegacia = await DelegaciaModel.create({
                delegado,
                nomeDelegacia,
                estadoDelegacia,
                municipioDelegacia,
                bairroDelegacia
            });
            if (!delegacia) return httpHelper.badRequest('Houve um erro ao criar usuário');
            return httpHelper.created('Delegacia protocolada com sucesso!');
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const usuariosExists = await DelegaciaModel.findOne({ where: { id } });
            if (!usuariosExists) return httpHelper.notFound('Delegacia não encontrada!');
            await DelegaciaModel.destroy({ where: { id } });
            return httpHelper.ok({
                message: 'Delegacia deletada com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const gestor = await DelegaciaModel.findAll({
                order: [['id', 'DESC']]
            });
            return httpHelper.ok(gestor);
        } catch (error) {
            return httpHelper.internalError(gestor);
        }
    }

    async getOne(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params
            const gestor = await DelegaciaModel.findOne({
                where: { id }
            });
            return httpHelper.ok(gestor);
        } catch (error) {
            return httpHelper.internalError(gestor);
        }
    }

    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const { delegado, nomeDelegacia, estadoDelegacia, municipioDelegacia, bairroDelegacia } = request.body;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const delegaciaExists = await DelegaciaModel.findByPk(id);
            if (!delegaciaExists) return httpHelper.notFound('Delegacia não encontrada!');
            await DelegaciaModel.update({
                delegado,
                nomeDelegacia,
                estadoDelegacia,
                municipioDelegacia,
                bairroDelegacia
            }, {
                where: { id }
            });
            return httpHelper.ok({
                message: 'Delegacia atualizada com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = { DelegaciaController };
