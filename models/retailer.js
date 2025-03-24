const { Sequelize } = require("sequelize");
const { db } = require("../config/database");

const Retailer = db.define("Retailer", {
    id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    name: { 
        type: Sequelize.STRING, 
        allowNull: false 
    },
    mobile_number: { 
        type: Sequelize.STRING, 
        allowNull: false 
    }
});



module.exports = Retailer;
