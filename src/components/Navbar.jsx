import React from "react";
import dayjs from "dayjs";
import { navIcons } from "../constants/index.js";
import useWindowStore from "../store/window";

const Navbar = () => {
  const { openWindow } = useWindowStore();
  const myPhoneNumber = "+91 7483430871";

  const handleNavClick = (type) => {
    if (type === "projects") {
      openWindow("photos");
    } else if (type === "resume") {
      openWindow("resume");
    }
  };

  const handleIconClick = (id) => {
    switch (id) {
      case 1: // Wi-Fi -> Opens Internet / Safari
        openWindow("safari");
        break;
      case 2: // Search -> Opens Finder Spotlight
        openWindow("finder");
        break;
      case 3: // Profile / User -> Opens Terminal
        openWindow("terminal");
        break;
      default:
        break;
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-8 bg-white/40 backdrop-blur-md border-b border-white/20 z-[9999] flex items-center justify-between px-4 text-xs font-medium text-gray-800 select-none">
      {/* Left: Brand + Window Actions */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 cursor-pointer">
          <img
            src="/images/logo.svg"
            alt="logo"
            className="w-4 h-4 object-contain"
            onError={(e) => (e.target.style.display = "none")}
          />
          <span className="font-bold text-gray-900">Mahant's Portfolio</span>
        </div>

        <ul className="flex items-center gap-3">
          {/* Projects */}
          <li>
            <button
              type="button"
              onClick={() => handleNavClick("projects")}
              className="px-2 py-0.5 rounded hover:bg-black/10 transition-colors cursor-pointer text-gray-800"
            >
              Projects
            </button>
          </li>

          {/* Contact */}
          <li>
            <a
              href={`tel:${myPhoneNumber.replace(/\s+/g, "")}`}
              className="px-2 py-0.5 rounded hover:bg-black/10 transition-colors cursor-pointer flex items-center gap-1 text-gray-800 font-medium"
              title="Click to call"
            >
              <span>Contact:</span>
              <span>{myPhoneNumber}</span>
            </a>
          </li>

          {/* Resume */}
          <li>
            <button
              type="button"
              onClick={() => handleNavClick("resume")}
              className="px-2 py-0.5 rounded hover:bg-black/10 transition-colors cursor-pointer text-gray-800"
            >
              Resume
            </button>
          </li>
        </ul>
      </div>

      {/* Right: Functional System Icons + Clock */}
      <div className="flex items-center gap-3">
        <ul className="flex items-center gap-1.5">
          {navIcons.map(({ id, img }) => (
            <li
              key={id}
              onClick={() => handleIconClick(id)}
              className="cursor-pointer p-1 rounded hover:bg-black/10 active:scale-95 transition-all"
              title={
                id === 1
                  ? "Internet (Safari)"
                  : id === 2
                  ? "Spotlight Search (Finder)"
                  : id === 3
                  ? "Developer Terminal"
                  : "Control Center"
              }
            >
              <img
                src={img}
                className="w-3.5 h-3.5 object-contain"
                alt={`icon-${id}`}
              />
            </li>
          ))}
        </ul>

        {/* Clock */}
        <time className="text-[11px] font-medium text-gray-700 ml-1">
          {dayjs().format("ddd MMM D h:mm A")}
        </time>
      </div>
    </nav>
  );
};

export default Navbar;