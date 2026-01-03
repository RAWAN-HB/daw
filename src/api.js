// src/api.js
import axios from "axios";

const API_BASE = "https://v-nement-scientifique.onrender.com/api-docs/#/ocalhost:5000"; // your backend URL

// For authenticated requests, store token in localStorage
const token = localStorage.getItem("token");

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  },
});
