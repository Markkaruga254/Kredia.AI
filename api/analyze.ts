import { GoogleGenAI, Type } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are an expert Credit Intelligence Analyst specializing in informal economies.
Your task is to convert unstructured text logs (SMS/Text) from small business owners into structured financial data and credit profiles.

Step 1: Extract transactions. Identify amount, type (income/expense), and category (e.g., Stock, Sales, Logistics, Personal).
Step 2: Analyze behavior. Look for consistency, stability, and risk based on the transaction timing and volume.
Step 3: Generate a Credit Score (300-850) based on KES values.
- 800+ : Exceptional consistency and growth.
- 700-800: Good, stable business.
- 600-700: Moderate risk, irregular patterns.
- 300-600: High risk, volatile or declining.
Step 4: Provide a "Human Explanation" for a lender in the context of the Kenyan informal economy. Be empathetic but objective.

Rules:
- All values are in KES (Kenyan Shillings).
- If "no sales", interpret as a day with 0 income.
- Use current time for timestamps if not specified, but try to infer relative timing if mentioned (e.g., "today", "yesterday").
`;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { rawInput } = req.body;
  if (!rawInput) {
    return res.status(400).json({ error: 'Missing rawInput' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompt = `Analyze these business logs and generate a full credit profile:\n${rawInput}`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            riskLevel: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
            stabilityRating: { type: Type.STRING },
            explanation: { type: Type.STRING },
            insights: {
              type: Type.OBJECT,
              properties: {
                consistencyScore: { type: Type.NUMBER },
                stabilityRating: { type: Type.STRING },
                riskLevel: { type: Type.STRING },
                spendingPattern: { type: Type.STRING },
                earningFrequency: { type: Type.STRING }
              },
              required: ["consistencyScore", "stabilityRating", "riskLevel", "spendingPattern", "earningFrequency"]
            },
            transactions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  amount: { type: Type.NUMBER },
                  type: { type: Type.STRING, enum: ["income", "expense"] },
                  category: { type: Type.STRING },
                  timestamp: { type: Type.STRING },
                  rawText: { type: Type.STRING }
                },
                required: ["amount", "type", "category", "timestamp", "rawText"]
              }
            }
          },
          required: ["score", "riskLevel", "stabilityRating", "explanation", "insights", "transactions"]
        }
      }
    });

    const profileText = response.text || "{}";
    let cleanJson = profileText.trim();
    if (cleanJson.startsWith("```json")) {
      cleanJson = cleanJson.replace(/^```json\n?/, "").replace(/\n?```$/, "");
    } else if (cleanJson.startsWith("```")) {
      cleanJson = cleanJson.replace(/^```\n?/, "").replace(/\n?```$/, "");
    }

    const profile = JSON.parse(cleanJson);
    profile.transactions = profile.transactions.map((t: any, i: number) => ({
      ...t,
      id: `tx-${Date.now()}-${i}`
    }));

    return res.status(200).json(profile);
  } catch (error: any) {
    console.error("Error calling Gemini:", error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
