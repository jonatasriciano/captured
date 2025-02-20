import express from "express";
import fs from "fs";
import path from "path";
import PropertyModel from "../models/PropertyModel";

const router = express.Router();

/**
 * @route POST /api/import
 * @desc Import properties from a JSON file in the `json_upload` directory.
 */
router.post("/", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../../json_upload/properties.json");

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res
        .status(400)
        .json({ error: "File not found in json_upload directory." });
    }

    // Read the file content
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // Parse JSON
    const properties = JSON.parse(fileContent);

    if (!Array.isArray(properties)) {
      return res
        .status(400)
        .json({
          error: "Invalid JSON format. Expected an array of properties.",
        });
    }

    let insertedCount = 0;
    let skippedCount = 0;

    for (const property of properties) {
      const existingProperty = await PropertyModel.findOne({ id: property.id });

      if (existingProperty) {
        skippedCount++;
        continue;
      }

      const newProperty = new PropertyModel(property);
      await newProperty.save();
      insertedCount++;
    }

    return res.json({
      message: "Import completed successfully",
      inserted: insertedCount,
      skipped: skippedCount,
    });
  } catch (error) {
    console.error("❌ Error importing properties:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
