const express = require("express");
const router = express.Router();


const StockController = require("../controllers/stockController");




router.post("/sell", StockController.sellStock);



module.exports = router;

