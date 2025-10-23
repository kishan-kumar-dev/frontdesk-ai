import express from "express";
import cors from "cors";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { AccessToken } from "livekit-server-sdk";
import { getAIResponse } from "./agent.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// 🗂 Paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "data");
const knowledgePath = path.join(dataDir, "knowledge.json");
const helpReqPath = path.join(dataDir, "help_requests.json");

// Create data dir and files if not exist
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
if (!fs.existsSync(knowledgePath)) fs.writeFileSync(knowledgePath, "[]");
if (!fs.existsSync(helpReqPath)) fs.writeFileSync(helpReqPath, "[]");

// Helper functions
const load = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const save = (file, data) =>
  fs.writeFileSync(file, JSON.stringify(data, null, 2));

// -----------------------------
// 🧠 AI Question Endpoint
// -----------------------------
app.post("/ask", async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "Question required" });

  const knowledge = load(knowledgePath);
  const match = knowledge.find(
    (k) => k.question.toLowerCase() === question.toLowerCase()
  );

  if (match) return res.json({ answer: match.answer });

  try {
    const answer = await getAIResponse(question, knowledge);

    if (answer === "unknown") {
      // Escalate to supervisor
      const helpReqs = load(helpReqPath);
      const newReq = {
        id: Date.now(),
        question,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      helpReqs.push(newReq);
      save(helpReqPath, helpReqs);

      return res.json({
        answer: "Let me check with my supervisor and get back to you.",
        escalated: true,
      });
    }

    // Save answer to knowledge
    knowledge.push({
      question,
      answer,
      createdAt: new Date().toISOString(),
    });
    save(knowledgePath, knowledge);

    res.json({ answer });
  } catch (err) {
    console.error("❌ AI error:", err);
    res.status(500).json({ error: "AI response failed" });
  }
});

// -----------------------------
// 📚 Knowledge Routes
// -----------------------------
app.get("/knowledge", (req, res) => res.json(load(knowledgePath)));

// -----------------------------
// 🆘 Help Request Routes
// -----------------------------

// Explicit POST /help-request (optional for demo)
app.post("/help-request", (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "Question required" });

  const helpReqs = load(helpReqPath);
  const newReq = {
    id: Date.now(),
    question,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  helpReqs.push(newReq);
  save(helpReqPath, helpReqs);

  res.json({ success: true, request: newReq });
});

// Get all pending help requests
app.get("/help-requests", (req, res) => res.json(load(helpReqPath)));

// Supervisor resolves a help request
app.post("/help-response/:id", (req, res) => {
  const { id } = req.params;
  const { answer } = req.body;
  if (!answer) return res.status(400).json({ error: "Answer required" });

  const helpReqs = load(helpReqPath);
  const idx = helpReqs.findIndex((r) => r.id === parseInt(id));
  if (idx === -1) return res.status(404).json({ error: "Not found" });

  // Update help request
  helpReqs[idx].status = "resolved";
  helpReqs[idx].answer = answer;
  helpReqs[idx].resolvedAt = new Date().toISOString();
  save(helpReqPath, helpReqs);

  // Add to knowledge base
  const knowledge = load(knowledgePath);
  knowledge.push({
    question: helpReqs[idx].question,
    answer,
    createdAt: new Date().toISOString(),
  });
  save(knowledgePath, knowledge);

  res.json({ success: true });
});

// -----------------------------
// 🎤 LiveKit Token Endpoint
// -----------------------------
app.get("/token", (req, res) => {
  const { identity } = req.query;
  try {
    const at = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      { identity: identity || "FrontdeskAgent" }
    );
    at.addGrant({
      roomJoin: true,
      room: "voice-room",
      canPublish: true,
      canSubscribe: true,
    });
    res.json({ token: at.toJwt(), url: process.env.LIVEKIT_URL });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate token" });
  }
});

// -----------------------------
// 🔥 Start Server
// -----------------------------
app.listen(PORT, () =>
  console.log(`✅ Backend running on http://localhost:${PORT}`)
);
