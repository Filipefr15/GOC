const { Model, DataTypes } = require("sequelize");

class DelegaciaModel extends Model {
    static init(database) {
        super.init({
            delegado: DataTypes.TEXT,
            nomeDelegacia: DataTypes.TEXT,
            estadoDelegacia: DataTypes.TEXT,
            municipioDelegacia: DataTypes.TEXT,
            bairroDelegacia: DataTypes.TEXT
        }, {
            tableName: 'delegacia',
            modelName: 'DelegaciaModel',
            timestamps: false,
            sequelize: database
        });
    }
}

module.exports = { DelegaciaModel };
