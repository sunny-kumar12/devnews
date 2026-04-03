import { useState, useEffect } from 'react';
import axios from 'axios';

const CATEGORY_MAP = {
  technology: 'technology',
  business: 'business',
  science: 'science',
  health: 'health',
  sports: 'sports',
  entertainment: 'entertainment'
};

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
          `https://gnews.io/api/v4/top-headlines`, {
            params: {
              category: CATEGORY_MAP[category],
              lang: 'en',
              max: 20,
              apikey: process.env.REACT_APP_GNEWS_API_KEY
            }
          }
        );
        const mapped = res.data.articles.map(a => ({
          title: a.title,
          description: a.description,
          url: a.url,
          urlToImage: a.image,
          publishedAt: a.publishedAt,
          source: { name: a.source.name }
        }));
        setArticles(mapped.filter(a => a.urlToImage));
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