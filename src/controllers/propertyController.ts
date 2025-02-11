import { Request, Response } from 'express';
import PropertyModel from '../models/PropertyModel';
import { classifyProperty } from '../services/classificationService';

// Important: For classifying all properties in the collection
export async function classifyAllProperties(req: Request, res: Response) {
  try {
    const properties = await PropertyModel.find({});
    for (const prop of properties) {
      const tags = await classifyProperty(prop);
      prop.tags = tags;
      await prop.save();
    }
    return res.json({ message: 'Properties classified successfully' });
  } catch (error) {
    console.error('Error in classifyAllProperties:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Important: For adding a new property
export async function addNewProperty(req: Request, res: Response) {
  try {
    const newProperty = await PropertyModel.create(req.body);
    return res.status(201).json(newProperty);
  } catch (error) {
    console.error('Error in addNewProperty:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}