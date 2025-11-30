import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Contactcenter.css";
import avatarImg from "/images/img.png";
import { useTeam } from "./Teamcontext";

const ContactCenter = () => {
  const { ticketId } = useParams();
  const { team } = useTeam(); // <-- FIXED HERE

  // Dummy tickets
  const tickets = [
    {
      id: "2023-00123",
      chatPreview: "I have a question",
      customer: {
        name: "John Snow",
        phone: "+91-0000000000",
        email: "example@gmail.com",
        avatar: avatarImg,
      },
      messages: [
        {
          sender: "customer",
          name: "John Snow",
          avatar: avatarImg,
          text: "I have a question",
          date: "March 7, 2025",
        },
      ],
      status: "unresolved",
    },
  ];

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedTeammate, setSelectedTeammate] = useState(null);
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);

  useEffect(() => {
    const t = tickets.find((x) => x.id === ticketId);
    setSelectedTicket(t);
  }, [ticketId]);

  if (!selectedTicket) return <h2>Ticket not found</h2>;

  return (
    <div className="cc-container">
      
      {/* LEFT SIDEBAR */}
      <div className="cc-left">
        <h2 className="cc-title">Contact Center</h2>
        <h3 className="cc-chats-title">Chats</h3>

        <div className="cc-chat-list">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className={`cc-chat-item ${
                ticket.id === selectedTicket.id ? "active" : ""
              }`}
              onClick={() => setSelectedTicket(ticket)}
            >
              <img src={ticket.customer.avatar} className="cc-avatar" />
              <div>
                <p className="cc-chat-name">Chat {ticket.id}</p>
                <p className="cc-chat-msg">{ticket.chatPreview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MIDDLE SECTION */}
      <div className="cc-middle">
        <div className="cc-ticket-header">
          <h2>Ticket# {selectedTicket.id}</h2>
        </div>

        <div className="cc-messages">
          {selectedTicket.messages.map((msg, index) => (
            <div key={index} className="cc-message-block">
              <p className="cc-date">{msg.date}</p>
              <div className="cc-msg-item">
                <img src={msg.avatar} className="cc-avatar" />
                <div>
                  <p className="cc-msg-name">{msg.name}</p>
                  <p className="cc-msg-text">{msg.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="cc-input-box">
          <input type="text" placeholder="type here" className="cc-input" />
          <button className="cc-send-btn">➤</button>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="cc-right">
        <div className="cc-right-header">
          <img src={selectedTicket.customer.avatar} className="cc-avatar-large" />
          <p className="cc-right-title">{selectedTicket.customer.name}</p>
        </div>

        <h3>Details</h3>

        <input className="cc-field" value={selectedTicket.customer.name} readOnly />
        <input className="cc-field" value={selectedTicket.customer.phone} readOnly />
        <input className="cc-field" value={selectedTicket.customer.email} readOnly />

        {/* TEAMMATES */}
        <h3>Teammates</h3>
        <div
          className="cc-team-select"
          onClick={() => setShowTeamDropdown(!showTeamDropdown)}
        >
          {selectedTeammate ? (
            <div className="cc-team-selected">
              <img src={selectedTeammate.avatar} className="cc-team-avatar" />
              <span>{selectedTeammate.name}</span>
            </div>
          ) : (
            <span>Select teammate</span>
          )}
        </div>

        {showTeamDropdown && (
          <div className="cc-team-dropdown">
            {team.map((member) => (
              <div
                key={member.id}
                className="cc-team-option"
                onClick={() => {
                  setSelectedTeammate(member);
                  setShowTeamDropdown(false);
                }}
              >
                <img src={member.avatar} className="cc-team-avatar" />
                <span>{member.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* TICKET STATUS */}
        <h3>Ticket Status</h3>
        <select className="cc-dropdown">
          <option>Unresolved</option>
          <option>Resolved</option>
        </select>
      </div>
    </div>
  );
};

export default ContactCenter;
