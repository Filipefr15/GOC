import { api } from './api'

export async function registerGestor(data) {
    const result = await api.post('/register/gestor', data);
    sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
}

export async function loginGestor(data) {
    const result = await api.post('/login/gestor', data);
    sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
}

export async function updateGestor(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/update/gestor/${data.id}`, {
        name: data.name,
        password: data.password,
        email: data.email,
        cpf: data.cpf,
        rg: data.rg,
        estado: data.estado,
        municipio: data.municipio,
        bairro: data.bairro,
        cep: data.cep,
        dataNasc: data.dataNasc
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getGestor() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/all/gestor', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function deleteGestor(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/delete/gestor/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
