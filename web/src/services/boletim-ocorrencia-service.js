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

export async function getOneBoletimOcorrencia(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/one/boletimOcorrencia/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getCountIdDelegacia(idDelegacia) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/allDelegacia/boletimOcorrencia/${idDelegacia}`, {
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
        statusBoletim: data.statusBoletim,
        idDelegacia: data.idDelegacia
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function registerBoletimOcorrencia(data) {
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
        //       idDelegacia: data.idDelegacia
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function countRoubos() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/contar/boletimOcorrencia/roubos`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function countFurtos() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/contar/boletimOcorrencia/furtos`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function countInjurias() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/contar/boletimOcorrencia/injurias`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function countBoletinsUrgentes() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/boletimOcorrencia/urgente`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}