const { Stock, Wholesaler, Retailer } = require("../models");


const sellStock = async (req, res) => {
    try {
        const { wholesaler_id, retailer_id, stock_amount, date } = req.body;

        // Check wholesaler and retailer exists OR not.
        const wholesaler = await Wholesaler.findByPk(wholesaler_id);
        const retailer = await Retailer.findByPk(retailer_id);

        if (!wholesaler) {
            return res.status(404).json({ 
                message: "Incorrect wholesaler_id. Please enter correct wholesaler_id." 
            });
        }

        if(!retailer) {
            return res.status(404).json({ 
                message: "Incorrect retailer_id. Please enter correct retailer_id." 
            });
        }

        const newStock = await Stock.create({
            wholesaler_id,
            retailer_id,
            stock_amount,
            date
        });

        res.status(200).json({
            message: "Stock sold successfully.",
            newStock
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


module.exports = { 
    sellStock
};