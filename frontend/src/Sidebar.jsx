import React from "react";
import { Icon } from "@iconify/react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top-section">
        <div className="logo23">
          <img src="/images/8.png" alt="logo" />
        </div>

        <div className="nav-links">
          <NavLink className="sidebar-link" to="/dashboard">
            <Icon
              icon="material-symbols-light:home-outline-rounded"
              width="30"
              height="30"
              className="icon"
            />
            <span className="label">Dashboard</span>
          </NavLink>

          <NavLink className="sidebar-link" to="/contactcenter/2023-00123">
            <Icon
              icon="bitcoin-icons:message-outline"
              width="28"
              height="28"
              className="icon"
            />
            <span className="label">Contact Center</span>
          </NavLink>

          <NavLink className="sidebar-link" to="/analytics">
            <Icon
              icon="uim:analytics"
              width="28"
              height="28"
              className="icon"
            />
            <span className="label">Analytics</span>
          </NavLink>

          <NavLink className="sidebar-link" to="/chatbot">
            <Icon
              icon="fluent:bot-16-regular"
              width="28"
              height="28"
              className="icon"
            />
            <span className="label">Chatbot</span>
          </NavLink>

          <NavLink className="sidebar-link" to="/teams">
            <Icon icon="ri:team-fill" width="28" height="28" className="icon" />
            <span className="label">Teams</span>
          </NavLink>

          <NavLink className="sidebar-link" to="/settings">
            <Icon
              icon="ion:settings-outline"
              width="28"
              height="28"
              className="icon"
            />
            <span className="label">Settings</span>
          </NavLink>
        </div>
      </div>
      <div className="bottom-section">
        <img src="/images/7.png" className="profile-icon" />
      </div>
    </div>
  );
};

export default Sidebar;
