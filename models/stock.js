const Sequelize = require("sequelize");
const { db } = require("../config/database");

const Stock = db.define("Stock", {
    id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    wholesaler_id: { 
        type: Sequelize.INTEGER, 
        allowNull: false 
    },
    retailer_id: { 
        type: Sequelize.INTEGER, 
        allowNull: false 
    },
    stock_amount: { 
        type: Sequelize.FLOAT, 
        allowNull: false 
    },
    date: { 
        type: Sequelize.DATEONLY, 
        allowNull: false 
    }
}, { timestamps: false });




module.exports = Stock;
