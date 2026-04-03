import { useState, useEffect } from 'react';
import axios from 'axios';

const useNews = (category = 'technology') => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setArticles([]);
    setLoading(true);
    setError(null);

    const fetchNews = async () => {
      try {
        const res = await axios.get(
          `https://newsapi.org/v2/top-headlines`, {
            params: {
              category: category,
              language: 'en',
              pageSize: 20,
              apiKey: process.env.REACT_APP_NEWS_API_KEY
            }
          }
        );
        setArticles(res.data.articles.filter(a => a.urlToImage));
      } catch (err) {
        setError('Failed to fetch news. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  return { articles, loading, error };
};

export default useNews;