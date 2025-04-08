// components/NavBar.tsx

"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// Import desired icons from React Icons
import { FaSun, FaMoon, FaEnvelope, FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function NavBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure the theme is mounted before rendering the toggle
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav>
      <div className="left">
        <Link href="/">John Moore</Link>
      </div>
      <div className="right">
        <button onClick={toggleTheme} aria-label="Toggle Theme">
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
        <a
          href="mailto:jmoore87jr@gmail.com"
          aria-label="Email"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaEnvelope />
        </a>
        <a
          href="https://www.linkedin.com/in/john-moore-37906a237/"
          aria-label="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn />
        </a>
        <a
          href="https://github.com/john-e-moore"
          aria-label="GitHub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
      </div>
    </nav>
  );
}
