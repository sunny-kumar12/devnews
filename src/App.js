import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Bookmarks from './pages/Bookmarks';
import './App.css';

function App() {
  const [page, setPage] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('devnews-bookmarks');
    return saved ? JSON.parse(saved) : [];
  });
  const [category, setCategory] = useState('technology');

  useEffect(() => {
    localStorage.setItem('devnews-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  const handleBookmark = (article) => {
    setBookmarks(prev =>
      prev.some(b => b.url === article.url)
        ? prev.filter(b => b.url !== article.url)
        : [...prev, article]
    );
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <Navbar
        activeCategory={category}
        onCategoryChange={setCategory}
        onBookmarksClick={() => setPage(page === 'bookmarks' ? 'home' : 'bookmarks')}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />
      {page === 'home'
        ? <Home bookmarks={bookmarks} onBookmark={handleBookmark} category={category} />
        : <Bookmarks bookmarks={bookmarks} onBookmark={handleBookmark} />
      }
    </div>
  );
}

export default App;