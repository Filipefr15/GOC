'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('delegacia', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      delegado: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      nomeDelegacia: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      estadoDelegacia: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      municipioDelegacia: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      bairroDelegacia: {
        type: Sequelize.TEXT,
        allowNull: false,
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('delegacia');
  }
};
