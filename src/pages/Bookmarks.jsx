import React from 'react';
import NewsGrid from '../components/NewsGrid';

const Bookmarks = ({ bookmarks, onBookmark }) => {
  return (
    <div>
      <div style={{ padding: '1.5rem 2rem 0' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a' }}>
          Saved articles ({bookmarks.length})
        </h2>
      </div>
      <NewsGrid
        articles={bookmarks}
        bookmarks={bookmarks}
        onBookmark={onBookmark}
      />
    </div>
  );
};

export default Bookmarks;