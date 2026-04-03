import React from 'react';
import NewsCard from './NewsCard';

const NewsGrid = ({ articles, bookmarks, onBookmark }) => {
  if (articles.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
        <p style={{ fontSize: '18px' }}>No articles found.</p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '1.5rem',
      padding: '2rem'
    }}>
      {articles.map((article, index) => (
        <NewsCard
          key={index}
          article={article}
          isBookmarked={bookmarks.some(b => b.url === article.url)}
          onBookmark={onBookmark}
        />
      ))}
    </div>
  );
};

export default NewsGrid;