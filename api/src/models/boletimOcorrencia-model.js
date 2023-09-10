const { Model, DataTypes } = require("sequelize");

class BoletimOcorrenciaModel extends Model {
    static init(database) {
        super.init({
            data: DataTypes.DATE,
            tipoOcorrencia: DataTypes.TEXT,
            estadoOcorrencia: DataTypes.TEXT,
            municipioOcorrencia: DataTypes.TEXT,
            bairrocorrencia: DataTypes.TEXT,
            detalhesOcorrencia: DataTypes.TEXT,
            narrativaOcorrencia: DataTypes.TEXT,
            cpfComunicante: DataTypes.INTEGER,
            rgComunicante: DataTypes.INTEGER,
            nomeComunicante: DataTypes.TEXT,
            nomeMaeComunicante: DataTypes.TEXT
        }, {
            tableName: 'boletimOcorrencia',
            modelName: 'BoletimOcorrenciaModel',
            timestamps: false,
            sequelize: database
        });
    }
}

module.exports = { BoletimOcorrenciaModel };
