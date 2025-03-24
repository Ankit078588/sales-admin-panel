const express = require("express");
const router = express.Router();

const WholesalerController = require("../controllers/wholesalerController");


router.post("/register/newWholesaler", WholesalerController.addNewWholesaler);   
router.post("/:wholesaler_id/associate-retailers", WholesalerController.associateWithRetailers);  
router.get("/turnover", WholesalerController.getMonthlyTurnover);    
router.get("/max-turnover", WholesalerController.getMaxTurnoverFromSingleRetailer);  
router.get("/:wholesaler_id", WholesalerController.getWholesalerWithRetailers); 


module.exports = router;

