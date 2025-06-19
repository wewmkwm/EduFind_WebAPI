// src/pages/WikipediaSearch.jsx
import React, { useState } from 'react';
import axios from 'axios';

const WikipediaSearch = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWikipediaSummary = async () => {
    if (!query.trim()) {
      setError('Please enter a topic to search.');
      setResult(null);
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const title = encodeURIComponent(query.trim());
      const res = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`);
      setResult(res.data);
    } catch (err) {
      console.error('Error fetching Wikipedia data:', err);
      setError('No information found or topic does not exist.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🔍 Wikipedia Search</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter topic (e.g. Artificial Intelligence)"
          className="border border-gray-300 px-4 py-2 rounded-lg w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={fetchWikipediaSummary}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center">Loading...</p>}

      {error && <p className="text-center text-red-500">{error}</p>}

      {result && (
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-2">{result.title}</h2>
          {result.thumbnail && (
            <img
              src={result.thumbnail.source}
              alt={result.title}
              className="w-48 h-auto mb-4 rounded"
            />
          )}
          <p className="mb-4">{result.extract}</p>
          <a
            href={result.content_urls?.desktop?.page}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Read more on Wikipedia →
          </a>
        </div>
      )}
    </div>
  );
};

export default WikipediaSearch;
