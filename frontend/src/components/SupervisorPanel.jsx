import React, { useEffect, useState } from "react";

const SupervisorPanel = () => {
  const [helpRequests, setHelpRequests] = useState([]);
  const [answers, setAnswers] = useState({});

  // Fetch help requests every 3 seconds
  useEffect(() => {
    const fetchRequests = async () => {
      const res = await fetch("http://localhost:5000/help-requests");
      const data = await res.json();
      setHelpRequests(data.filter(r => r.status === "pending"));
    };

    fetchRequests();
    const interval = setInterval(fetchRequests, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleResolve = async (id) => {
    const answer = answers[id];
    if (!answer) return alert("Please enter an answer");

    const res = await fetch(`http://localhost:5000/help-response/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer }),
    });
    const data = await res.json();
    if (data.success) {
      alert("Resolved!");
      setAnswers(prev => ({ ...prev, [id]: "" }));
      // Remove resolved request from state
      setHelpRequests(prev => prev.filter(r => r.id !== id));
    } else {
      alert("Error resolving request");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Supervisor Panel</h1>
      {helpRequests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        helpRequests.map(req => (
          <div key={req.id} className="border p-4 mb-4 rounded shadow">
            <p className="mb-2"><strong>Question:</strong> {req.question}</p>
            <textarea
              className="w-full border p-2 rounded mb-2"
              value={answers[req.id] || ""}
              onChange={(e) => handleChange(req.id, e.target.value)}
              placeholder="Enter answer here"
            />
            <button
              onClick={() => handleResolve(req.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Resolve
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default SupervisorPanel;
