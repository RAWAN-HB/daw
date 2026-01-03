import { useState, useEffect } from "react";
import { Save, Send } from "lucide-react";
import { getMyProposals, submitProposal } from "../api/index"; // <-- correct path
import "./submission.css";


export default function SubmissionForm() {
  const [formData, setFormData] = useState({
    title: "",
    type: "orale",
    theme: "",
    abstract: "",
    keywords: "",
    coAuthors: "",
  });

  const [myProposals, setMyProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Load existing proposals on mount
  useEffect(() => {
    async function fetchProposals() {
      try {
        const res = await getMyProposals();
        setMyProposals(res.data); // adjust if API response is { data: [...] }
      } catch (err) {
        console.error("Failed to load proposals:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProposals();
  }, []);

  const handleSubmit = async (e, isDraft) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await submitProposal({ ...formData, draft: isDraft });
      alert(isDraft ? "Draft saved!" : "Proposal submitted successfully!");
      // refresh proposals list
      const res = await getMyProposals();
      setMyProposals(res.data);
      // reset form if submitted (not draft)
      if (!isDraft) {
        setFormData({
          title: "",
          type: "orale",
          theme: "",
          abstract: "",
          keywords: "",
          coAuthors: "",
        });
      }
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Failed to submit proposal. Check console for details.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading your proposals...</p>;

  return (
    <div className="submission-container">
      <div className="submission-card">
        <div className="submission-header">
          <h2>Submit a Presentation Proposal</h2>
          <p>Fill out the form below to submit your proposal</p>
        </div>

        <form className="submission-form">
          {/* Title */}
          <div className="form-group">
            <label>
              Presentation Title <span>*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter the title of your presentation"
              required
            />
          </div>

          {/* Type */}
          <div className="form-group">
            <label>
              Presentation Type <span>*</span>
            </label>
            <div className="type-grid">
              {[
                { value: "orale", label: "Oral Presentation", icon: "🎤" },
                { value: "affichée", label: "Poster Presentation", icon: "📋" },
                { value: "poster", label: "Poster", icon: "🖼️" },
              ].map((type) => (
                <label
                  key={type.value}
                  className={`type-card ${
                    formData.type === type.value ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value={type.value}
                    checked={formData.type === type.value}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                  />
                  <span className="icon">{type.icon}</span>
                  <span>{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div className="form-group">
            <label>
              Theme <span>*</span>
            </label>
            <select
              value={formData.theme}
              onChange={(e) =>
                setFormData({ ...formData, theme: e.target.value })
              }
              required
            >
              <option value="">Select a theme</option>
              <option value="ia">Artificial Intelligence</option>
              <option value="ml">Machine Learning</option>
              <option value="data">Data Science</option>
              <option value="cybersec">Cybersecurity</option>
              <option value="iot">Internet of Things</option>
              <option value="blockchain">Blockchain</option>
            </select>
          </div>

          {/* Abstract */}
          <div className="form-group">
            <label>
              Abstract <span>*</span>
            </label>
            <textarea
              rows="8"
              value={formData.abstract}
              onChange={(e) =>
                setFormData({ ...formData, abstract: e.target.value })
              }
              required
            />
            <div className="helper">
              <span>{formData.abstract.length} characters</span>
              <span>Recommended: 250–300 words</span>
            </div>
          </div>

          {/* Keywords */}
          <div className="form-group">
            <label>
              Keywords <span>*</span>
            </label>
            <input
              type="text"
              value={formData.keywords}
              onChange={(e) =>
                setFormData({ ...formData, keywords: e.target.value })
              }
              required
            />
          </div>

          {/* Co-authors */}
          <div className="form-group">
            <label>Co-authors (optional)</label>
            <textarea
              rows="4"
              value={formData.coAuthors}
              onChange={(e) =>
                setFormData({ ...formData, coAuthors: e.target.value })
              }
            />
          </div>

          {/* Info */}
          <div className="info-box">
            <strong>ℹ️ Important Information:</strong> All proposals
            will be evaluated by the scientific committee.
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="btn secondary"
              disabled={submitting}
              onClick={(e) => handleSubmit(e, true)}
            >
              <Save size={18} /> Save Draft
            </button>
            <button
              type="submit"
              className="btn primary"
              disabled={submitting}
              onClick={(e) => handleSubmit(e, false)}
            >
              <Send size={18} /> Submit
            </button>
          </div>
        </form>

        {/* List of my proposals */}
        <div className="my-proposals">
          <h3>My Proposals</h3>
          {myProposals.length === 0 ? (
            <p>No proposals submitted yet.</p>
          ) : (
            <ul>
              {myProposals.map((p) => (
                <li key={p._id || p.id}>
                  <strong>{p.title}</strong> — {p.type} — Status: {p.status}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
