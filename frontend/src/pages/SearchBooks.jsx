import React, { useState } from 'react';
import axios from 'axios';
import { BookOpen, Save, Search } from 'lucide-react';

const SearchBooks = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  const handleSearch = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.get(`http://localhost:5000/api/books?q=${query}`);
      setResults(res.data.items || []);
    } catch (error) {
      console.error('Search error:', error);
      setMessage('Failed to search books.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (book) => {
    if (!user) {
      setMessage('Please log in to save books.');
      return;
    }

    const bookData = {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors || [],
      description: book.volumeInfo.description || '',
      thumbnail: book.volumeInfo.imageLinks?.thumbnail || '',
      infoLink: book.volumeInfo.infoLink || ''
    };

    axios.post(`http://localhost:5000/api/users/${user.id}/save`, { book: bookData })
      .then(() => setMessage('✅ Book saved!'))
      .catch(err => {
        console.error(err);
        setMessage('❌ Failed to save book.');
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
        <BookOpen className="w-6 h-6" /> Search for Books
      </h2>

      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter keyword..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded shadow-sm"
        />
        <button
          onClick={handleSearch}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          <Search className="w-5 h-5" /> Search
        </button>
      </div>

      {message && <p className="text-green-600 mb-4">{message}</p>}
      {loading && <p className="text-gray-500">Searching...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map((book) => (
          <div key={book.id} className="bg-white shadow rounded p-4">
            <img
              src={book.volumeInfo.imageLinks?.thumbnail}
              alt={book.volumeInfo.title}
              className="w-24 float-right ml-4"
            />
            <h3 className="text-lg font-semibold mb-1">{book.volumeInfo.title}</h3>
            <p className="text-sm text-gray-700 mb-2">{book.volumeInfo.authors?.join(', ')}</p>
            <p className="text-sm text-gray-600 mb-2">
              {book.volumeInfo.description?.slice(0, 150)}...
            </p>
            <div className="flex gap-2 items-center mt-2">
              <a
                href={book.volumeInfo.infoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                More Info
              </a>
              <button
                onClick={() => handleSave(book)}
                className="ml-auto flex items-center gap-1 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                <Save className="w-4 h-4" /> Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBooks;
