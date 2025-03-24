require("dotenv").config();
const express = require("express");
const { db, connectDB } = require("./config/database"); 
const PORT = process.env.PORT || 3000;


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const wholesalerRoutes = require("./routes/wholesalerRoutes");
const retailerRoutes = require("./routes/retailerRoutes");
const stockRoutes = require("./routes/stockRoutes");
app.use("/api/wholesalers", wholesalerRoutes);
app.use("/api/retailers", retailerRoutes);
app.use("/api/stocks", stockRoutes);



async function startServer() {
    await connectDB();
    await db.sync({ alter: true });
    console.log("Database synced!");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

startServer();
