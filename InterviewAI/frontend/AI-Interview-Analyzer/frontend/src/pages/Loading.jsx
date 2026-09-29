import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Loading.css";

function Loading() {

  const navigate = useNavigate();

  const steps = [
    "Uploading Interview Video...",
    "Detecting Candidate Face...",
    "Analyzing Facial Emotions...",
    "Tracking Eye Contact...",
    "Analyzing Speech Confidence...",
    "Generating AI Report..."
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentStep((prev) => {

        if (prev < steps.length - 1) {
          return prev + 1;
        }

        clearInterval(interval);

        return prev;

      });

    }, 700);

    const timer = setTimeout(() => {

      navigate("/result");

    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };

  }, []);

  return (

    <div className="loading-page">

      <div className="loading-card">

        <div className="robot">
          🤖
        </div>

        <h1>AI Interview Analyzer</h1>

        <p>Please wait while our AI evaluates the interview.</p>

        <div className="spinner"></div>

        <div className="progress-bar">

          <div className="progress-fill"></div>

        </div>

        <h3 className="status">
          {steps[currentStep]}
        </h3>

        <div className="checklist">

          {steps.map((item, index) => (

            <div
              key={index}
              className={
                index <= currentStep
                  ? "done"
                  : "pending"
              }
            >
              {index <= currentStep ? "✔" : "○"} {item}
            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default Loading;