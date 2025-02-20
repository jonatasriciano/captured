import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/database";
import propertyRoutes from "./routes/propertyRoutes";
import classificationRoutes from "./routes/classificationRoutes";
import importRoutes from "./routes/importRoutes";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/properties", propertyRoutes);
app.use("/api/classification", classificationRoutes);
app.use("/api/import", importRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Captured API running on port ${PORT}`);
});
