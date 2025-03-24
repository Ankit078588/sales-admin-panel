const { Sequelize } = require("sequelize");

const db = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, {
      host: process.env.DB_HOST,
      dialect: "postgres",
      logging: false,
      dialectOptions: {
        ssl: process.env.DB_SSL === "true" ? { require: true, rejectUnauthorized: false } : false,
      },
    }
);

const connectDB = async () => {
  try {
    await db.authenticate();
    console.log("Database connected successfully...");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};

module.exports = { db, connectDB };
