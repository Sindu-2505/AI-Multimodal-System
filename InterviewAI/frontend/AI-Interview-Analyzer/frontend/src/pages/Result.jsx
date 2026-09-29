import { useNavigate } from "react-router-dom";
import "../styles/Result.css";

function Result() {

  const navigate = useNavigate();

  const result = JSON.parse(
    localStorage.getItem("result")
  );

  if (!result) {
    return (
      <div className="result-page">
        <h1>No Report Found</h1>
      </div>
    );
  }

  const getColor = (score) => {
    if (score >= 80) return "#22c55e";
    if (score >= 60) return "#f59e0b";
    return "#ef4444";
  };

  const downloadReport = () => {

    const reportText = `
AI INTERVIEW ANALYSIS REPORT

Generated On:
${result.dateTime}

====================================

Emotion Score: ${result.emotion}%

Feedback:
${result.emotionFeedback}

====================================

Eye Contact Score: ${result.gaze}%

Feedback:
${result.gazeFeedback}

====================================

Speech Score: ${result.speech}%

Feedback:
${result.speechFeedback}

====================================

Overall Score: ${result.overall}%

Performance:
${result.performance}

====================================

AI Suggestions:

• Maintain eye contact throughout the interview.

• Speak clearly and confidently.

• Keep a calm and positive facial expression.

• Avoid looking away frequently.

• Practice mock interviews regularly.

====================================
`;

    const blob = new Blob(
      [reportText],
      { type: "text/plain" }
    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "Interview_Report.txt";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  return (

    <div className="result-page">

      <div className="header">

        <h1>
          📊 AI Interview Analysis Report
        </h1>

        <p>
          Generated on {result.dateTime}
        </p>

        <div className="performance">
          🏆 Performance:
          <span>
            {result.performance}
          </span>
        </div>

      </div>

      <div className="score-grid">

        <div className="score-card">

          <div className="icon">😊</div>

          <h3>Emotion</h3>

          <h2>{result.emotion}%</h2>

          <div className="bar">
            <div
              className="fill"
              style={{
                width: `${result.emotion}%`,
                background: getColor(result.emotion)
              }}
            ></div>
          </div>

        </div>


        <div className="score-card">

          <div className="icon">👀</div>

          <h3>Eye Contact</h3>

          <h2>{result.gaze}%</h2>

          <div className="bar">
            <div
              className="fill"
              style={{
                width: `${result.gaze}%`,
                background: getColor(result.gaze)
              }}
            ></div>
          </div>

        </div>


        <div className="score-card">

          <div className="icon">🎤</div>

          <h3>Speech</h3>

          <h2>{result.speech}%</h2>

          <div className="bar">
            <div
              className="fill"
              style={{
                width: `${result.speech}%`,
                background: getColor(result.speech)
              }}
            ></div>
          </div>

        </div>


        <div className="score-card">

          <div className="icon">⭐</div>

          <h3>Overall</h3>

          <h2>{result.overall}%</h2>

          <div className="bar">
            <div
              className="fill"
              style={{
                width: `${result.overall}%`,
                background: getColor(result.overall)
              }}
            ></div>
          </div>

        </div>

      </div>


      <div className="feedback-card">

        <h2>🤖 AI Feedback</h2>

        <div className="feedback-box">

          <h4>😊 Emotion Analysis</h4>

          <p>
            {result.emotionFeedback}
          </p>

        </div>

        <div className="feedback-box">

          <h4>👀 Eye Contact Analysis</h4>

          <p>
            {result.gazeFeedback}
          </p>

        </div>

        <div className="feedback-box">

          <h4>🎤 Speech Analysis</h4>

          <p>
            {result.speechFeedback}
          </p>

        </div>

      </div>


      <div className="tips">

        <h2>💡 AI Suggestions</h2>

        <ul>

          <li>
            Maintain eye contact throughout the interview.
          </li>

          <li>
            Speak clearly and confidently.
          </li>

          <li>
            Keep a calm and positive facial expression.
          </li>

          <li>
            Avoid looking away frequently.
          </li>

          <li>
            Practice mock interviews regularly.
          </li>

        </ul>

      </div>


      <div className="buttons">

        <button
          className="download"
          onClick={downloadReport}
        >
          ⬇ Download Report
        </button>

        <button
          className="again"
          onClick={() => navigate("/upload")}
        >
          🔄 Analyze Another Video
        </button>

      </div>

    </div>

  );
}

export default Result;