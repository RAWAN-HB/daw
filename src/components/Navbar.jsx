import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import logo from "../images/logo.jpg";

function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo + Title */}
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-img" />
        <div>University of Constantine 2
         <div className="event-subject">| Science & Technology Forum 🧬</div>
           </div> 
     
      </div>

      {/* Navigation Links */}
      <ul className="nav-links">
        <li><Link to="/">Home 🏠</Link></li>
        <li><Link to="/events">Events📅 </Link></li>
        <li><Link to="/myevent">My Event</Link></li>
        <li><Link to="/participant">Participant</Link></li>

        {/* Use Link instead of <a> whenever possible */}
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/contact">Contact👤</Link></li>

        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
