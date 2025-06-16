import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SavedBooks = () => {
  const [savedBooks, setSavedBooks] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/api/users/${user.id}/saved`)
        .then(res => setSavedBooks(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);

  // 🗑️ 取消收藏
  const handleUnsave = (bookId) => {
    axios.delete(`http://localhost:5000/api/users/${user.id}/unsave/${bookId}`)
      .then(res => setSavedBooks(res.data))
      .catch(err => console.error(err));
  };

  if (!user) return <p>Please log in to view your saved books.</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Saved Books</h2>
      {savedBooks.length === 0 ? (
        <p>No saved books found.</p>
      ) : (
        <div className="grid gap-4">
          {savedBooks.map(book => (
            <div key={book.id} className="bg-white shadow p-4 rounded">
              <h3 className="font-bold">{book.title}</h3>
              <p>{book.authors?.join(', ')}</p>
              <button
                onClick={() => handleUnsave(book.id)}
                className="mt-2 px-3 py-1 text-white bg-red-500 hover:bg-red-600 rounded"
              >
                🗑️ Unsave
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedBooks;
