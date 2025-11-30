import React, { useState, useEffect } from "react";
import "./Setting.css";
import axios from "axios";

const Setting = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id; // always use MongoDB _id!!!

  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${userId}`
        );

        console.log("User data from API:", response.data);

        // backend returns: { user: {...} }
        const userData = response.data?.user;

        if (userData) {
          setFormData({
            id: userData._id,
            firstName: userData.name || "", // your DB field = name
            lastName: userData.lastName || "",
            email: userData.email || "",
            password: "", // NEVER load hashed password!
            confirmPassword: "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const payload = {
        id: formData.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };

      await axios.post(
        `http://localhost:5000/api/user/update/${formData.id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Profile updated successfully");
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="setting-container">
      <p className="page-title">Setting</p>
      <div className="setting-header">
        <h2>Edit Profile</h2>
      </div>

      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="New Password"
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
        </div>

        <div className="save-button-wrapper">
          <button type="submit" className="save-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
