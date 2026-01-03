import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; 
import Submission from "./pages/submission";
import DashboardContent from "./pages/DashboardContent";
import AuthorOverview from './pages/AuthorOverview';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Events from './pages/Events';
import Participant from './pages/Participant';


export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/participant" element={<Participant />} />
            <Route path="/myevent" element={<DashboardContent />} />
            <Route path="/dashboard" element={<AuthorOverview />} />
            <Route path="/submit" element={<Submission />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/cs" element={<App />} />

          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}
