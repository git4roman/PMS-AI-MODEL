// geminiApi.js
require("dotenv/config");

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              text: 'Instruction: You are a knowledgeable plant assistant specifically trained to answer questions related to plant care, plant types, gardening, plant diseases, and plant management. Your knowledge includes proper care, watering schedules, sunlight needs, common pests, fertilizers, and best practices for plant health. Your focus should be entirely on plant-related topics.\n\nIf a question outside of plant care, management, or gardening is asked, respond professionally with the following message:\n\n"I am sorry, but this request is beyond my area of expertise. Please keep your queries related to plants and gardening.',
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Okay, I understand. I'm ready to assist with any plant-related questions. Let's get growing!\n",
            },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error during message generation:", error);
    throw new Error("Failed to generate message");
  }
}

module.exports = run; // Export the run function
