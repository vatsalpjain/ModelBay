import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

// Import page components
import HomePage from "./components/pages/HomePage.jsx";
import SavedPage from "./components/pages/SavedPage.jsx";
import SearchPage from "./components/pages/SearchPage.jsx";
import AboutPage from "./components/pages/AboutPage.jsx";
import ExplorePage from "./components/pages/ExplorePage.jsx";
import TrendingPage from "./components/pages/TrendingPage.jsx";
import ProfilePage from "./components/pages/ProfilePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "home", element: <HomePage /> },
      { path: "saved", element: <SavedPage /> },
      { path: "search", element: <SearchPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "explore", element: <ExplorePage /> },
      { path: "trending", element: <TrendingPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
