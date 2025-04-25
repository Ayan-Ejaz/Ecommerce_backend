'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'XYZ',
        Contact: '0395256295',
        email: 'xyz@gmail.com',
        Address: JSON.stringify({ city: 'Karachi', state: 'Malir' }),
        password: '123',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', { email: 'xyz@gmail.com' }, {});
  }
};
