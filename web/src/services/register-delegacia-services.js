import { api } from "./api";

export async function getDelegacia() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/all/delegacias', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getOneDelegacia(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/one/delegacia/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function deleteDelegacia(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/delete/delegacia/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function updateDelegacia(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/update/delegacia/${data.id}`, {
        nomeDelegacia: data.nomeDelegacia
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function registerDelegacia(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/create/delegacia', {
        delegado: data.delegado,
        nomeDelegacia: data.nomeDelegacia,
        estadoDelegacia: data.estadoDelegacia,
        municipioDelegacia: data.municipioDelegacia,
        bairroDelegacia: data.bairroDelegacia
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
