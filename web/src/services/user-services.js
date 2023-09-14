import { api } from './api'

export async function registerUser(data) {
    const result = await api.post('/register/usuarios', data);
    sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
}

export async function loginUser(data) {
    const result = await api.post('/login/usuarios', data);
    sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
}

export async function updateUser(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/update/usuarios/${data.id}`, {
        nome: data.nameFood,
        unidadeMedida: data.unity
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}