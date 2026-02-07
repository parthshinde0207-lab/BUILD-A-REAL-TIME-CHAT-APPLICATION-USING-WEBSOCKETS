import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket("ws://localhost:8080");

    socket.current.onopen = () => {
      console.log("Connected to WebSocket");
    };

    socket.current.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    socket.current.onerror = (error) => {
      console.error("WebSocket error", error);
    };

    return () => socket.current.close();
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.current.send(message);
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <h1>Real-Time Chat App</h1>

      <div className="messages">
        {messages.map((msg, i) => (
          <div className="message" key={i}>
            {msg}
          </div>
        ))}
      </div>

      <div className="input-box">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
