import React from 'react';
import '../styles/Navbar.css';

const CATEGORIES = ['technology', 'business', 'science', 'health', 'sports', 'entertainment'];

const Navbar = ({ activeCategory, onCategoryChange, onBookmarksClick, darkMode, toggleDarkMode }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">DN</span>
        <span className="brand-name">DevNews</span>
      </div>
      <div className="navbar-categories">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="navbar-actions">
        <button className="action-btn" onClick={onBookmarksClick}>Bookmarks</button>
        <button className="action-btn" onClick={toggleDarkMode}>
          {darkMode ? 'Light' : 'Dark'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;