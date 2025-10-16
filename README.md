
```markdown
# 💬 Frontdesk Human-in-the-Loop AI Supervisor

## 🧠 Overview
This project is a **simple prototype AI receptionist** built for the Frontdesk Engineering Test.

It simulates an AI agent that can:
- Answer known questions from customers
- Escalate to a human supervisor when it doesn’t know
- Learn automatically from supervisor answers for future questions

This project fulfills **Phase 1** of the assessment using **React + Node.js**.

---

## ⚙️ Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | React (JavaScript) |
| Backend | Node.js + Express |
| Database | Local JSON (`data.json`) |
| Communication | REST API (via Axios) |

---

## 🧩 Folder Structure
```

frontdesk-ai/
│
├── backend/
│   ├── server.js          ← Node.js backend API
│   ├── data.json          ← Auto-created local DB
│   └── package.json
│
└── frontend/
├── src/
│   └── App.js         ← React dashboard
├── package.json
└── ...

````

---

## 🚀 How to Run

### 1️⃣ Start the Backend
Open a terminal and run:
```bash
cd backend
npm install
node server.js
````

✅ It should say:
`Backend running on http://localhost:5000`

---

### 2️⃣ Start the Frontend

Open a **new terminal** and run:

```bash
cd frontend
npm install
npm start
```

✅ It will open automatically at:
[http://localhost:3000](http://localhost:3000)

---

## 💡 How It Works

1. **Ask the AI** a question (e.g. “What are your salon hours?”)
2. If AI knows → it answers from its knowledge base.
3. If not → it says “Let me check with my supervisor.”

   * This creates a *help request* visible in the supervisor UI.
4. **Supervisor answers** the pending request.
5. The system saves the answer → AI “learns” it.
6. Next time, the AI answers that question automatically.

---

## 🖥️ Features

| Feature                    | Description                                 |
| -------------------------- | ------------------------------------------- |
| 🧠 AI Agent                | Responds to known questions                 |
| 📩 Help Requests           | Automatically created for unknown questions |
| 👩‍💼 Supervisor Dashboard | Shows pending & resolved requests           |
| 📚 Knowledge Base          | Displays all learned Q&A                    |
| 🔄 Auto-Learning           | AI stores new info automatically            |
| ⚙️ Local Persistence       | Saves everything in `data.json`             |

---

## 📊 Example Flow

```
Customer: "Do you offer coloring?"
AI: "Let me check with my supervisor."
↓
Supervisor UI: Shows pending request
↓
Supervisor answers: "Yes, we do!"
↓
AI learns and stores the answer
↓
Next time AI says: "Yes, we do!"
```

---

## 🧠 Design Notes

* Backend uses **Express** for clean modular APIs.
* All data is stored in `data.json` — no external DB setup needed.
* Frontend uses **Axios** to fetch and update data from the backend.
* Simple React state management — no Redux or frameworks.
* Error handling and basic structure are included for clarity.

---

## 📽️ Demo Video

🎥 **Watch the demo:**
https://www.loom.com/share/5a2353dd65c04faa9742a28ad6b8a242

---

## 🧩 Future Improvements

* Integrate real **LiveKit voice calling**
* Add **supervisor notifications** via email or WebSocket
* Use **Firebase** or **MongoDB** for persistent cloud data
* Add authentication for multiple supervisors

---

## ✉️ Submission

**Submitted to:** Ruchir (Founder, Frontdesk)
**By:** Kishan Kumar

---

### ❤️ Thank You

It was an enjoyable project!
Building this helped me understand how Frontdesk approaches “human-in-the-loop” AI systems.

```