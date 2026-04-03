import React, { useState } from 'react';
import useNews from '../hooks/useNews';
import NewsGrid from '../components/NewsGrid';
import Loader from '../components/Loader';
import '../styles/Home.css';

const Home = ({ bookmarks, onBookmark, category }) => {
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);
  const { articles, loading, error } = useNews(category);

  const filtered = articles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setVisibleCount(6);
  };

  return (
    <div className="home">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={handleSearch}
          className="search-input"
        />
        <span className="result-count">
          Showing {visible.length} of {filtered.length} articles
        </span>
      </div>
      {error && <p className="error-msg">{error}</p>}
      {loading ? (
        <Loader />
      ) : (
        <>
          <NewsGrid
            articles={visible}
            bookmarks={bookmarks}
            onBookmark={onBookmark}
          />
          {hasMore && (
            <div className="load-more-wrapper">
              <button className="load-more-btn" onClick={handleLoadMore}>
                Load more articles
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;