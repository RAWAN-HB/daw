// src/api/index.js
import axios from "axios";

// ==========================
// Base Axios instance
// ==========================
const API_BASE_URL = "https://v-nement-scientifique.onrender.com"; // your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ==========================
// Axios Interceptor (ADD TOKEN)
// ==========================
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// ==========================
// Auth API
// ==========================
export const loginUser = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

// ==========================
// Proposals API
// ==========================
export const getMyProposals = async () => {
  const response = await api.get("/cfp/my-proposals");
  return response.data;
};

export const submitProposal = async (data) => {
  const response = await api.post("/cfp/submit", data);
  return response.data;
};

// ==========================
// Evaluations API
// ==========================
export const getAssignedEvaluations = async () => {
  const response = await api.get("/evaluations/assigned");
  return response.data;
};

// ==========================
// Files API
// ==========================
export const getProposalFiles = async (proposalId) => {
  const response = await api.get(`/cfp/${proposalId}/files`);
  return response.data;
};

export const uploadFile = async (proposalId, formData) => {
  const response = await api.post(
    `/cfp/${proposalId}/upload-file`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
};

export const deleteFile = async (fileId) => {
  const response = await api.delete(`/files/${fileId}`);
  return response.data;
};

export const downloadFile = async (fileId) => {
  const response = await api.get(`/files/${fileId}`, {
    responseType: "blob",
  });
  return response.data;
};
