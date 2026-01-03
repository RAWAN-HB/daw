// src/pages/SignUp.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { registerUser } from "../api/index"; // make sure this exists in src/api/index.js

export default function SignUp() {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    role: "Participant",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const roles = [
    "Participant",
    "Auteur",
    "Organisateur",
    "Comité Scientifique",
    "Invité",
    "Animateur Workshop",
  ];

  // Update form state on input change
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Call API signup function
      await registerUser(form);

      // Success
      alert("Inscription réussie ! Veuillez vous connecter.");
      navigate("/login"); // Redirect to login page
    } catch (err) {
      console.log(err);
      // Display error message from backend or default
      setError(err.data?.message || "Échec de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Créer un compte</h2>

        <form className="signup-form" onSubmit={handleSubmit}>
          {/* Nom */}
          <div className="form-group">
            <label>Nom</label>
            <input
              type="text"
              name="nom"
              value={form.nom}
              onChange={handleChange}
              placeholder="Votre nom"
              required
            />
          </div>

          {/* Prénom */}
          <div className="form-group">
            <label>Prénom</label>
            <input
              type="text"
              name="prenom"
              value={form.prenom}
              onChange={handleChange}
              placeholder="Votre prénom"
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Votre email"
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Créer un mot de passe"
              required
            />
          </div>

          {/* Role */}
          <div className="form-group">
            <label>Rôle</label>
            <select name="role" value={form.role} onChange={handleChange}>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Submit button */}
          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Inscription..." : "S'inscrire"}
          </button>
        </form>

        {/* Error message */}
        {error && <p className="error-message">{error}</p>}

        {/* Link to login */}
        <div className="signup-login">
          Vous avez déjà un compte ? <Link to="/login">Connexion</Link>
        </div>
      </div>
    </div>
  );
}
