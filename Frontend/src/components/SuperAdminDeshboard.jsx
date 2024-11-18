import React, { useState } from "react";
import axios from "axios";
import { auth } from "../firebase";

const SuperAdminDashboard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAddAdmin = async () => {
    const token = await auth.currentUser.getIdToken();
    try {
      await axios.post(
        "http://localhost:5000/add-admin",
        { email, password, role: "general-admin" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Admin added successfully");
    } catch (error) {
      alert("Error adding admin: " + error.message);
    }
  };

  return (
    <div>
      <h2>Super Admin Dashboard</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleAddAdmin}>Add Admin</button>
    </div>
  );
};

export default SuperAdminDashboard;
