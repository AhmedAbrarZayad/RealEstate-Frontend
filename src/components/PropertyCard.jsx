import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiDollarSign, FiHome, FiCalendar } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function PropertyCard({ property }) {
    const navigate = useNavigate();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleViewDetails = () => {
        navigate(`/property/${property._id}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="group"
        >
            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col border border-gray-200 dark:border-gray-700">
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                    <img
                        src={property.imageLink}
                        alt={property.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
                        {property.category}
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                    {/* Property Name */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {property.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
                        {property.description}
                    </p>

                    {/* Location */}
                    <div className="flex items-start space-x-2 mb-4 text-gray-700 dark:text-gray-300">
                        <FiMapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                            <p className="font-semibold">{property.location.area}, {property.location.city}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">{property.location.address}</p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

                    {/* Price and Owner Section */}
                    <div className="flex items-center justify-between mb-4">
                        {/* Price */}
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Price</p>
                            <div className="flex items-baseline space-x-1">
                                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    {formatPrice(property.price)}
                                </span>
                                {property.category === 'Rent' && (
                                    <span className="text-sm text-gray-500 dark:text-gray-500">/month</span>
                                )}
                            </div>
                        </div>

                        {/* Owner Avatar */}
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold shadow-md">
                                {property.user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </div>
                        </div>
                    </div>

                    {/* Owner Info */}
                    <div className="text-right mb-4">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{property.user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">{property.user.email}</p>
                    </div>

                    {/* View Details Button */}
                    <button
                        onClick={handleViewDetails}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
