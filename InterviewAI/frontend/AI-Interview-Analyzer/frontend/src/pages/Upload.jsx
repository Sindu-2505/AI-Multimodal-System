import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Upload.css";

function Upload() {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const analyzeVideo = async () => {

    if (!file) {
      alert("Please upload an interview video first!");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://127.0.0.1:8000/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const backendResult = response.data;

      const result = {

        emotion: backendResult.emotion.score,

        gaze: backendResult.gaze.score,

        speech: backendResult.audio.speech_score,

        overall: backendResult.overall_score,

        emotionFeedback: backendResult.emotion.feedback,

        gazeFeedback: backendResult.gaze.feedback,

        speechFeedback: backendResult.audio.feedback,

        performance: backendResult.performance,

        fileName: file.name,

        fileSize: (file.size / (1024 * 1024)).toFixed(2),

        dateTime: new Date().toLocaleString(),

      };

      localStorage.setItem(
        "result",
        JSON.stringify(result)
      );

      navigate("/loading");

    } catch (error) {

      console.log(error);

      alert("Backend is not running!");

      setLoading(false);

    }

  };

  return (

    <div className="upload-page">

      <div className="upload-card">

        <div className="upload-icon">
          🎥
        </div>

        <h1>Upload Interview Video</h1>

        <p>
          Upload your interview recording for
          AI-powered candidate evaluation.
        </p>

        <div className="upload-box">
          <input
            type="file"
            accept="video/*"
            id="video-upload"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label
            htmlFor="video-upload"
            className="upload-label"
          >
            <h2>Drag & Drop Video</h2>

            <p>or click to browse</p>

            <span>
              Supported formats: MP4 • AVI • MOV
            </span>
          </label>
        </div>

        {file && (

          <div className="selected-file">

            <h3>✅ Video Selected</h3>

            <p>{file.name}</p>

            <p>{(file.size / (1024 * 1024)).toFixed(2)} MB</p>

          </div>

        )}

        <div className="features">

          <div className="feature">
            😊 Emotion Detection
          </div>

          <div className="feature">
            👀 Eye Contact
          </div>

          <div className="feature">
            🎤 Speech Analysis
          </div>

          <div className="feature">
            📊 Overall Score
          </div>

        </div>

        <button
          disabled={loading}
          onClick={analyzeVideo}
        >
          {loading ? "Analyzing..." : "Analyze Interview →"}
        </button>

      </div>

    </div>

  );

}

export default Upload;