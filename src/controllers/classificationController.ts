import { Request, Response } from 'express';
import PropertyModel from '../models/PropertyModel';
import { getTagsForQuestion } from '../services/classificationService';

// Important: For returning tags from user question and finding best matches
export async function getPropertiesByQuestion(req: Request, res: Response) {
  try {
    const { question } = req.body;
    // Retrieve tags from the LLM
    const questionTags = await getTagsForQuestion(question);

    console.log('Question tags:', questionTags);
    console.log('===============');
    // Retrieve all properties and filter by the intersection with questionTags
    const allProperties = await PropertyModel.find({});
    // We can simply score them by the count of matching tags
    const scored = allProperties.map((property) => {
      const propertyTags = property.tags || [];
      const intersection = propertyTags.filter((tag) => questionTags.includes(tag));
      return {
        property,
        score: intersection.length
      };
    });

    // Sort by descending score
    scored.sort((a, b) => b.score - a.score);

    return res.json({
      questionTags,
      properties: scored
    });
  } catch (error) {
    console.error('Error in getPropertiesByQuestion:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}