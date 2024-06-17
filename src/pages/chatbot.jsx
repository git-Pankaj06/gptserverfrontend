// src/components/ChatBot.js
import React, { useState } from "react";
import axios from "axios";
import './chatbot.css';

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [chat, setChat] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message) {
      alert("Message is required");
      return;
    }


    try {
      
    const formData = new FormData();
    formData.append("message", message);
    if (file) formData.append("file", file);
      const response = await axios.post("https://gptserver-q7r5.onrender.com/azure-response", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setChat([...chat, { role: "user", content: message }, ...response.data]);
      setMessage("");
      setFile(null);
    } catch (err) {
      console.error("Error fetching Azure OpenAI response:", err);
      alert("Error fetching response. Please try again.");
    }
  };

  return (
    <div className="chatbot-container">
      <h1>Azure OpenAI ChatBot</h1>
      <br />
      <div className="chat">
        {chat.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.role}`}>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <br />
      <form onSubmit={handleSubmit}>
       
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept=".pdf,image/*,.docx,.txt"
        />
         <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message here..."
          required
        />
        <button type="submit">Send</button>
      </form>
     
    </div>
  );
};

export default ChatBot;
