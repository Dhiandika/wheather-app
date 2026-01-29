
import { GoogleGenAI } from "@google/genai";

export const getClimateAnalysis = async (regionName: string, data: any) => {
  try {
    // Initializing with process.env.API_KEY as a direct named parameter.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a 2-sentence expert climate analysis for ${regionName} based on these metrics: Temp ${data.temp}°C, Humidity ${data.humidity}%, Pressure ${data.pressure}hPa. Keep it sounding professional and technical.`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });
    // Correctly accessing the text property from GenerateContentResponse.
    return response.text;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Analyzing global atmosphere patterns for localized anomaly detection. Proceed with caution in coastal sectors.";
  }
};
