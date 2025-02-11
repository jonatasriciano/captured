import axios from 'axios';
import { IProperty } from '../interfaces/IProperty';

// Important: This is just a placeholder for LLM requests
export async function classifyProperty(property: IProperty): Promise<string[]> {
  // Important: Example using OpenAI. Adjust to your LLM provider if needed.
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  const prompt = `Classify this property with relevant tags based on its features:\n${JSON.stringify(property)}`;

  console.log('---!!!!!!!!!!!!!!!Prompt:', prompt);
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`
        }
      }
    );

    // Parse the response and return an array of tags
    const completion = response.data.choices[0].message.content;
    // For simplicity, let's assume completion is a comma-separated list of tags
    const tags = completion.split(',').map((tag: string) => tag.trim());
    return tags;
  } catch (error) {
    return [];
  }
}

// Important: This is a placeholder for question-based tag extraction
export async function getTagsForQuestion(question: string): Promise<string[]> {
  // Here, we just call the same or similar API
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
  const prompt = `Extract only relevant tags from this user request:\n${question}`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`
        }
      }
    );

    const completion = response.data.choices[0].message.content;
    const tags = completion.split(',').map((tag: string) => tag.trim());
    return tags;
  } catch (error) {
    console.error('Error in getTagsForQuestion:', error);
    return [];
  }
}