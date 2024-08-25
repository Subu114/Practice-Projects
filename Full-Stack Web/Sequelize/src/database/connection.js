const Sequelize = require('sequelize');

const sequelize = new Sequelize("tweeter", "root", "", {
    host : "localhost",
    dialect : "mysql"
})

module.exports = sequelize;
global.sequelize = sequelize;