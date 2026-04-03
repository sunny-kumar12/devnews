import React from 'react';
import '../styles/NewsCard.css';

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  }) + ' · ' + date.toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit'
  });
};

const NewsCard = ({ article, isBookmarked, onBookmark }) => {
  const handleShare = () => {
    navigator.clipboard.writeText(article.url);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="news-card">
      <img
        src={article.urlToImage}
        alt={article.title}
        className="card-image"
        onError={e => { e.target.src = 'https://placehold.co/400x180?text=No+Image'; }}
      />
      <div className="card-body">
        <div className="card-meta">
          <span className="card-source">{article.source.name}</span>
          <span className="card-date">{formatDate(article.publishedAt)}</span>
        </div>
        <h3 className="card-title">{article.title}</h3>
        <p className="card-desc">{article.description}</p>
        <div className="card-footer">
          <a href={article.url} target="_blank" rel="noreferrer" className="read-btn">
            Read more
          </a>
          <div className="card-actions">
            <button className="share-btn" onClick={handleShare}>Share</button>
            <button
              className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
              onClick={() => onBookmark(article)}
            >
              {isBookmarked ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;