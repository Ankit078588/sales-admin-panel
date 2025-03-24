const { db } = require("../config/database");
const Wholesaler = require("./wholesaler");
const Retailer = require("./retailer");
const Stock = require("./stock");



// Associations
Wholesaler.belongsToMany(Retailer, { through: "WholesalerRetailer" });
Retailer.belongsToMany(Wholesaler, { through: "WholesalerRetailer" });

Wholesaler.hasMany(Stock, { foreignKey: "wholesaler_id" });
Retailer.hasMany(Stock, { foreignKey: "retailer_id" });

// Reverse Associations
Stock.belongsTo(Wholesaler, { foreignKey: "wholesaler_id" });
Stock.belongsTo(Retailer, { foreignKey: "retailer_id" });




module.exports = { 
    db, 
    Wholesaler, 
    Retailer, 
    Stock 
};

