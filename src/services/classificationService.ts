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
  const prompt = `Classify this property with relevant tags. Return ONLY a valid JSON array of tags. Property details: ${JSON.stringify(property)}`;

  console.log("Prompt Sent to OpenAI:", prompt);

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a professional real estate agent in Canada. Your job is to classify properties based on their features, location, and category. Always return tags in JSON format, with no additional text. Always in EN-US.`,
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

    // Extracts the response content
    let completion = response.data.choices[0].message.content.trim();

    console.log("--- OpenAI Response (Raw):", completion);

    if (completion.startsWith("```json")) {
      completion = completion.replace(/```json/, "").trim();
    }
    if (completion.endsWith("```")) {
      completion = completion.replace(/```$/, "").trim();
    }

    console.log("--- OpenAI Response (Cleaned):", completion);

    // Ensure the response is valid JSON
    const tags = JSON.parse(completion);

    // Validate if response is an array
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

  const prompt = `Extract relevant property tags from the following user request. Return ONLY a JSON array with the classification tags. User request: "${question}". Always in EN-US.`;
  console.log("--- Prompt Sent to OpenAI:", prompt);

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a professional real estate agent in Canada. Your task is to extract real estate classification tags from user requests. Always return a JSON array of tags, with no additional text. Always in EN-US`,
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

    // Extracts the response content
    const completion = response.data.choices[0].message.content;

    console.log("--- OpenAI Response:", completion);

    // Ensure the response is valid JSON
    const tags = JSON.parse(completion);

    // Validate if response is an array
    if (!Array.isArray(tags)) {
      throw new Error("Invalid response format: Expected an array.");
    }

    return tags;
  } catch (error) {
    console.error("❌ Error in getTagsForQuestion:", error);
    return [];
  }
}
