const { HttpHelper } = require("../utils/http-helper");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { BoletimOcorrenciaModel } = require('../models/boletimOcorrencia-model');

class BoletimOcorrenciaController {
    async register(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { data, tipoOcorrencia, estadoOcorrencia, municipioOcorrencia, bairroOcorrencia, detalhesLocalOcorrencia, narrativaOcorrencia, cpfComunicante, rgComunicante, nomeComunicante, nomeMaeComunicante } = request.body;
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
                !nomeMaeComunicante) return httpHelper.badRequest('Algo está faltando!');

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
                nomeMaeComunicante
            });
            if (!boletimOcorrencia) return httpHelper.badRequest('Houve um erro ao criar usuário');
            return httpHelper.created('Boletim de Ocorrências protocolado com sucesso!');
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    // async login(request, response) {
    //     const httpHelper = new HttpHelper(response);
    //     try {
    //         const { email, password } = request.body;
    //         if (!email || !password) return httpHelper.badRequest('E-mail e senha são obrigatórios!');
    //         const userExists = await GestorModel.findOne({ where: { email } });
    //         if (!userExists) return httpHelper.notFound('Usuário não encontrado!');
    //         const isPasswordValid = await bcrypt.compare(password, userExists.password);
    //         if (!isPasswordValid) return httpHelper.badRequest('Senha incorreta!');
    //         const accessToken = jwt.sign(
    //             { id: userExists.id },
    //             process.env.TOKEN_SECRET,
    //             { expiresIn: process.env.TOKEN_EXPIRES_IN }
    //         );
    //         return httpHelper.ok({ accessToken });
    //     } catch (error) {
    //         return httpHelper.internalError(error);
    //     }
    // }
}

module.exports = { BoletimOcorrenciaController };
