import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import IntroAnimation from "../IntroAnimation.jsx";

export default function HomePage() {
  const [introCompleted, setIntroCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState('trending');


  const navigate = useNavigate();

  // Refs for scroll animation
  const featuresRef = useRef(null);
  const contentRef = useRef(null);
  const ctaRef = useRef(null);

  const handleAnimationComplete = () => {
    setIntroCompleted(true);
    console.log("Animation completed and redirected to explore");
  };

  // Scroll animation effect
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe elements
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (contentRef.current) observer.observe(contentRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => observer.disconnect();
  }, [introCompleted]);

  const featuredItems = [
    {
      id: 1,
      title: "GPT-4 Vision API Integration",
      author: "sarah_dev",
      type: "Repository",
      tags: ["AI", "OpenAI", "React"],
      likes: 234,
      image: "🤖"
    },
    {
      id: 2,
      title: "Minimalist Chat UI Component",
      author: "alex_codes",
      type: "Code",
      tags: ["UI", "React", "TypeScript"],
      likes: 189,
      image: "💬"
    },
    {
      id: 3,
      title: "BERT Sentiment Analysis Model",
      author: "ml_enthusiast",
      type: "Model",
      tags: ["NLP", "HuggingFace", "BERT"],
      likes: 156,
      image: "🧠"
    }
  ];

  return (
    <>
      {introCompleted ? (
        <div className="homepage-container">
          {/* Hero Section */}
          <div className="hero-section">
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="hero-title">
                  Model<span className="hero-accent">Bay</span>
                </h1>
                <p className="hero-description">
                  Where innovation meets collaboration. Discover groundbreaking AI models, 
                  elegant code solutions, and connect with the minds shaping tomorrow's technology.
                </p>
                <div className="hero-buttons">
                  <button 
                    className="btn-primary"
                    onClick={() => navigate('/explore')}
                  >
                    EXPLORE
                  </button>
                  <button className="btn-secondary">
                    JOIN COMMUNITY
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* What ModelBay Does */}
          <div className="section-container">
            <div className="section-header scroll-fade-in" ref={featuresRef}>
              <h2 className="section-title">What we do</h2>
              <p className="section-subtitle">
                ModelBay is where developers, researchers, and innovators converge to showcase 
                breakthrough technologies and discover the next generation of digital solutions.
              </p>
            </div>

            <div className="features-grid">
              <div className="feature-card scroll-slide-left">
                <div className="feature-icon">⚡</div>
                <h3 className="feature-title">AI Models</h3>
                <p className="feature-description">
                  Cutting-edge machine learning models, neural networks, and AI solutions 
                  pushing the boundaries of what's possible.
                </p>
              </div>
              
              <div className="feature-card scroll-fade-in">
                <div className="feature-icon">⚙️</div>
                <h3 className="feature-title">Code Excellence</h3>
                <p className="feature-description">
                  Elegant repositories, innovative frameworks, and development tools 
                  that elevate the craft of programming.
                </p>
              </div>
              
              <div className="feature-card scroll-slide-right">
                <div className="feature-icon">🌐</div>
                <h3 className="feature-title">Community</h3>
                <p className="feature-description">
                  Connect with visionaries, collaborate on projects, and be part of 
                  the community defining the future of technology.
                </p>
              </div>
            </div>
          </div>

          {/* Content Tabs */}
          <div className="section-container">
            <div className="tabs-container">
              <button
                onClick={() => setActiveTab('trending')}
                className={`tab-button ${activeTab === 'trending' ? 'tab-active' : 'tab-inactive'}`}
              >
                TRENDING
              </button>
              <button
                onClick={() => setActiveTab('recent')}
                className={`tab-button ${activeTab === 'recent' ? 'tab-active' : 'tab-inactive'}`}
              >
                RECENT
              </button>
              <button
                onClick={() => setActiveTab('featured')}
                className={`tab-button ${activeTab === 'featured' ? 'tab-active' : 'tab-inactive'}`}
              >
                FEATURED
              </button>
            </div>

            {/* Content Grid */}
            <div className="content-grid scroll-fade-in" ref={contentRef}>
              {featuredItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="content-card"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="card-header">
                    <div className="card-icon">{item.image}</div>
                    <div>
                      <h3 className="card-title">{item.title}</h3>
                      <p className="card-author">@{item.author}</p>
                    </div>
                  </div>
                  
                  <div className="card-tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="card-footer">
                    <span className="type-badge">
                      {item.type}
                    </span>
                    <div className="likes-container">
                      <span className="heart">♡</span>
                      <span className="likes-count">{item.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="view-all-container">
              <button 
                className="btn-dark"
                onClick={() => navigate('/explore')}
              >
                VIEW ALL PROJECTS
              </button>
            </div>
          </div>

          {/* CTA Section */}
          <div className="cta-section">
            <div className="cta-content scroll-fade-in" ref={ctaRef}>
              <h2 className="cta-title">Ready to innovate?</h2>
              <p className="cta-description">
                Join thousands of creators sharing breakthrough technologies, revolutionary ideas, 
                and the code that powers tomorrow's digital landscape.
              </p>
              <button className="btn-primary">
                START CREATING
              </button>
            </div>
          </div>
        </div>
      ) : (
        <IntroAnimation onComplete={handleAnimationComplete} />
      )}
    </>
  );
}
