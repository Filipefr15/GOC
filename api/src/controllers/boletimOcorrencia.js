const { HttpHelper } = require("../utils/http-helper");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { BoletimOcorrenciaModel } = require('../models/boletimOcorrencia-model');

class BoletimOcorrenciaController {
    async register(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { data, tipoOcorrencia, estadoOcorrencia, municipioOcorrencia, bairroOcorrencia, detalhesLocalOcorrencia, narrativaOcorrencia, cpfComunicante, rgComunicante, nomeComunicante, nomeMaeComunicante, statusBoletim, idDelegacia } = request.body;
            if (!data ||
                !tipoOcorrencia ||
                !estadoOcorrencia ||
                !municipioOcorrencia ||
                !bairroOcorrencia ||
                !detalhesLocalOcorrencia ||
                !narrativaOcorrencia ||
                !cpfComunicante ||
                !rgComunicante ||
                !nomeComunicante ||
                !nomeMaeComunicante
            ) return httpHelper.badRequest('Algo está faltando!');

            const boletimOcorrencia = await BoletimOcorrenciaModel.create({
                data,
                tipoOcorrencia,
                estadoOcorrencia,
                municipioOcorrencia,
                bairroOcorrencia,
                detalhesLocalOcorrencia,
                narrativaOcorrencia,
                cpfComunicante,
                rgComunicante,
                nomeComunicante,
                nomeMaeComunicante,
                statusBoletim
            });
            if (!boletimOcorrencia) return httpHelper.badRequest('Houve um erro ao criar usuário');
            return httpHelper.created('Boletim de Ocorrências protocolado com sucesso!');
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const usuariosExists = await BoletimOcorrenciaModel.findOne({ where: { id } });
            if (!usuariosExists) return httpHelper.notFound('Boletim de Ocorrência não encontrado!');
            await BoletimOcorrenciaModel.destroy({ where: { id } });
            return httpHelper.ok({
                message: 'Boletim de Ocorrência deletado com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async countFurtos(req, res) {
        const httpHelper = new HttpHelper(res);
        try {
            const result = await BoletimOcorrenciaModel.count({ where: { tipoOcorrencia: "Furto" } });
            return httpHelper.ok(result);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async countRoubos(req, res) {
        const httpHelper = new HttpHelper(res);
        try {
            const result = await BoletimOcorrenciaModel.count({ where: { tipoOcorrencia: "Roubo" } });
            return httpHelper.ok(result);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async countInjurias(req, res) {
        const httpHelper = new HttpHelper(res);
        try {
            const result = await BoletimOcorrenciaModel.count({ where: { tipoOcorrencia: "Injuria" } });
            return httpHelper.ok(result);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async countBoletinsUrgentes(req, res) {
        const httpHelper = new HttpHelper(res);
        try {
            const result = await BoletimOcorrenciaModel.count({ where: { statusBoletim: "URGENTE" } });
            return httpHelper.ok(result);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const gestor = await BoletimOcorrenciaModel.findAll({
                order: [['id', 'DESC']]
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
            const { data, tipoOcorrencia, estadoOcorrencia, municipioOcorrencia, bairroOcorrencia, detalhesLocalOcorrencia, narrativaOcorrencia, cpfComunicante, rgComunicante, nomeComunicante, nomeMaeComunicante, statusBoletim, idDelegacia } = request.body;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            // if (unidadeMedida) {
            //     const unityIsValid = Validates.validUnity(unidadeMedida);
            //     if (!unityIsValid) return httpHelper.badRequest('Unidade de medida inválido!');
            // }
            const boletimExists = await BoletimOcorrenciaModel.findByPk(id);
            if (!boletimExists) return httpHelper.notFound('Boletim de Ocorrência não encontrado!');
            await BoletimOcorrenciaModel.update({
                data,
                tipoOcorrencia,
                estadoOcorrencia,
                municipioOcorrencia,
                bairroOcorrencia,
                detalhesLocalOcorrencia,
                narrativaOcorrencia,
                cpfComunicante,
                rgComunicante,
                nomeComunicante,
                nomeMaeComunicante,
                statusBoletim,
                idDelegacia
            }, {
                where: { id }
            });
            return httpHelper.ok({
                message: 'Boletim de Ocorrência atualizado com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = { BoletimOcorrenciaController };
