import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import SignInForm from "./SignInForm.jsx";
import { Link } from "react-router-dom";

export default function Header(props) {
  const [signIn, setSignIn] = useState(false);
  const [profileImg, setProfileImg] = useState(false);
  const navigate = useNavigate(); // Add this

  // Add form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.search.trim()) {
      navigate("/search"); // Redirect to search page
    }
  };

  // Add input change handler with timeout
  const handleSearchChange = (value) => {
    props.onSearchChange(value);
    if (value.trim()) {
      navigate("/search");
    }
  };

  function handleOverlayClick() {
    setSignIn(false);
  }
  function validationComplete() {
    setProfileImg(true);
    setSignIn(false);
  }

  return (
    <header className="main_header">
      <div className="header_icon">
        <img src="/ModelBay_Icon.png" alt="Site Logo" />
      </div>
      <div className="flex-1 flex justify-center">
        <form className="search_form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="search_input"
            placeholder="Search..."
            value={props.search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </form>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {profileImg ? (
          <Link to="/home" title="homme">
            <button
              className="SignIn_button"
              onClick={() => setProfileImg(false)}
            >
              Sign Out
            </button>
          </Link>
        ) : (
          <button className="SignIn_button" onClick={() => setSignIn(true)}>
            Sign In
          </button>
        )}

        <button
          className="Profile"
          title="Profile"
          onClick={profileImg ? null : () => setSignIn(true)}
        >
          {profileImg ? (
            <Link to="/profile" title="Profile">
              <img
                src="./lock screen wallpaper.jpeg"
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            </Link>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          )}
        </button>
      </div>
      {signIn && (
        <div className="modal_overlay" onClick={handleOverlayClick}>
          <div onClick={(e) => e.stopPropagation()}>
            <SignInForm
              onClose={handleOverlayClick}
              validationComplete={validationComplete}
            />
          </div>
        </div>
      )}
    </header>
  );
}
