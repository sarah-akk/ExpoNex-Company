/* eslint-disable prettier/prettier */
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.modules.css"
import logo from "../../assets/logos/logo.png";
import avatar from "../../assets/icons/avatar.jpg";
import { UilSearch, UilSignOutAlt } from "@iconscout/react-unicons";
import { SideBarData } from "../../data/sideBarDara";
import { useLocation } from 'react-router-dom';

const Navbar = () => {

  const [selected, setSelected] = useState(0);
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      <nav className="topbar">
        <h1>{SideBarData[selected].heading}</h1>
        <div className="search-container">
          <input type="text" placeholder="Search..." />
          <UilSearch className="search-icon" />
        </div>
        <div className="profile-container">
          <i className="material-icons">{"settings"}</i>
          <i className="material-icons">{"notifications"}</i>
          <NavLink to="/dashboard/logout">
            <UilSignOutAlt className="logout-icon" />
          </NavLink>
        </div>
      </nav>
      <nav className="sidebar">
        <img src={logo} alt="Your Image" className="logo3" />
        <div className="line2"></div>
        <ul className="menu">
          {SideBarData.map((item, index) => (
            <li key={index} className={pathname.includes(item.link) ? "menuItem active" : "menuItem"}>
              <NavLink to={item.link} onClick={() => setSelected(index)}>
                <item.icon />
                <span>{"   " + item.heading}</span>
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/dashboard/logout">
              <span className="menuItem">
                <UilSignOutAlt />
              </span>
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
