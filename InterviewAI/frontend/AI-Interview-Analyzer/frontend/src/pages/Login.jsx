import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    if (username.trim() === "" || password.trim() === "") {
      alert("Please enter Username and Password");
      return;
    }

    if (rememberMe) {
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("username");
    }

    navigate("/dashboard");
  };

  return (
    <div className="login-container">

      <div className="background-circle circle1"></div>
      <div className="background-circle circle2"></div>

      <div className="login-card">

        <div className="logo-circle">
          AI
        </div>

        <h1 className="title">
          AI Interview Analyzer
        </h1>

        <p className="subtitle">
          Smart Candidate Assessment Platform
        </p>

        <div className="input-group">
          <label>Username</label>

          <input
            type="text"
            autoComplete="off"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>

          <div className="password-box">

            <input
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </span>

          </div>
        </div>

        <div className="login-options">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Remember Me
          </label>
        </div>

        <button
          className="login-btn"
          onClick={handleLogin}
        >
          Sign In
        </button>

        <div className="divider">
          <span>AI Features</span>
        </div>

        <div className="features">

          <div className="feature-card">
            <div className="feature-icon">😊</div>
            <h3>Emotion Analysis</h3>
            <p>
              Detect confidence, stress and emotions
              during interviews.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">👀</div>
            <h3>Eye Contact</h3>
            <p>
              Analyze attention and eye movement
              throughout the interview.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎤</div>
            <h3>Speech Analysis</h3>
            <p>
              Evaluate voice confidence, speaking
              quality and clarity.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Performance Score</h3>
            <p>
              Receive an AI-generated interview
              performance report.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;