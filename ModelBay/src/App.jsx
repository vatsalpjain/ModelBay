import "./App.css";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { nanoid } from "nanoid";

import Header from "./components/Header.jsx";
import NavBar from "./components/NavBar.jsx";
import IntroAnimation from "./components/IntroAnimation.jsx";

export default function App() {
  const [expanded, setExpanded] = useState(false);
  const [saved, setSaved] = useState([]);
  const [search, setSearch] = useState("");
  const [showIntro, setShowIntro] = useState(true);

  // Improved function to check if item is saved
  function checkSaved(itemId) {
    if (!itemId) return false;
    return saved.some((savedItem) => savedItem.id === itemId);
  }

  function saveContent(content) {
    // Ensure content has an id
    if (!content.id) {
      content.id = nanoid();
    }
    const existingItem = saved.find((item) => item.id === content.id);

    if (existingItem) {
      // Remove item by id
      setSaved(saved.filter((item) => item.id !== content.id));
    } else {
      setSaved([...saved, content]);
    }
  }

  // Context to pass shared state to page components
  const outletContext = {
    saved,
    checkSaved,
    saveContent,
    search,
    setSearch,
  };

  return (
    <>
      {/* Intro Animation - shows first */}
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}

      {/* Main App - shows after intro */}
      <div
        className={`main_container ${
          showIntro
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-500"
        }`}
      >
        <Header search={search} onSearchChange={setSearch} />
        <div className="main_content_full">
          <NavBar expanded={expanded} setExpanded={setExpanded} />
          <div className="main_content_inner">
            <Outlet context={outletContext} />
          </div>
        </div>
      </div>
    </>
  );
}
