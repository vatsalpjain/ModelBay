import { Link, useLocation } from "react-router-dom";

export default function NavBar({ expanded, setExpanded }) {
  const location = useLocation();

  // Map page numbers to routes
  const getRouteFromPageNo = (pageNo) => {
    switch(pageNo) {
      case 100: return "/explore"; // Home/Explore
      case 10: return "/trending"; // Trending -> Categories
      case 20: return "/saved"; // Saved
      case 30: return "/about"; // About Us (you'll need to add this route)
      default: return "/";
    }
  };

  // Check if current route is active
  const isRouteActive = (pageNo) => {
    const targetRoute = getRouteFromPageNo(pageNo);
    return location.pathname === targetRoute;
  };

  return (
    <nav
      className={`navbar_side ${expanded ? "expanded" : ""}`}
      aria-label="Main navigation"
      onMouseEnter={() => setExpanded(true)}
    >
      <div className="navbar_upper flex flex-col gap-4 items-start px-2">
        
        {/* Explore - Maps to Explore */}
        <Link
          to="/explore"
          className={`navbar_icon flex items-center cursor-pointer hover:bg-slate-200 rounded-xl p-2 ${
            isRouteActive(100) ? 'bg-blue-100' : ''
          }`}
          title="Explore"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-900"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
            />
          </svg>
          {expanded && (
            <span className="ml-3 text-gray-900 font-semibold">Explore</span>
          )}
        </Link>

        {/* Trending - Maps to Trending */}
        <Link
          to="/trending"
          className={`navbar_icon flex items-center cursor-pointer hover:bg-slate-200 rounded-xl p-2 ${
            isRouteActive(10) ? 'bg-blue-100' : ''
          }`}
          title="Trending"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-900"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
            />
          </svg>
          {expanded && (
            <span className="ml-3 text-gray-900 font-semibold">Trending</span>
          )}
        </Link>

        {/* Saved */}
        <Link
          to="/saved"
          className={`navbar_icon flex items-center cursor-pointer hover:bg-slate-200 rounded-xl p-2 ${
            isRouteActive(20) ? 'bg-blue-100' : ''
          }`}
          title="Saved"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-900"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
          </svg>
          {expanded && (
            <span className="ml-3 text-gray-900 font-semibold">Saved</span>
          )}
        </Link>
      </div>

      <div className="navbar_lower flex flex-col gap-4 items-start px-2 mt-auto">
        {/* About Us */}
        <Link
          to="/about"
          className={`navbar_icon flex items-center cursor-pointer hover:bg-slate-200 rounded-xl p-2 ${
            isRouteActive(30) ? 'bg-blue-100' : ''
          }`}
          title="About Us"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-900"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 21v-2a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2M16 3v4M8 3v4m-6 2h20M4 21h16"
            />
          </svg>
          {expanded && (
            <span className="ml-3 text-gray-900 font-semibold">About Us</span>
          )}
        </Link>
      </div>
    </nav>
  );
}
