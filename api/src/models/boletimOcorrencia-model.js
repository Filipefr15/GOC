const { Model, DataTypes } = require("sequelize");

class BoletimOcorrenciaModel extends Model {
    static init(database) {
        super.init({
            data: DataTypes.DATE,
            tipoOcorrencia: DataTypes.TEXT,
            estadoOcorrencia: DataTypes.TEXT,
            municipioOcorrencia: DataTypes.TEXT,
            bairroOcorrencia: DataTypes.TEXT,
            detalhesLocalOcorrencia: DataTypes.TEXT,
            narrativaOcorrencia: DataTypes.TEXT,
            cpfComunicante: DataTypes.TEXT,
            rgComunicante: DataTypes.TEXT,
            nomeComunicante: DataTypes.TEXT,
            nomeMaeComunicante: DataTypes.TEXT,
            statusBoletim: DataTypes.TEXT,
            idDelegacia: DataTypes.INTEGER
        }, {
            tableName: 'boletimOcorrencia',
            modelName: 'BoletimOcorrenciaModel',
            timestamps: false,
            sequelize: database
        });
    }
    static associate(models) {
        this.belongsTo(models.DelegaciaModel, { foreignKey: 'idDelegacia' });
    }
}

module.exports = { BoletimOcorrenciaModel };
