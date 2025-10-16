const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = "data.json";

// Create DB file if it doesn’t exist
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(
    DB_FILE,
    JSON.stringify({ requests: [], knowledge: [] }, null, 2)
  );
}

function loadDB() {
  return JSON.parse(fs.readFileSync(DB_FILE));
}

function saveDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// 🧠 AI "answers" or "asks for help"
app.post("/ask", (req, res) => {
  const { question } = req.body;
  const db = loadDB();
  const found = db.knowledge.find((k) =>
    question.toLowerCase().includes(k.question.toLowerCase())
  );

  if (found) {
    return res.json({ answer: found.answer });
  } else {
    const newReq = { id: uuidv4(), question, status: "pending", answer: null };
    db.requests.push(newReq);
    saveDB(db);
    return res.json({
      message: "Let me check with my supervisor.",
      request: newReq,
    });
  }
});

// 👨 Supervisor views pending
app.get("/requests", (req, res) => {
  const db = loadDB();
  res.json(db.requests);
});

// 👨 Supervisor answers
app.post("/requests/:id", (req, res) => {
  const { id } = req.params;
  const { answer } = req.body;
  const db = loadDB();

  const reqItem = db.requests.find((r) => r.id === id);
  if (!reqItem) return res.status(404).json({ error: "Request not found" });

  reqItem.status = "resolved";
  reqItem.answer = answer;
  db.knowledge.push({ question: reqItem.question, answer });
  saveDB(db);

  res.json({ message: "Answer saved! AI has learned it." });
});

// View learned answers
app.get("/knowledge", (req, res) => {
  const db = loadDB();
  res.json(db.knowledge);
});

// Start the server
app.listen(5000, () =>
  console.log("✅ Backend running on http://localhost:5000")
);
