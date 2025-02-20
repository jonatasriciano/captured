import express from "express";
import fs from "fs/promises";
import path from "path";
import PropertyModel from "../models/PropertyModel";

const router = express.Router();

/**
 * @swagger
 * /api/import:
 *   post:
 *     summary: Import properties from a JSON file
 *     description: Reads a file from `json_upload/properties.json` and inserts properties into the database.
 *     tags:
 *       - Import
 *     responses:
 *       200:
 *         description: Successfully imported properties
 *         content:
 *           application/json:
 *             example:
 *               message: "Import completed successfully"
 *               inserted: 10
 *               skipped: 3
 *       400:
 *         description: Bad request - File not found or invalid JSON format
 *         content:
 *           application/json:
 *             examples:
 *               FileNotFound:
 *                 summary: File not found
 *                 value:
 *                   error: "File not found in json_upload directory."
 *               InvalidJSON:
 *                 summary: Invalid JSON format
 *                 value:
 *                   error: "Invalid JSON format. Expected an array of properties."
 *               EmptyJSON:
 *                 summary: JSON file is empty
 *                 value:
 *                   error: "JSON file is empty."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error"
 */

router.post("/", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../../json_upload/properties.json");

    // Check if file exists before proceeding
    try {
      await fs.access(filePath);
    } catch {
      return res
        .status(400)
        .json({ error: "File not found in json_upload directory." });
    }

    // Read file content asynchronously
    const fileContent = await fs.readFile(filePath, "utf-8");

    let properties;
    try {
      properties = JSON.parse(fileContent);
      if (!Array.isArray(properties)) {
        throw new Error();
      }
    } catch {
      return res.status(400).json({
        error: "Invalid JSON format. Expected an array of properties.",
      });
    }

    if (properties.length === 0) {
      return res.status(400).json({ error: "JSON file is empty." });
    }

    // Fetch existing property IDs to avoid duplicates
    const existingIds = new Set(await PropertyModel.find().distinct("id"));
    const newProperties = properties.filter(
      (prop) => !existingIds.has(prop.id),
    );

    if (newProperties.length === 0) {
      return res.status(200).json({
        message:
          "No new properties to import. All are already in the database.",
      });
    }

    // Insert new properties in bulk for better performance
    await PropertyModel.insertMany(newProperties);

    return res.json({
      message: "Import completed successfully",
      inserted: newProperties.length,
      skipped: properties.length - newProperties.length,
    });
  } catch (error) {
    console.error("❌ Error importing properties:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
