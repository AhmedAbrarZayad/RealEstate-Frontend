import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/useAuth';
import MyPropertyCard from './MyPropertyCard';
import { API_BASE } from '../config/api';

const API_BASE_URL = API_BASE;
const MyProperties = () => {
    const { currentUser } = useAuth();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/my-properties?email=` + currentUser.email, {
                    headers: {
                        Authorization: `Bearer ${await currentUser.getIdToken()}`
                    }
                });
                const data = await res.json();
                setProperties(data);
            } catch (err) {
                console.error('Error fetching properties:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [currentUser]);

    // Callback when a property is updated
    const handlePropertyUpdated = (id, updatedProperty) => {
        setProperties(prev =>
            prev.map(prop => (prop._id === id ? { ...prop, ...updatedProperty } : prop))
        );
    };

    // Callback when a property is deleted
    const handlePropertyDeleted = (id) => {
        setProperties(prev => prev.filter(prop => prop._id !== id));
    };

    if (loading) return <p>Loading properties...</p>;

    return (
        <>
            <h2 className="text-2xl font-bold mb-4 text-center mt-10">All Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                {properties.map(property => (
                    <MyPropertyCard
                        key={property._id}
                        property={property}
                        onPropertyUpdated={handlePropertyUpdated}
                        onPropertyDeleted={handlePropertyDeleted}
                    />
                ))}
            </div>
        </>
    );
};

export default MyProperties;
