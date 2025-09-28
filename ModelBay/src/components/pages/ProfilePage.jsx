import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const { saved } = useOutletContext();
  const [showNewPost, setShowNewPost] = useState(false);

  // Mock user data - you can replace with real data
  const userData = {
    name: "Vatsal Jain",
    photo: "./lock screen wallpaper.jpeg",
    about:
      "Passionate about AI and Machine Learning. Building the future one model at a time.",
    interests: [
      "Machine Learning",
      "Neural Networks",
      "Computer Vision",
      "Data Science",
    ],
    posts: [
      {
        id: 1,
        title: "Understanding ModelBay",
        content: "A deep dive React as noob in frontend...",
        date: "2 days ago",
      },
      {
        id: 2,
        title: "My Journey with ML",
        content: "Started Small but now Gaining Traction...",
        date: "1 week ago",
      },
    ],
  };

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <img
          src={userData.photo}
          alt={userData.name}
          className="profile-photo"
        />
        <div className="profile-info">
          <h1 className="profile-name">{userData.name}</h1>
          <p className="profile-about">{userData.about}</p>
        </div>
      </div>

      {/* Interests Section */}
      <div className="profile-section">
        <h2 className="section-title2">Interests</h2>
        <div className="interests-grid">
          {userData.interests.map((interest, index) => (
            <span key={index} className="interest-tag">
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Posts Section */}
      <div className="profile-section">
        <div className="posts-header">
          <h2 className="section-title2">Posts ({userData.posts.length})</h2>
          <button
            className="new-post-btn"
            onClick={() => setShowNewPost(!showNewPost)}
          >
            {showNewPost ? "Cancel" : "New Post"}
          </button>
        </div>

        {/* Modal Overlay */}
        {showNewPost && (
          <div className="modal-overlay2" onClick={() => setShowNewPost(false)}>
            {/* New Post Form */}
            <div className="new-post-form" onClick={(e) => e.stopPropagation()}>
              <button
                className="close-modal"
                onClick={() => setShowNewPost(false)}
              >
                x
              </button>
              <input
                type="text"
                placeholder="Post title..."
                className="post-input"
              />
              <textarea
                placeholder="What's on your mind?"
                className="post-textarea"
                rows="3"
              />
              <button className="post-submit-btn">Publish Post</button>
            </div>
          </div>
        )}

        {/* Posts List */}
        <div className="posts-list">
          {userData.posts.map((post) => (
            <div key={post.id} className="post-item">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-content">{post.content}</p>
              <span className="post-date">{post.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Items Count */}
      <div className="profile-section">
        <h2 className="section-title2">Saved Items</h2>
        <p className="saved-count">You have {saved.length} saved items</p>
        {saved.length > 0 ? (
          <Link to="/saved" title="Profile">
            <button className="new-post-btn" title="View Saved">
              View Saved Items
            </button>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
