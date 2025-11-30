import React, { useState, useEffect } from "react";
import "./FloatingChatbot.css";

const FloatingChatbot = () => {
  const [open, setOpen] = useState(false);
  const [showInitialMsg, setShowInitialMsg] = useState(true);

  const [messages, setMessages] = useState([
    { from: "bot", text: "How can I help you?" },
    { from: "bot", text: "Ask me anything!" },
  ]);

  const [showIntroForm, setShowIntroForm] = useState(false);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setShowInitialMsg(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = () => {
    if (!userInput.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text: userInput }]);

    if (userInput.toLowerCase() === "hey") {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: "Sure! Please introduce yourself." },
        ]);
        setShowIntroForm(true);
      }, 500);
    }

    setUserInput("");
  };

  return (
    <div className="floating-chatbot-wrapper">
      {!open && showInitialMsg && (
        <div className="initial-wrapper">
          <img src="/images/icon.png" className="initial-avatar" />

          <div className="initial-msg-box">
            <p className="initial-text">
              👋 Want to chat about Hubly? I'm an chatbot here to help you find
              your way.
            </p>

            <img
              src="/images/Close.png"
              className="initial-close"
              onClick={() => setShowInitialMsg(false)}
            />
          </div>
        </div>
      )}

      {!open && (
        <img
          src="/images/floatingButton.png"
          className="floating-btn"
          onClick={() => {
            setOpen(true);
            setShowInitialMsg(false);
          }}
        />
      )}

      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="header-left">
              <img src="/images/icon.png" className="header-avatar" />
              <div className="online-dot"></div>
              <span className="header-title">Hubly</span>
            </div>
          </div>

          <div className="chat-body">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={msg.from === "bot" ? "bot-msg" : "user-msg"}
              >
                {msg.text}
              </div>
            ))}

            {showIntroForm && (
              <div className="intro-form">
                <h4>Introduce Yourself</h4>

                <label>Your name</label>
                <input type="text" placeholder="Your name" />

                <label>Your Phone</label>
                <input type="text" placeholder="+1 (000) 000-0000" />

                <label>Your Email</label>
                <input type="email" placeholder="example@gmail.com" />

                <button>Thank You!</button>
              </div>
            )}
          </div>

          <div className="chat-footer">
            <input
              type="text"
              className="chat-message-input"
              placeholder="Write a message"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <img
              src="/images/send.png"
              className="chat-send-icon"
              onClick={sendMessage}
            />
          </div>

          <img
            src="/images/floatingClose.png"
            className="floating-close-btn"
            onClick={() => setOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default FloatingChatbot;
