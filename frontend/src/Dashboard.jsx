import React, { useState } from "react";
import "./Dashboard.css";
import avatarImg from "/images/img.png";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // ---------- Dummy Ticket Data ----------
  const tickets = [
    {
      id: "2023-00123",
      msg: "Hey!",
      name: "John Snow",
      phone: "+91-0000000000",
      email: "example@gmail.com",
      time: "10:00",
      postedAt: "12:45 AM",
      status: "unresolved",
    },
  ];

  // ---------- Tabs State ----------
  const [activeTab, setActiveTab] = useState("all");

  // ---------- Filter Tickets ----------
  const filteredTickets =
    activeTab === "all"
      ? tickets
      : tickets.filter((ticket) => ticket.status === activeTab);

  return (
    <div className="dashboard">
      <h1 className="db-title">Dashboard</h1>

      <div className="db-search-box">
        <input
          type="text"
          placeholder="Search for ticket"
          className="db-search-input"
        />
      </div>

      {/* ---------- FILTER TABS ---------- */}
      <div className="db-tabs">
        <button
          className={`db-tab ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          All Tickets
        </button>

        <button
          className={`db-tab ${activeTab === "resolved" ? "active" : ""}`}
          onClick={() => setActiveTab("resolved")}
        >
          Resolved
        </button>

        <button
          className={`db-tab ${activeTab === "unresolved" ? "active" : ""}`}
          onClick={() => setActiveTab("unresolved")}
        >
          Unresolved
        </button>
      </div>

      {/* ---------- TICKETS LIST ---------- */}
      {filteredTickets.map((ticket) => (
        <div className="db-card" key={ticket.id}>
          <div className="db-card-header">
            <div>
              <div className="db-card-title-row">
                <span
                  className="db-status-dot"
                  style={{
                    background:
                      ticket.status === "resolved" ? "green" : "orange",
                  }}
                ></span>

                <span className="db-ticket-id">Ticket# {ticket.id}</span>
              </div>
              <p className="db-ticket-msg">{ticket.msg}</p>
            </div>

            <div className="db-card-time">
              <p className="posted-at">Posted at {ticket.postedAt}</p>
              <h3 className="posted-time">{ticket.time}</h3>
            </div>
          </div>

          <hr className="db-divider" />

          <div className="db-card-footer">
            <div className="db-user-info">
              <img src={avatarImg} alt="" className="db-user-avatar" />
              <div>
                <p className="db-user-name">{ticket.name}</p>
                <p className="db-user-phone">{ticket.phone}</p>
                <p className="db-user-email">{ticket.email}</p>
              </div>
            </div>

            {/* Open Ticket → goes to correct Contact Center route */}
            <button
              className="db-open-ticket"
              onClick={() => navigate(`/contactcenter/${ticket.id}`)}
            >
              Open Ticket
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
