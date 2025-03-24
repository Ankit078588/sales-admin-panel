const express = require("express");
const router = express.Router();

const RetailerController = require("../controllers/retailerController");


router.post("/register/newRetailer", RetailerController.addNewRetailer);
router.get("/getAllRetailers", RetailerController.getAllRetailers);
router.get("/single-wholesaler", RetailerController.getRetailersLinkedWithOneWholesaler);




module.exports = router;


