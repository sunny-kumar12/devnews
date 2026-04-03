import React from 'react';
import '../styles/Loader.css';

const Loader = () => {
  return (
    <div className="loader-grid">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-image"></div>
          <div className="skeleton-body">
            <div className="skeleton-line short"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line medium"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loader;