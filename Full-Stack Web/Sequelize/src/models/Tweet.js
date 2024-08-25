const Sequelize = require("sequelize")
const sequelize = require("../database/connection")



module.exports = sequelize.define("Tweet", {
    id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },
    content : Sequelize.STRING(300)
    
});