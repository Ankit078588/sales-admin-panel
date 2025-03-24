const { Wholesaler, Retailer, db } = require("../models");



const addNewRetailer = async (req, res) => {
    try {
        const { name, mobile_number } = req.body;

        if(!name || !mobile_number) {
            return res.status(404).json({
                message: 'Please Provide both name & mobile_number'
            });
        }

        // create new Retailer
        const newRetailer = await Retailer.create({
            name,
            mobile_number
        });

        res.status(200).json({
            message: "New Retailer registered.",
            newRetailer
        })
    } catch (error) {
        console.error("Error creating Retailer: ", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};


const getAllRetailers = async (req, res) => {
    try {
        // Find all retailers
        const retailers = await Retailer.findAll();

        if (retailers.length === 0) {
            return res.status(200).json({
                message: "No retailers found."
            });
        }

        // Send the list of retailers
        res.status(200).json({
            message: "Retailers fetched successfully.",
            retailers
        });
    } catch (error) {
        console.error("Error fetching retailers:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};



const getRetailersLinkedWithOneWholesaler = async (req, res) => {
    try {
        const retailers = await Retailer.findAll({
            attributes: ["id", "name"],
            include: [
                {
                    model: Wholesaler,
                    attributes: ["id"],
                    through: { attributes: [] }
                },
            ],
        });

        const filteredRetailers = retailers.filter(
            (retailer) => Array.isArray(retailer.wholesalers) && retailer.wholesalers.length === 1
        );

        // send response
        res.status(200).json({
            message: "Retailers associated with exactly one wholesaler",
            retailers: filteredRetailers,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};











module.exports = {
    addNewRetailer,
    getAllRetailers,
    getRetailersLinkedWithOneWholesaler
}