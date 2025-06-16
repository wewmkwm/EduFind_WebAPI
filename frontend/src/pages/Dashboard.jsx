import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Bookmark, User } from 'lucide-react'; // 使用 Lucide 图标库

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return (
      <div className="text-center mt-20 text-red-600 font-semibold">
        ⚠️ Please log in to access your dashboard.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">👋 Welcome back, {user.username}!</h2>
        <p className="text-gray-500 mb-8">Access your learning tools and explore the world of knowledge.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div
            onClick={() => navigate('/books')}
            className="cursor-pointer bg-blue-50 hover:bg-blue-100 transition p-6 rounded-xl shadow hover:shadow-lg text-center"
          >
            <BookOpen className="mx-auto text-blue-600 w-8 h-8 mb-2" />
            <h3 className="font-semibold text-blue-700">Search Books</h3>
            <p className="text-sm text-gray-500 mt-1">Discover books by topic or title</p>
          </div>

          <div
            onClick={() => navigate('/saved')}
            className="cursor-pointer bg-green-50 hover:bg-green-100 transition p-6 rounded-xl shadow hover:shadow-lg text-center"
          >
            <Bookmark className="mx-auto text-green-600 w-8 h-8 mb-2" />
            <h3 className="font-semibold text-green-700">Saved Books</h3>
            <p className="text-sm text-gray-500 mt-1">View your saved favorites</p>
          </div>

          <div
            onClick={() => alert(`📧 Email: ${user.email}`)}
            className="cursor-pointer bg-gray-100 hover:bg-gray-200 transition p-6 rounded-xl shadow hover:shadow-lg text-center"
          >
            <User className="mx-auto text-gray-600 w-8 h-8 mb-2" />
            <h3 className="font-semibold text-gray-700">Your Info</h3>
            <p className="text-sm text-gray-500 mt-1">View account details</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
