import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LiveKitVoice from "./components/LiveKitVoice";
import SupervisorPanel from "./components/SupervisorPanel";

export default function App() {
  const [logs, setLogs] = useState([]);
  const addLog = (msg) => setLogs((prev) => [...prev, msg]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-100 text-gray-800">
              <h1 className="text-3xl font-semibold text-rose-600 mb-8">
                🎧 Frontdesk Voice Assistant
              </h1>
              <LiveKitVoice onLog={addLog} />
              <div className="mt-6 w-full max-w-md bg-white/70 backdrop-blur-md rounded-xl p-4 text-xs sm:text-sm shadow-inner border border-rose-100 overflow-y-auto max-h-48">
                {logs.map((log, i) => (
                  <p key={i} className="text-gray-600">
                    • {log}
                  </p>
                ))}
              </div>
            </div>
          }
        />
        <Route path="/supervisor" element={<SupervisorPanel />} />
      </Routes>
    </Router>
  );
}
