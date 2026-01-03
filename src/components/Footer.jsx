import React from "react";
import "./Footer.css";
import logo from "../images/logo.jpg";
import facebookImg from "../images/facebook1.jpg";
import twitterImg from "../images/tweter.jpg";
import instagramImg from "../images/instagram.jpg";
import linkedinImg from "../images/linkedin.jpg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Top Section: Logo + Description + Links */}
        <div className="footer-top">
          
          {/* Logo and short description */}
          <div className="footer-logo">
            <img src={logo} alt="Université Constantine 2" />
            <p className="footer-desc">
              Official platform of the University of Constantine 2 for the management and promotion of scientific events.
            </p>

            {/* Event/University Description */}
            <p className="footer-event-desc">
              The University of Constantine 2 – Abdelhamid Mehri recently hosted a vibrant cultural and academic event that brought together students, professors, and guests from various fields. The program featured inspiring lectures, artistic performances, and interactive workshops, all aimed at celebrating creativity, knowledge exchange, and community spirit. It was a lively occasion that reflected the university’s commitment to fostering innovation while honoring Algeria’s rich cultural heritage.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links-container">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/events">Events</a></li>
              <li><a href="/signup">Sign Up</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h4>Contact</h4>
            <p>Email: contact@univ-constantine2.dz</p>
            <p>Phone: +213 31 00 00 00</p>
            <p>Address: University Street, Constantine, Algeria</p>
          </div>

          {/* Social Media */}
          <div className="footer-social">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="#"><img src={facebookImg} alt="Facebook" /></a>
              <a href="#"><img src={twitterImg} alt="Twitter" /></a>
              <a href="#"><img src={instagramImg} alt="Instagram" /></a>
              <a href="#"><img src={linkedinImg} alt="LinkedIn" /></a>
            </div>
          </div>

        </div>

        {/* Bottom Section: Copyright */}
        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} University of Constantine 2. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
