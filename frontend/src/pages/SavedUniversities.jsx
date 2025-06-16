// SavedUniversities.jsx
import React, { useEffect, useState } from 'react';

const SavedUniversities = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('fav_universities')) || [];
    setFavorites(saved);
  }, []);

  const removeFavorite = (name) => {
    const updated = favorites.filter((uni) => uni.name !== name);
    setFavorites(updated);
    localStorage.setItem('fav_universities', JSON.stringify(updated));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🎓 Saved Universities</h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-600">No favorites saved yet.</p>
      ) : (
        <div className="space-y-4">
          {favorites.map((uni, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{uni.name}</h3>
              <p className="text-gray-600">Country: {uni.country}</p>
              {uni.web_pages?.[0] && (
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
                onClick={() => removeFavorite(uni.name)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedUniversities;
