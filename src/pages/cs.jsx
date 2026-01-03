import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./cs.css";


export function CsPage() {
  const [proposals, setProposals] = useState([
    {
      id: 1,
      title: "Recherche IA",
      author: "Alice",
      institution: "Université X",
      submittedDate: "2025-11-30",
      abstract: "Étude sur l'IA et ses applications.",
      status: "pending",
    },
    {
      id: 2,
      title: "Énergie renouvelable",
      author: "Bob",
      institution: "Université Y",
      submittedDate: "2025-11-29",
      abstract: "Projet sur l'énergie solaire.",
      status: "accepted",
      evaluation: {
        proposalId: 2,
        scientificQuality: 8,
        innovation: 7,
        methodology: 9,
        feasibility: 8,
        impact: 7,
        overallScore: 7.8,
        decision: "accepted",
        comments: "Très bon projet",
        evaluatorName: "Dr. John",
        evaluationDate: "2025-11-30",
      },
    },
  ]);

  const [selectedProposal, setSelectedProposal] = useState(null);

  const handleEvaluate = (proposalId) => {
    const p = proposals.find((p) => p.id === proposalId) || null;
    setSelectedProposal(p);
  };

  const handleSubmitEvaluation = (evaluation) => {
    setProposals((prev) =>
      prev.map((p) =>
        p.id === evaluation.proposalId
          ? { ...p, status: evaluation.decision, evaluation }
          : p
      )
    );
    setSelectedProposal(null);
  };

  const handleBack = () => setSelectedProposal(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4">CS / Proposals Dashboard</h1>
        <p className="mb-4">Quick links to other pages in the app:</p>
        <ul className="space-y-2">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/myevent">My Event</Link></li>
          <li><Link to="/participant">Participant</Link></li>
          <li><Link to="/submit">Submit Proposal</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
      </main>
      <Footer />
    </div>
  );
}

export default CsPage;