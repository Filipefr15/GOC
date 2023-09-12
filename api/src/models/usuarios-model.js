const { Model, DataTypes } = require("sequelize");

class UsuariosModel extends Model {
    static init(database) {
        super.init({
            name: DataTypes.TEXT,
            password: DataTypes.TEXT,
            email: DataTypes.TEXT,
            cpf: DataTypes.TEXT,
            rg: DataTypes.TEXT,
            estado: DataTypes.TEXT,
            municipio: DataTypes.TEXT,
            bairro: DataTypes.TEXT,
            cep: DataTypes.INTEGER,
            dataNasc: DataTypes.DATE
        }, {
            tableName: 'usuarios',
            modelName: 'UsuariosModel',
            timestamps: false,
            sequelize: database
        });
    }
}

module.exports = { UsuariosModel };
