import React from "react";
import { useAuth } from "context/AuthContext";
import "./Profile.css";
import avatar from "../../assets/icons/avatar.jpg";

const Profile = () => {
  const { user, login, logout } = useAuth();
  return (
    <>
      <p className="profileHeader">Hi, Welcome Back!</p>
      <p className="profileHeader2">Your Dashboard</p>
      <div className="proDiv"></div>
      <div className="avatar">
        <img src={avatar} alt="Profile" />
      </div>
      <span>
        <p className="name">{user.name}</p>
        <p className="email">{user.email}</p>
      </span>
      <button className="EditProfile">Edit</button>
    </>
  );
};
export default Profile;
