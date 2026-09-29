import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  return (

    <div className="dashboard">

      <div className="hero">

        <div className="hero-logo">
          🤖
        </div>

        <h1 className="dashboard-title">
          AI Interview Analyzer
        </h1>

        <p className="hero-text">
          Evaluate candidates using Artificial Intelligence through
          Emotion Detection, Eye Contact Tracking and Speech Analysis.
        </p>

      </div>


      <div className="cards">

        <div className="card">
          <div className="icon">😊</div>

          <h2>Emotion Detection</h2>

          <p>
            Detect confidence, stress and facial emotions
            throughout the interview.
          </p>

        </div>


        <div className="card">

          <div className="icon">👀</div>

          <h2>Eye Tracking</h2>

          <p>
            Measure eye contact and attention level
            using AI vision.
          </p>

        </div>


        <div className="card">

          <div className="icon">🎤</div>

          <h2>Speech Analysis</h2>

          <p>
            Analyze speaking confidence,
            clarity and communication.
          </p>

        </div>

      </div>


      <div className="stats">

        <div className="stat">
          <h2>3</h2>
          <p>AI Modules</p>
        </div>

        <div className="stat">
          <h2>100%</h2>
          <p>Automated</p>
        </div>

        <div className="stat">
          <h2>Fast</h2>
          <p>Real-Time</p>
        </div>

      </div>


      <button
        className="start-btn"
        onClick={() => navigate("/upload")}
      >
        🚀 Start New Interview Analysis
      </button>

    </div>

  );

}

export default Dashboard;