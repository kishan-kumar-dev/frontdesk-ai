import React, { useState } from "react";

export default function LiveKitVoice({ onLog }) {
  const [isListening, setIsListening] = useState(false);

  const toggleMic = async () => {
    if (isListening) {
      setIsListening(false);
      onLog("🔴 Stopped listening");
      return;
    }

    setIsListening(true);
    onLog("🎙 Listening...");

    // Mock input via browser prompt for demo
    const question = prompt("Say something to the assistant:");
    if (!question) {
      setIsListening(false);
      return;
    }

    onLog(`👤 You: ${question}`);

    try {
      const res = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();

      const answer = data.answer || "I'm not sure yet, let me check.";
      onLog(`🤖 AI: ${answer}`);

      const utter = new SpeechSynthesisUtterance(answer);
      utter.rate = 1;
      speechSynthesis.speak(utter);
    } catch (err) {
      onLog("❌ Connection error");
      const utter = new SpeechSynthesisUtterance(
        "Sorry, I couldn’t reach the server."
      );
      speechSynthesis.speak(utter);
    } finally {
      setIsListening(false);
    }
  };

  return (
    <button
      onClick={toggleMic}
      className={`px-6 py-3 text-lg rounded-full font-medium shadow-md transition-all duration-300 ${
        isListening
          ? "bg-red-500 text-white animate-pulse"
          : "bg-rose-500 text-white hover:bg-rose-600"
      }`}
    >
      {isListening ? "🔴 Stop" : "🎤 Start Talking"}
    </button>
  );
}
