// components/NavBar.tsx
"use client";

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function NavBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure the theme is mounted before rendering the toggle
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <nav>
      <div className="left">
        <Link href="/">John Moore</Link>
      </div>
      <div className="right">
        <button onClick={toggleTheme}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
        <a href="mailto:john@example.com" aria-label="Email">Email</a>
        <a
          href="https://www.linkedin.com/in/johnmoore"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/johnmoore"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          GitHub
        </a>
      </div>
    </nav>
  );
}
