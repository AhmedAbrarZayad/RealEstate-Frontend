import React, { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';
import { API_BASE } from '../config/api';

const API_BASE_URL = API_BASE;
const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/property`);
                const data = await res.json();
                setProperties(data);
            } catch (err) {
                console.error('Error fetching properties:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    if (loading) return <p>Loading properties...</p>;

    return (
        <>
            <h2 className="text-2xl font-bold mb-4 text-center mt-10">All Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                {properties.map(property => (
                    <PropertyCard key={property._id} property={property} />
                ))}
            </div>
        </>
    );
};

export default Properties;
