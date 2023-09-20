import { api } from "./api";

export async function getBoletimOCorrencia() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/achar/boletimOcorrencia', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function deleteBoletimOcorrencia(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/delete/boletimOcorrencia/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function updateBoletimOcorrencia(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/atualizar/boletimOcorrencia/${data.id}`, {
        statusBoletimOcorrencia: data.statusBoletimOcorrencia
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function createFood(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/register/boletimOcorrencia', {
        data: data.data,
        tipoOcorrencia: data.tipoOcorrencia,
        estadoOcorrencia: data.estadoOcorrencia,
        municipioOcorrencia: data.municipioOcorrencia,
        bairroOcorrencia: data.bairroOcorrencia,
        detalhesLocalOcorrencia: data.detalhesLocalOcorrencia,
        narrativaOcorrencia: data.narrativaOcorrencia,
        cpfComunicante: data.cpfComunicante,
        rgComunicante: data.rgComunicante,
        nomeComunicante: data.nomeComunicante,
        nomeMaeComunicante: data.nomeMaeComunicante
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
