const { Wholesaler, Retailer, Stock } = require("../models");
const { Op, Sequelize } = require("sequelize");


// Add new Wholesaler
const addNewWholesaler = async (req, res) => {
    try {
        const { name, mobile_number } = req.body;

        if(!name || !mobile_number) {
            return res.status(404).json({
                message: 'Please Provide both name & mobile_number.'
            });
        }

        // create new wholesaler
        const newWholesaler = await Wholesaler.create({
            name,
            mobile_number
        });

        res.status(200).json({
            message: "New wholesaler registered.",
            newWholesaler
        })
    } catch (error) {
        console.error(error);
        console.error("Error creating wholesaler: ", error);
    }
};


// Connect Wholesaler with Retailer
const associateWithRetailers = async (req, res) => {
    try {
        const { wholesaler_id } = req.params;
        const { retailer_ids } = req.body;

        if( !wholesaler_id || retailer_ids.length == 0) {
            return res.status(401).json({message: 'Please provide both wholesaler_id & retailer_id'})
        }

        const wholesaler = await Wholesaler.findByPk(wholesaler_id);
        if (!wholesaler) return res.status(404).json({ message: "Incorrect Wholesaler_id." });

        const retailers = await Retailer.findAll({ where: { id: retailer_ids } });
        if (retailers.length !== retailer_ids.length) {
            return res.status(400).json({ message: "Incorrect retailer_ids. Please check retailer_id." });
        }

        // find existing associations
        const existingRetailers = await wholesaler.getRetailers({ attributes: ["id"] });
        const existingRetailerIds = existingRetailers.map(r => r.id);

        // filter only new retailers that are not already associated
        const newRetailers = retailers.filter(r => !existingRetailerIds.includes(r.id));

        if (newRetailers.length > 0) {
            await wholesaler.addRetailers(newRetailers);
        }

        res.status(200).json({
            message: newRetailers.length > 0 
                ? "Retailers associated successfully!" 
                : "All retailers were already associated!",
            wholesaler,
            newlyAddedRetailers: newRetailers
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


// Get Wholesaler + Retailer
const getWholesalerWithRetailers = async (req, res) => {
    try {
        const { wholesaler_id } = req.params;

        const wholesaler = await Wholesaler.findByPk(wholesaler_id, {
            include: {
                model: Retailer,
                through: { attributes: [] }, // ✅ Hide the junction table fields
            }
        });

        if (!wholesaler) {
            return res.status(404).json({ message: "Wholesaler not found with given wholesaler_id." });
        }

        res.status(200).json({ wholesaler });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};



// Get monthly Turnover
const getMonthlyTurnover = async (req, res) => {
    try {
        console.log('Req reached -----------------------');
        const { year, wholesaler_id } = req.query;

        // Validate Inputs
        if (!year || !wholesaler_id) {
            return res.status(400).json({ message: "Both year and wholesaler_id are required." });
        }

        // Query Database
        const turnoverData = await Stock.findAll({
            attributes: [
                [Sequelize.fn("DATE_TRUNC", "month", Sequelize.col("date")), "month"],
                [Sequelize.fn("SUM", Sequelize.col("stock_amount")), "total_turnover"]
            ],
            where: {
                wholesaler_id,
                date: {
                    [Op.between]: [`${year}-01-01`, `${year}-12-31`]
                }
            },
            group: [Sequelize.fn("DATE_TRUNC", "month", Sequelize.col("date"))],
            order: [[Sequelize.fn("DATE_TRUNC", "month", Sequelize.col("date")), "ASC"]]
        });

        // Format Response
        const formattedResponse = turnoverData.map(record => ({
            month: record.getDataValue("month"),
            total_turnover: record.getDataValue("total_turnover")
        }));

        res.status(200).json({
            message: `Monthly turnover for wholesaler ${wholesaler_id} in year ${year}`,
            data: formattedResponse
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


// Get maximum turnover from single Retailer
const getMaxTurnoverFromSingleRetailer = async (req, res) => {
    try {
        const { wholesaler_id } = req.query; 

        if (!wholesaler_id) {
            return res.status(400).json({ message: "wholesaler_id is required in the query params" });
        }

        console.log("Received wholesaler_id:", wholesaler_id); 

        const maxTurnover = await Stock.findOne({
            attributes: [
                "retailer_id",
                [Sequelize.fn("SUM", Sequelize.col("stock_amount")), "total_turnover"]
            ],
            include: [
                {
                    model: Retailer,
                    attributes: ["id", "name"]
                }
            ],
            where: { wholesaler_id },
            group: ["Stock.retailer_id", "Retailer.id", "Retailer.name"],
            order: [[Sequelize.fn("SUM", Sequelize.col("stock_amount")), "DESC"]],
            limit: 1
        });

        res.status(200).json({
            maxTurnover
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};




module.exports = {
    addNewWholesaler,
    associateWithRetailers,
    getWholesalerWithRetailers,
    getMonthlyTurnover,
    getMaxTurnoverFromSingleRetailer
}

