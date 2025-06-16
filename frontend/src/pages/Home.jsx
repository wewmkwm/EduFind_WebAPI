import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/books');
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-gray-50 min-h-screen">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-blue-600">
        Welcome to EduFind 📚
      </h1>
      <p className="text-lg text-gray-700 max-w-2xl mb-8">
        Discover a world of knowledge through curated books and educational resources from around the globe. Start your journey now!
      </p>
      <button
        onClick={handleExplore}
        className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-lg shadow transition duration-300"
      >
        🔍 Explore Books
      </button>
    </div>
  );
};

export default Home;
