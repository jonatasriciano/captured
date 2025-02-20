import { Request, Response } from "express";
import PropertyModel from "../models/PropertyModel";
import { classifyProperty } from "../services/classificationService";

/**
 * Classifies all properties that do not have tags.
 *
 * @param {Request} req - The Express request object containing the parameters.
 * @param {Response} res - The Express response object.
 * @returns {Promise<Response>} A JSON response indicating the result of the classification process.
 */
export async function classifyAllProperties(req: Request, res: Response) {
  try {
    const properties = await PropertyModel.find({
      $or: [{ tags: { $exists: false } }, { tags: { $size: 0 } }],
    }).limit(100);

    if (properties.length === 0) {
      return res.json({ message: "All properties are already classified" });
    }

    let updatedCount = 0;
    for (const prop of properties) {
      const tags = await classifyProperty(prop);

      if (tags.length > 0) {
        prop.tags = tags;
        await prop.save();
        updatedCount++;
      }
    }

    return res.json({
      message: "Properties classified successfully",
      updated: updatedCount,
      skipped: properties.length - updatedCount,
    });
  } catch (error) {
    console.error("❌ Error in classifyAllProperties:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

/**
 * Adds a new property to the database.
 *
 * @param {Request} req - The Express request object containing the property data.
 * @param {Response} res - The Express response object.
 * @returns {Promise<Response>} A JSON response with the newly added property.
 */
export async function addNewProperty(req: Request, res: Response) {
  try {
    const newProperty = await PropertyModel.create(req.body);
    return res.status(201).json(newProperty);
  } catch (error) {
    console.error("Error in addNewProperty:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
