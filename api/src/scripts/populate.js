require('../database');

const { UsuariosModel } = require('../models/usuarios-model');

const usuario = [
    {
        name: 'Filipe Rodrigues',
        password: '123456789',
        email: 'Filipe1@hotmail.com',
        cpf: '515557017101',
        rg: '780418911',
        estado: 'Mato Grosso',
        municipio: 'Cuiabá',
        bairro: 'Paiaguás',
        cep: '78048911',
        dataNasc: '05/04/2000'
    },
    {
        name: "Filipe Rodrigues Populate",
        password: "123456789",
        email: "Filipe2@hotmail.com",
        cpf: "5155357017101",
        rg: "780448911",
        estado: "Mato Grosso",
        municipio: "Cuiabá",
        bairro: "Paiaguás",
        cep: "78048911",
        dataNasc: "05/04/2000"
    }
];

(async () => {
    for (let usuarios of usuario) {
        await UsuariosModel.create({
            name: usuarios.name,
            password: usuarios.password,
            email: usuarios.email,
            cpf: usuarios.cpf,
            rg: usuarios.rg,
            estado: usuarios.estado,
            municipio: usuarios.municipio,
            bairro: usuarios.bairro,
            cep: usuarios.cep,
            dataNasc: usuarios.dataNasc
        });
    }
    console.log('Tudo cadastrado!');
})();
