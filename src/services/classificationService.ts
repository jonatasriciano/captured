import axios from "axios";
import { IProperty } from "../interfaces/IProperty";

/**
 * Classifies a property with relevant tags using an AI model.
 *
 * @param {IProperty} property - The property object to be classified.
 * @returns {Promise<string[]>} A promise that resolves to an array of tags.
 */
export async function classifyProperty(property: IProperty): Promise<string[]> {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const prompt = `Property details: ${JSON.stringify(property)}`;

  console.log("Prompt Sent to OpenAI:", prompt);

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a real estate AI assistant. Classify properties using all available details (description, size, price, location, amenities, etc.).
                      Return ONLY a valid JSON array of classification tags in EN-US.
                      Example output: ["Luxury", "Modern", "Ocean View", "Spacious", "High-end", "Affordable"].`,
          },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      },
    );

    let completion = response.data.choices[0].message.content.trim();

    console.log("OpenAI Response (Raw):", completion);

    completion = completion
      .replace(/```json/, "")
      .replace(/```$/, "")
      .trim();

    console.log("OpenAI Response (Cleaned):", completion);

    const parsedResponse = JSON.parse(completion);

    const tags = Array.isArray(parsedResponse)
      ? parsedResponse
      : parsedResponse.tags;

    if (!Array.isArray(tags)) {
      throw new Error("Invalid response format: Expected an array.");
    }

    return tags;
  } catch (error) {
    console.error("❌ Error fetching tags from OpenAI:", error);
    return [];
  }
}

/**
 * Extracts relevant classification tags from a user's request.
 *
 * @param {string} question - The user's search query.
 * @returns {Promise<string[]>} A promise that resolves to an array of extracted tags.
 */
export async function getTagsForQuestion(question: string): Promise<string[]> {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

  console.log("Prompt Sent to OpenAI:", question);

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a real estate AI assistant. Extract classification tags from user queries.
                      Return ONLY a valid JSON array of tags in EN-US.
                      Example output: ["Luxury", "Modern", "Ocean View", "Spacious", "High-end", "Affordable"].`,
          },
          { role: "user", content: question },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      },
    );

    const completion = response.data.choices[0].message.content.trim();

    console.log("OpenAI Response:", completion);

    const tags = JSON.parse(completion);

    if (!Array.isArray(tags)) {
      throw new Error("Invalid response format: Expected an array.");
    }

    return tags;
  } catch (error) {
    console.error("❌ Error in getTagsForQuestion:", error);
    return [];
  }
}
