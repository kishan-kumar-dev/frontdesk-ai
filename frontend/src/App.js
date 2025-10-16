import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000";

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [requests, setRequests] = useState([]);
  const [knowledge, setKnowledge] = useState([]);

  useEffect(() => {
    loadRequests();
    loadKnowledge();
  }, []);

  async function askAI() {
    const res = await axios.post(`${API}/ask`, { question });
    setResponse(res.data.answer || res.data.message);
    setQuestion("");
    loadRequests();
  }

  async function loadRequests() {
    const res = await axios.get(`${API}/requests`);
    setRequests(res.data);
  }

  async function loadKnowledge() {
    const res = await axios.get(`${API}/knowledge`);
    setKnowledge(res.data);
  }

  async function answerRequest(id) {
    const answer = prompt("Enter your answer:");
    if (!answer) return;
    await axios.post(`${API}/requests/${id}`, { answer });
    alert("Answer saved!");
    loadRequests();
    loadKnowledge();
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>💬 Frontdesk AI Supervisor</h1>

      <h2>Ask the AI</h2>
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask something..."
        style={{ padding: 5, marginRight: 10 }}
      />
      <button onClick={askAI}>Ask</button>

      <p>
        <b>Response:</b> {response}
      </p>

      <h2>Pending Requests</h2>
      <ul>
        {requests
          .filter((r) => r.status === "pending")
          .map((r) => (
            <li key={r.id}>
              ❓ {r.question}{" "}
              <button onClick={() => answerRequest(r.id)}>Answer</button>
            </li>
          ))}
      </ul>

      <h2>Knowledge Base</h2>
      <ul>
        {knowledge.map((k, i) => (
          <li key={i}>
            ✅ {k.question} → {k.answer}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
