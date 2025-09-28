// components/IntroAnimation.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function IntroAnimation({ onComplete }) {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      // Automatically redirect to explore page after animation
      navigate("/home");
      // Call onComplete callback if provided
      if (onComplete) {
        onComplete();
      }
    }, 3000); // 3 seconds total

    return () => clearTimeout(timer);
  }, [navigate, onComplete]);

  if (!show) return null;

  return (
    <div className="intro-splash">
      <div className="intro-logo">
        <h1>ModelBay</h1>
      </div>
    </div>
  );
}


