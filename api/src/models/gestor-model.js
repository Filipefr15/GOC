const { Model, DataTypes } = require("sequelize");

class GestorModel extends Model {
    static init(database) {
        super.init({
            name: DataTypes.TEXT,
            password: DataTypes.TEXT,
            email: DataTypes.TEXT,
            cpf: DataTypes.INTEGER,
            rg: DataTypes.INTEGER,
            estado: DataTypes.TEXT,
            bairro: DataTypes.TEXT,
            cep: DataTypes.INTEGER,
            dataNasc: DataTypes.DATE
        }, {
            tableName: 'gestor',
            modelName: 'GestorModel',
            timestamps: false,
            sequelize: database
        });
    }
}

module.exports = { GestorModel };
