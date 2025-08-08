"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Airplanes", "modelNumber", {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Airplanes", "modelNumber", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },
};
