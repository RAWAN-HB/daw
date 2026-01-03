import React from "react";
import { Link } from "react-router-dom";
import "./Participant.css"; // Ton CSS pur

// Icônes simples
const CalendarIcon = () => <span className="icon">📅</span>;
const LocationIcon = () => <span className="icon">📍</span>;
const BellIcon = () => <span className="icon">🔔</span>;
const MessageIcon = () => <span className="icon">✉️</span>;
const LogoutIcon = () => <span className="icon">🚪</span>;
const DownloadIcon = () => <span className="icon">⬇️</span>;
const CheckIcon = () => <span className="icon">✓</span>;

const Participant = () => {
  const user = {
    name: "Ahmed Benali",
    institution: "Université Constantine 2",
    domain: "Informatique Médicale",
  };

  const events = [
    {
      id: 1,
      title: "Congrès National de Santé Numérique 2026",
      date: "15-17 Janvier 2026",
      location: "Constantine, Algérie",
      status: "futur",
      attestationAvailable: false,
    },
    {
      id: 2,
      title: "Workshop Intelligence Artificielle et Imagerie Médicale",
      date: "10-12 Décembre 2025",
      location: "En ligne",
      status: "termine",
      attestationAvailable: true,
    },
    {
      id: 3,
      title: "Journée Scientifique sur l'IA en Médecine",
      date: "20 Janvier 2026",
      location: "Alger",
      status: "futur",
      attestationAvailable: false,
    },
  ];

  const notifications = [
    "Votre attestation pour le workshop du 10-12 Déc. est disponible",
    "Le programme du congrès de janvier 2026 a été mis à jour",
    "Bienvenue dans votre espace participant !",
  ];

  return (
    <div className="min-h-screen">
      {/* Header fixe */}
      <header>
        <div className="container">
          <h1>SciHealth Events</h1>
          <nav>
            <Link to="/evenements">Mes événements</Link>
            <a href="#" className="notification-badge-parent">
              <BellIcon />
              Notifications
              <span className="notification-badge">{notifications.length}</span>
            </a>
            <Link to="/messages">
              <MessageIcon /> Messages
            </Link>
            <div className="user-info">
              <div className="text">
                <p>{user.name}</p>
                <p>{user.institution}</p>
              </div>
              <div className="avatar">{user.name.charAt(0)}</div>
            </div>
            <button className="logout-btn" title="Déconnexion">
              <LogoutIcon />
            </button>
          </nav>
        </div>
      </header>

      {/* Contenu principal */}
      <main>
        <div className="welcome">
          <h2>Bonjour, {user.name.split(" ")[0]} 👋</h2>
          <p>Voici un aperçu de vos événements scientifiques</p>
        </div>

        {/* Message si aucun événement en cours */}
        <div className="current-event placeholder">
          <h3>Aucun événement en cours aujourd'hui</h3>
          <p>Accédez à un événement live dès qu'il commence.</p>
          {/* Lien direct → si non connecté, ProtectedRoute redirige vers /signup */}
          <Link to="/live-event" className="btn-live">
            Accéder à l'événement live (exemple)
          </Link>
        </div>

        {/* Mes événements */}
        <section>
          <h3>Mes événements</h3>
          <div className="events-grid">
            {events.map((event) => (
              <div key={event.id} className="event-card">
                <div className="header-card">
                  <span className={`status-badge status-${event.status}`}>
                    {event.status === "futur" ? "À venir" : "Terminé"}
                  </span>
                  {event.attestationAvailable && <CheckIcon />}
                </div>

                <h4>{event.title}</h4>
                <div className="details">
                  <div>
                    <CalendarIcon /> {event.date}
                  </div>
                  <div>
                    <LocationIcon /> {event.location}
                  </div>
                </div>

                <div className="actions">
                  {/* Lien avec <Link> → pas d'onClick */}
                 <Link to="/evenements" className="btn-live">
  Accéder à l'événement live
</Link>

                  {event.attestationAvailable && (
                    <button className="btn-download">
                      <DownloadIcon /> Attestation
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Notifications */}
        <section>
          <h3>Notifications récentes</h3>
          <div className="notifications">
            {notifications.map((notif, index) => (
              <div key={index} className="notif-item">
                <BellIcon />
                <p>{notif}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Participant;