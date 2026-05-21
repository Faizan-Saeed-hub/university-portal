import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Chatbot.css";

export default function AdmissionChatbot() {
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      text: "Hello! How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  // Send Message
  const sendMessage = async (
    text = input
  ) => {

    if (!text.trim()) return;

    /* User Message */

    const userMessage = {
      sender: "user",
      text,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setInput("");

    try {

      /* Send To Backend */

      const response = await axios.post(
        "https://university-admission-support-system.up.railway.app/api/chat",
        {
          message: text,
        }
      );

      /* Bot Reply */

      const botMessage = {
        sender: "bot",
        text: response.data.reply,
      };

      setMessages((prev) => [
        ...prev,
        botMessage,
      ]);

    } catch (error) {

      console.log(error);

      const errorMessage = {
        sender: "bot",
        text:
          "Server Error. Please try again.",
      };

      setMessages((prev) => [
        ...prev,
        errorMessage,
      ]);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot">

        {/* Sidebar */}
        <div className="sidebar">
          <div>
            <h1>AI Admission Chatbot</h1>

            <p>
              Ask questions about admissions,
              eligibility, universities,
              merit, and documents.
            </p>
          </div>

          <div className="sidebar-footer">
            <p>UniPortal Assistant</p>
          </div>
        </div>

        {/* Chat Section */}
        <div className="chat-section">

          {/* Header */}
          <div className="chat-header">
            <div>
              <h2>Admission Assistant</h2>
              <p>Your AI-powered university guide</p>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-area">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message-row ${msg.sender === "user"
                  ? "user-row"
                  : "bot-row"
                  }`}
              >
                <div
                  className={`message-bubble ${msg.sender === "user"
                    ? "user-message"
                    : "bot-message"
                    }`}
                >

                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="input-area">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={(e) =>
                e.key === "Enter" &&
                sendMessage()
              }
            />

            <button
              onClick={() => sendMessage()}
            >
              Send
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}