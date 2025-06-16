// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Countries from './pages/Countries';
import WikipediaSearch from './pages/WikipediaSearch';
import Universities from './pages/Universities';
import SavedUniversities from './pages/SavedUniversities';
import Profile from './pages/Profile';

import Header from './components/Header';
import Footer from './components/Footer';

import './index.css';

const App = () => {
  return (
    <Router>
      <Header />

      <main className="min-h-screen pt-24 p-4 bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/books" element={<SearchBooks />} />
          <Route path="/saved" element={<SavedBooks />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/wikipedia" element={<WikipediaSearch />} />
          <Route path="/universities" element={<Universities />} />
          <Route path="/saved-universities" element={<SavedUniversities />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
};

export default App;
