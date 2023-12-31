import { api } from './api'

export async function registerUser(data) {
    const result = await api.post('/register/usuarios', data);
    sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
    return result
}

export async function loginUser(data) {
    const result = await api.post('/login/usuarios', data);
    sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
}

export async function updateUser(data) {

    const accessToken = sessionStorage.getItem('token');
    const id = await authToken(accessToken);
    console.log(id.data, "do service");
    const result = await api.put(`/update/usuarios/${id.data}`, {
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

export async function authToken() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/auth`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
};


export async function getUsuarios() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/all/usuarios', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getOneUsuarios(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/one/usuarios/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function deleteUsuarios(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/delete/usuarios/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
