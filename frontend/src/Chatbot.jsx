import React, { useState } from "react";
import "./Chatbot.css";

export default function Chatbot() {
  const [headerColor, setHeaderColor] = useState("#33475B");
  const [bgColor, setBgColor] = useState("#EEEEEE");

  const [msg1, setMsg1] = useState("How can i help you?");
  const [msg2, setMsg2] = useState("Ask me anything!");

  const [name, setName] = useState("Your name");
  const [phone, setPhone] = useState("+1 (000) 000-0000");
  const [email, setEmail] = useState("example@gmail.com");

  return (
    <div className="chatbot-page">
      {/* LEFT SIDE */}
      <div className="chatbot-left">
        <h1 className="page-title">Chat Bot</h1>

        {/* CHAT PREVIEW CARD */}
        <div className="preview-card" style={{ backgroundColor: bgColor }}>
          {/* Header */}
          <div
            className="preview-header"
            style={{ backgroundColor: headerColor }}
          >
            <img src="/images/icon2.png" className="header-avatar" />
            <span className="header-title">Hubly</span>
          </div>

          {/* CHAT BODY */}
          <div className="preview-body">
            <div className="bubble-row">
              <img src="/images/icon.png" className="bubble-avatar" />
              <div className="bubble">{msg1}</div>
            </div>

            <div className="bubble-row">
              <div className="bubble">{msg2}</div>
            </div>

            {/* INTRO FORM INSIDE CHAT */}
            {/* INTRO FORM CARD */}
        <div className="setting-card">
          <div className="setting-title">Introduction Form</div>

          <label>Your name</label>
          <input
            className="input-line"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Your Phone</label>
          <input
            className="input-line"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label>Your Email</label>
          <input
            className="input-line"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="intro-btn full">Thank You!</button>
        </div>
          </div>

          {/* FOOTER */}
          <div className="preview-footer">
            <span className="footer-placeholder">Write a message</span>
            <button><span className="footer-send">➤</span></button>
            
          </div>
        </div>

        {/* FLOATING WELCOME BUBBLE */}
        <div className="welcome-popup">
          <img src="/images/icon.png" className="popup-avatar" />
          <div className="popup-text">
            👋 Want to chat about Hubly? I'm an chatbot here to help you find
            your way.
          </div>
          <button className="popup-close">×</button>
        </div>
      </div>

      {/* RIGHT SIDE SETTINGS */}
      <div className="chatbot-right">
        {/* HEADER COLOR CARD */}
        <div className="setting-card">
          <div className="setting-title">Header Color</div>

          <div className="color-row">
            <button
              className="color-swatch"
              style={{ background: "#FFFFFF" }}
              onClick={() => setHeaderColor("#FFFFFF")}
            />
            <button
              className="color-swatch"
              style={{ background: "#000000" }}
              onClick={() => setHeaderColor("#000000")}
            />
            <button
              className="color-swatch"
              style={{ background: "#33475B" }}
              onClick={() => setHeaderColor("#33475B")}
            />
          </div>

          <div className="hex-box">{headerColor}</div>
        </div>

        {/* BG COLOR CARD */}
        <div className="setting-card">
          <div className="setting-title">Custom Background Color</div>

          <div className="color-row">
            <button
              className="color-swatch"
              style={{ background: "#FFFFFF" }}
              onClick={() => setBgColor("#FFFFFF")}
            />
            <button
              className="color-swatch"
              style={{ background: "#000000" }}
              onClick={() => setBgColor("#000000")}
            />
            <button
              className="color-swatch"
              style={{ background: "#FAFBFC" }}
              onClick={() => setBgColor("#FAFBFC")}
            />
          </div>

          <div className="hex-box">{bgColor}</div>
        </div>

        {/* CUSTOMIZE MESSAGE */}
        <div className="setting-card">
          <div className="setting-title">Customize Message</div>

          <div className="message-row">
            <input value={msg1} onChange={(e) => setMsg1(e.target.value)} />
            <img src="/images/edit.png" className="edit-icon" />
          </div>

          <div className="message-row">
            <input value={msg2} onChange={(e) => setMsg2(e.target.value)} />
            <img src="/images/edit.png" className="edit-icon" />
          </div>
        </div>

        {/* INTRO FORM CARD */}
        <div className="setting-card">
          <div className="setting-title">Introduction Form</div>

          <label>Your name</label>
          <input
            className="input-line"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Your Phone</label>
          <input
            className="input-line"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label>Your Email</label>
          <input
            className="input-line"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="intro-btn full">Thank You!</button>
        </div>

        {/* WELCOME MESSAGE CARD */}
        <div className="setting-card">
          <div className="setting-title-row">
            <span className="setting-title">Welcome Message</span>
            <span className="char-count">15/50</span>
          </div>

          <div className="welcome-row">
            <img src="/images/icon.png" className="welcome-avatar" />
            <p className="welcome-text">
              👋 Want to chat about Hubly? I'm an chatbot here to help you find
              your way.
            </p>
            <img src="/images/edit.png" className="edit-small" />
          </div>
        </div>

        {/* MISSED CHAT TIMER */}
        <div className="setting-card">
          <div className="setting-title">Missed chat timer</div>

          <div className="timer-box">
            <div className="timer-row">
              <span>12</span>
              <span>09</span>
              <span>59</span>
            </div>
            <div className="timer-row mid">
              <span>00</span>
              <span>10</span>
              <span>00</span>
            </div>
            <div className="timer-row">
              <span>01</span>
              <span>11</span>
              <span>01</span>
            </div>
          </div>

          <button className="save-btn">Save</button>
        </div>
      </div>
    </div>
  );
}
