import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebase";

const GeneralAdminProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = await auth.currentUser.getIdToken();
      try {
        const { data } = await axios.get("http://localhost:5000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(data);
      } catch (error) {
        alert("Error fetching profile: " + error.message);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2>General Admin Profile</h2>
      <p>Name: {profile.name}</p>
      <p>Role: {profile.role}</p>
      <p>Email: {profile.email}</p>
    </div>
  );
};

export default GeneralAdminProfile;
