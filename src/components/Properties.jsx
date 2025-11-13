import React, { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';
import { API_BASE } from '../config/api';

const API_BASE_URL = API_BASE;

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price'); // default sort field
  const [order, setOrder] = useState('asc'); // asc or desc

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const url = `${API_BASE_URL}/property?search=${encodeURIComponent(
          searchTerm
        )}&sortBy=${sortBy}&order=${order}`;
        const res = await fetch(url);
        const data = await res.json();
        setProperties(data);
      } catch (err) {
        console.error('Error fetching properties:', err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search input
    const timeout = setTimeout(fetchProperties, 300);
    return () => clearTimeout(timeout);
  }, [searchTerm, sortBy, order]);

  return (
    <div className="container mx-auto px-4 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">All Properties</h2>

      {/* Search & Sort Controls */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name, description, city, or area..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>

          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-lg font-semibold mt-10">
          Loading properties...
        </p>
      ) : properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No properties found.
        </p>
      )}
    </div>
  );
};

export default Properties;
