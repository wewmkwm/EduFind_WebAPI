// src/pages/Countries.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [region, setRegion] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(
          'https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population,cca3'
        );
        setCountries(res.data);
        setFiltered(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleSearch = () => {
    let result = countries;

    if (region !== 'All') {
      result = result.filter((country) => country.region === region);
    }

    if (searchInput.trim() !== '') {
      result = result.filter((country) =>
        country.name.common.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    setFiltered(result);
  };

  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">🌍 Countries of the World</h2>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex gap-2 w-full sm:w-2/3">
          <input
            type="text"
            placeholder="Enter country name..."
            className="border border-gray-300 px-4 py-2 rounded-lg w-full"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg w-full sm:w-1/3"
        >
          {regions.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center text-lg">Loading countries...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-red-500">No countries found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((country) => (
            <div
              key={country.cca3}
              className="bg-white rounded-2xl shadow-md p-4 transition transform hover:scale-105"
            >
              <img
                src={country.flags.svg}
                alt={`Flag of ${country.name.common}`}
                className="w-full h-32 object-cover rounded-md mb-3"
              />
              <h3 className="text-xl font-semibold mb-1">{country.name.common}</h3>
              <p><strong>Region:</strong> {country.region}</p>
              <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
              <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Countries;
