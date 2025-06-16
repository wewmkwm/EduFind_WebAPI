// src/pages/Universities.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Universities = () => {
  const [country, setCountry] = useState('');
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUniversities = async () => {
    if (!country.trim()) {
      setError('Please enter a country name.');
      return;
    }

    setLoading(true);
    setError('');
    setUniversities([]);

    try {
      const res = await axios.get(
        `http://universities.hipolabs.com/search?country=${encodeURIComponent(country)}`
      );
      if (res.data.length === 0) {
        setError('No universities found for this country.');
      } else {
        setUniversities(res.data);
      }
    } catch (err) {
      console.error('Error fetching universities:', err);
      setError('Something went wrong while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = (uni) => {
    const existing = JSON.parse(localStorage.getItem('fav_universities')) || [];

    const exists = existing.find(
      (item) => item.name === uni.name && item.country === uni.country
    );

    if (!exists) {
      existing.push(uni);
      localStorage.setItem('fav_universities', JSON.stringify(existing));
      alert(`${uni.name} added to favorites!`);
    } else {
      alert(`${uni.name} is already in favorites.`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🎓 University Finder</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter country (e.g. Canada)"
          className="border border-gray-300 px-4 py-2 rounded-lg w-full"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button
          onClick={fetchUniversities}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {universities.length > 0 && (
        <div className="space-y-4">
          {universities.map((uni, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{uni.name}</h3>
              <p className="text-gray-600">Country: {uni.country}</p>
              {uni.web_pages.length > 0 && (
                <a
                  href={uni.web_pages[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Visit Website
                </a>
              )}
              <button
                onClick={() => addToFavorites(uni)}
                className="mt-3 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                ❤️ Save to Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Universities;
