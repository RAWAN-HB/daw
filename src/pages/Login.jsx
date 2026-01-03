// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { loginUser } from "../api/index"; // make sure login is exported from api/index.js

export default function loginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await login(formData.email, formData.password);

      // Save token in localStorage
      localStorage.setItem("token", data.token);

      alert("Login Successful!");
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      console.log(err);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="neon-lines">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="neon-line" style={{ animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>

      <div className="floor-glow"></div>

      <div className="login-box">
        <h2 className="login-title">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              name="email"
              className="input-field"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              name="password"
              className="input-field"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <span className="register-text">Forgot password?</span>
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="register-link">
          Don't have an account? <Link to="/signup" className="register-text">Register</Link>
        </p>
      </div>
    </div>
  );
}
