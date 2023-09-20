'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('boletimOcorrencia', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false
      },
      tipoOcorrencia: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      estadoOcorrencia: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      municipioOcorrencia: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      bairroOcorrencia: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      detalhesLocalOcorrencia: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      narrativaOcorrencia: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      cpfComunicante: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      rgComunicante: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      nomeComunicante: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      nomeMaeComunicante: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      statusBoletim: {
        type: Sequelize.TEXT,
        default: "Protocolado"
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('boletimOcorrencia');
  }
};
