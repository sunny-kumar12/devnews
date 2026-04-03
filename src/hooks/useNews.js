import { useState, useEffect } from 'react';
import axios from 'axios';

const RSS_FEEDS = {
  technology: 'https://feeds.feedburner.com/TechCrunch',
  business: 'https://feeds.bloomberg.com/markets/news.rss',
  science: 'https://www.sciencedaily.com/rss/top/science.xml',
  health: 'https://www.medicalnewstoday.com/rss/medical-news.xml',
  sports: 'https://www.espn.com/espn/rss/news',
  entertainment: 'https://variety.com/feed/'
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
        const res = await axios.get('https://api.rss2json.com/v1/api.json', {
          params: {
            rss_url: RSS_FEEDS[category],
            api_key: 'qordxinbuvng4nisecn16q3q8eld5dyp0ohlmhcx',
            count: 20
          }
        });
        const mapped = res.data.items.map(a => ({
          title: a.title,
          description: a.description.replace(/<[^>]*>/g, '').slice(0, 200),
          url: a.link,
          urlToImage: a.thumbnail || a.enclosure?.link,
          publishedAt: a.pubDate,
          source: { name: category.charAt(0).toUpperCase() + category.slice(1) }
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