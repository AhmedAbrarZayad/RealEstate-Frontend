import React, { useState } from 'react';
import WorldMap from '../assets/World Map.svg';
import { useAuth } from '../auth/useAuth';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:3000';

const AddProperties = () => {
    const { currentUser } = useAuth();

    const [formData, setFormData] = useState({
        propertyName: '',
        description: '',
        category: '',
        price: '',
        city: '',
        area: '',
        address: '',
        imageLink: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentUser) {
            toast.error('You must be logged in to add a property.');
            return;
        }

        try {
            // Get Firebase ID Token for auth header
            const token = await currentUser.getIdToken();

            // Construct property data object for backend
            const propertyData = {
                name: formData.propertyName,
                description: formData.description,
                category: formData.category,
                price: parseFloat(formData.price),
                location: {
                    city: formData.city,
                    area: formData.area,
                    address: formData.address,
                },
                imageLink: formData.imageLink,
                user: {
                    email: currentUser.email,
                    name: currentUser.displayName || 'Anonymous User',
                },
            };

            // Send POST request to backend
            const response = await fetch(
                `${API_BASE_URL}/property?email=${currentUser.email}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(propertyData),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to add property');
            }

            toast.success('🏠 Property added successfully!');
            setFormData({
                propertyName: '',
                description: '',
                category: '',
                price: '',
                city: '',
                area: '',
                address: '',
                imageLink: '',
            });
        } catch (err) {
            console.error('Error adding property:', err);
            toast.error(`❌ ${err.message || 'Error adding property'}`);
        }
    };

    return (
        <div
            className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
            style={{
                backgroundImage: `url(${WorldMap})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/70"></div>

            <div className="relative z-10 max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
                        List Your Property
                    </h1>
                    <p className="text-gray-300 text-lg">
                        Fill in the details below to create your property listing
                    </p>
                    <div className="mt-4 h-1 w-24 bg-blue-500 mx-auto rounded-full"></div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-700">
                    <div className="space-y-6">
                        {/* Property Name */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-200 mb-2">
                                Property Name *
                            </label>
                            <input
                                type="text"
                                name="propertyName"
                                value={formData.propertyName}
                                onChange={handleChange}
                                placeholder="e.g., Luxury Beachfront Villa"
                                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-200 mb-2">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe your property..."
                                rows="5"
                                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 resize-none"
                                required
                            />
                        </div>

                        {/* Category and Price */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-200 mb-2">
                                    Category *
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="" disabled>
                                        Select a category
                                    </option>
                                    <option value="Rent">For Rent</option>
                                    <option value="Sale">For Sale</option>
                                    <option value="Commercial">Commercial</option>
                                    <option value="Land">Land</option>
                                    <option value="Residential">Residential</option>
                                    <option value="Apartment">Apartment</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-200 mb-2">
                                    Price (USD) *
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-bold">
                                        $
                                    </span>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="0"
                                        className="w-full pl-8 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="bg-gray-900/30 rounded-xl p-6 border border-gray-700">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                <svg
                                    className="w-5 h-5 mr-2 text-blue-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                Location Details
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="e.g., Dhaka"
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                                        Area *
                                    </label>
                                    <input
                                        type="text"
                                        name="area"
                                        value={formData.area}
                                        onChange={handleChange}
                                        placeholder="e.g., Gulshan"
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm font-semibold text-gray-200 mb-2">
                                    Full Address *
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="e.g., House 12, Road 45"
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* Image Link */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-200 mb-2">
                                Property Image URL *
                            </label>
                            <input
                                type="url"
                                name="imageLink"
                                value={formData.imageLink}
                                onChange={handleChange}
                                placeholder="https://example.com/property-image.jpg"
                                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* User Info */}
                        <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-700/50">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                <svg
                                    className="w-5 h-5 mr-2 text-blue-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                Your Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        value={currentUser?.displayName || 'Anonymous User'}
                                        readOnly
                                        className="w-full px-4 py-3 bg-gray-900/30 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        value={currentUser?.email || ''}
                                        readOnly
                                        className="w-full px-4 py-3 bg-gray-900/30 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-500/50 shadow-lg hover:shadow-blue-500/50 flex items-center justify-center space-x-2"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                <span className="text-lg">Add Property</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        All fields marked with * are required
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AddProperties;
