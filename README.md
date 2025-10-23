
```markdown
# 💬 Frontdesk AI Assistant

An intelligent, voice-enabled **salon frontdesk AI assistant** built using **React**, **Express**, **LiveKit**, and **OpenAI (with mock fallback)**.  
It can talk to customers, answer questions, and automatically learn new answers from the supervisor panel.

---

## 🧠 Features

✅ **Conversational AI Assistant**
- Voice-enabled salon frontdesk agent  
- Answers customer queries politely and contextually  
- Speaks back using browser speech synthesis  

✅ **Supervisor Panel**
- Escalates unknown questions to supervisor  
- Supervisor can resolve and teach new answers  
- Learns automatically and saves to knowledge base  

✅ **Knowledge Base**
- Persistent JSON storage (`backend/data/knowledge.json`)  
- Grows automatically with each supervisor correction  

✅ **Mock Mode**
- Works even when OpenAI quota is exceeded or API is offline  
- Replies with a placeholder AI response  

✅ **Modern UI**
- Clean, responsive design (TailwindCSS)  
- Smooth chat bubbles, typing animation, gradient background  

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React + Tailwind CSS |
| Voice | LiveKit SDK + Web Speech API |
| Backend | Node.js + Express |
| AI | OpenAI API (`gpt-4o-mini` / fallback to `gpt-3.5-turbo`) |
| Storage | JSON files (`knowledge.json`, `help_requests.json`) |

---

## 🧱 Project Structure

```

frontdesk-ai/
├── backend/
│   ├── server.js             # Main backend server (AI, LiveKit, knowledge)
│   ├── agent.js              # Agent training & supervisor logic
│   ├── data/
│   │   ├── knowledge.json    # Learned Q&A pairs
│   │   └── help_requests.json# Escalated unanswered questions
│   └── .env                  # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LiveKitVoice.jsx
│   │   │   └── SupervisorPanel.jsx
│   │   ├── App.js
│   │   ├── index.css
│   │   └── index.js
│   └── package.json
│
└── README.md

````

---

## ⚙️ Setup Instructions

### 1️⃣ Backend Setup

```bash
cd backend
npm install
````

Create a `.env` file inside `/backend`:

```bash
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
LIVEKIT_API_KEY=your_livekit_api_key_here
LIVEKIT_API_SECRET=your_livekit_secret_here
LIVEKIT_URL=https://your-livekit-server-url
```

Run the backend:

```bash
node server.js
```

✅ Output:

```
✅ Backend running on http://localhost:5000
```

---

### 2️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm install react-router-dom
npm start
```

Open: [http://localhost:3000](http://localhost:3000)

---

## 🧠 API Endpoints

| Endpoint         | Method | Description                                          |
| ---------------- | ------ | ---------------------------------------------------- |
| `/ask`           | POST   | Ask AI a question. Saves context and returns answer. |
| `/knowledge`     | GET    | View all saved Q&A knowledge.                        |
| `/token`         | GET    | Generates a LiveKit voice token.                     |
| `/help-request`  | POST   | Adds an unresolved question for supervisor.          |
| `/help-requests` | GET    | List all unresolved help requests.                   |
| `/resolve`       | POST   | Supervisor resolves a help request and teaches AI.   |

---

## 💬 How It Works

1. User asks a question (text or voice).
2. Backend checks knowledge base for similar questions.
3. If found → responds immediately.
4. If not → escalates to `/help-request` for supervisor resolution.
5. Supervisor resolves it via dashboard.
6. Answer is saved into `knowledge.json`.
7. AI learns and can now answer automatically next time!

---

## 🎙 Voice Mode (LiveKit)

* Click **🎤 Start Talking** to begin conversation.
* AI replies with speech (via Web Speech API).
* Click **🔴 Stop** to end voice session.

---

## 💾 Knowledge & Help Requests

**Example – knowledge.json**

```json
[
  {
    "id": 169000000001,
    "question": "What are your working hours?",
    "answer": "We’re open daily from 9 AM to 6 PM.",
    "createdAt": "2025-10-22T10:00:00Z"
  }
]
```

**Example – help_requests.json**

```json
[
  {
    "id": 169000000002,
    "question": "Do you offer bridal makeup packages?",
    "resolved": false
  }
]
```

---

## 🧑‍💼 Supervisor Panel

Visit:

```
http://localhost:3000/supervisor
```

### Features:

* View unresolved help requests
* Provide answers and mark them resolved
* Automatically updates knowledge base

---

## 🧰 Mock Mode (Fallback)

If your OpenAI key is invalid or quota is exceeded,
the assistant switches to **mock mode**, showing:

```
🤖 Mock AI: "your question" sounds interesting!
```

This ensures your demo always works, even without billing.

---

## 🧪 Example Demo Flow

### Step 1

👩 Ask: “What are your salon hours?”

➡️ AI: “We’re open daily from 9 AM to 6 PM!”

### Step 2

👩 Ask: “Do you have spa services?”
➡️ AI: “Hmm, I’m not sure. Let me check with my supervisor.”

### Step 3

👩‍💼 Supervisor opens `/supervisor` → answers → saves.

### Step 4

👩 Ask again: “Do you have spa services?”
➡️ AI: “Yes, we offer premium spa and relaxation packages!”

---

## 📸 Screenshots (optional)

You can add:

```
/frontend/public/screenshots/
```

Then embed:

```markdown
![Screenshot 1](public/screenshots/assistant.png)
```

---

## 🔐 Common Errors

| Error                | Cause                      | Fix                                |
| -------------------- | -------------------------- | ---------------------------------- |
| 429 Quota Exceeded   | Free API key limit reached | Enable mock mode or add billing    |
| 401 Invalid API Key  | Wrong OpenAI key           | Check `.env`                       |
| LiveKit Token Error  | Wrong credentials          | Regenerate from LiveKit cloud      |
| Frontend build fails | Missing deps               | Run `npm install react-router-dom` |

---

## 💼 Submission Checklist

✅ Working frontend & backend
✅ Voice assistant demo
✅ Supervisor panel functional
✅ JSON knowledge saved
✅ Loom video recorded
✅ Public GitHub repo uploaded

---

## 🚀 Quick Commands

```bash
# Start backend
cd backend && node server.js

# Start frontend
cd frontend && npm start

# Test AI endpoint
curl -X POST http://localhost:5000/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What time do you open?"}'
```

---

## 🏁 Final Notes

This project demonstrates:

* Full-stack development using React + Express
* Real-time AI + voice communication with LiveKit
* Contextual learning & supervisor-based improvement
* Error handling and graceful fallbacks for offline mode

---

**Developed with ❤️ by Kishan Kumar**
For the **Frontdesk Software Engineering Challenge – 2025**

```