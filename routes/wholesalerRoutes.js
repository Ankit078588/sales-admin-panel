const express = require("express");
const router = express.Router();

const WholesalerController = require("../controllers/wholesalerController");


router.post("/register/newWholesaler", WholesalerController.addNewWholesaler);   // 1
router.post("/:wholesaler_id/associate-retailers", WholesalerController.associateWithRetailers);  // 2
router.get("/turnover", WholesalerController.getMonthlyTurnover);       // 3
router.get("/max-turnover", WholesalerController.getMaxTurnoverFromSingleRetailer);  
router.get("/:wholesaler_id", WholesalerController.getWholesalerWithRetailers);   // 4


module.exports = router;


