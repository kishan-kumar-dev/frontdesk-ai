import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Fetch AI response for the given user question.
 * If AI or API is unavailable, returns "unknown" so that
 * the server escalates the query to the supervisor panel.
 */
export async function getAIResponse(question, knowledge) {
  try {
    // 🔍 Step 1: Check for exact match in knowledge base
    const match = knowledge.find(
      (k) => k.question.toLowerCase() === question.toLowerCase()
    );
    if (match) {
      console.log("✅ Matched from knowledge base");
      return match.answer;
    }

    // 🤖 Step 2: Query OpenAI model
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a polite salon frontdesk assistant. If you are not sure, reply with exactly 'unknown'.",
        },
        { role: "user", content: question },
      ],
      temperature: 0.7,
    });

    const aiReply = completion.choices[0]?.message?.content?.trim() || "";

    // If the model replies "unknown", trigger escalation
    if (aiReply.toLowerCase().includes("unknown")) {
      console.log("⚠️ AI replied 'unknown', escalating to supervisor.");
      return "unknown";
    }

    console.log("✅ AI replied:", aiReply);
    return aiReply;
  } catch (error) {
    // ⚠️ Step 3: Handle network or quota errors
    console.error("❌ OpenAI API error:", error.message);

    // Return 'unknown' to escalate the query to supervisor
    return "unknown";
  }
}
