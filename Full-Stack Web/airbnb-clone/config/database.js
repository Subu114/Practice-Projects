const Sequelize = require('sequelize');

const sequelize = new Sequelize('trialdb', "root", "", {
    host : "localhost",
    dialect : "mysql"
})

module.exports = sequelize;