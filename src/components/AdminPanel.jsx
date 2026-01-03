import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiHome, FiStar, FiTrash2, FiAlertCircle, FiDollarSign, FiEye, FiBarChart2 } from 'react-icons/fi';
import { API_BASE } from '../config/api';

const API_BASE_URL = API_BASE;

const AdminPanel = () => {
    const { currentUser, userRole } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard');
    
    // Dashboard stats
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProperties: 0,
        totalReviews: 0,
        totalValue: 0,
        totalViews: 0,
        avgRating: 0
    });
    
    // Data lists
    const [users, setUsers] = useState([]);
    const [properties, setProperties] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // Redirect if not admin
        if (!currentUser || userRole !== 'admin') {
            navigate('/');
            return;
        }
        
        fetchAdminData();
    }, [currentUser, userRole, navigate]);

    const fetchAdminData = async () => {
        try {
            const token = await currentUser.getIdToken();
            const headers = { 'Authorization': `Bearer ${token}` };

            // Fetch all data in parallel
            const [statsRes, usersRes, propertiesRes, reviewsRes] = await Promise.all([
                fetch(`${API_BASE_URL}/admin/dashboard/stats`, { headers }),
                fetch(`${API_BASE_URL}/admin/users`, { headers }),
                fetch(`${API_BASE_URL}/admin/properties`, { headers }),
                fetch(`${API_BASE_URL}/admin/reviews`, { headers })
            ]);

            if (statsRes.ok) setStats(await statsRes.json());
            if (usersRes.ok) setUsers(await usersRes.json());
            if (propertiesRes.ok) setProperties(await propertiesRes.json());
            if (reviewsRes.ok) setReviews(await reviewsRes.json());

            setLoading(false);
        } catch (error) {
            console.error('Error fetching admin data:', error);
            setLoading(false);
        }
    };

    const deleteProperty = async (propertyId) => {
        if (!window.confirm('Are you sure you want to delete this property?')) return;

        try {
            const token = await currentUser.getIdToken();
            const response = await fetch(`${API_BASE_URL}/admin/properties/${propertyId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                setProperties(properties.filter(p => p._id !== propertyId));
                alert('Property deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting property:', error);
            alert('Failed to delete property');
        }
    };

    const deleteReview = async (reviewId) => {
        if (!window.confirm('Are you sure you want to delete this review?')) return;

        try {
            const token = await currentUser.getIdToken();
            const response = await fetch(`${API_BASE_URL}/admin/reviews/${reviewId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                setReviews(reviews.filter(r => r._id !== reviewId));
                alert('Review deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting review:', error);
            alert('Failed to delete review');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: <FiBarChart2 /> },
        { id: 'users', label: 'Users', icon: <FiUsers /> },
        { id: 'properties', label: 'Properties', icon: <FiHome /> },
        { id: 'reviews', label: 'Reviews', icon: <FiStar /> },
    ];

    const statCards = [
        { title: 'Total Users', value: stats.totalUsers, icon: <FiUsers className="w-8 h-8" />, color: 'blue' },
        { title: 'Total Properties', value: stats.totalProperties, icon: <FiHome className="w-8 h-8" />, color: 'green' },
        { title: 'Total Reviews', value: stats.totalReviews, icon: <FiStar className="w-8 h-8" />, color: 'purple' },
        { title: 'Total Value', value: `$${(stats.totalValue / 1000).toFixed(0)}K`, icon: <FiDollarSign className="w-8 h-8" />, color: 'orange' },
        { title: 'Total Views', value: stats.totalViews, icon: <FiEye className="w-8 h-8" />, color: 'pink' },
        { title: 'Avg Rating', value: stats.avgRating, icon: <FiStar className="w-8 h-8" />, color: 'yellow' },
    ];

    const colorMap = {
        blue: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
        green: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
        purple: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
        orange: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400',
        pink: 'bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400',
        yellow: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400',
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-28 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Admin Panel
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage users, properties, and reviews
                    </p>
                </div>

                {/* Tabs */}
                <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
                    <nav className="flex space-x-4">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium transition-colors ${
                                    activeTab === tab.id
                                        ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                }`}
                            >
                                {tab.icon}
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Dashboard Tab */}
                {activeTab === 'dashboard' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {statCards.map((stat, index) => (
                            <motion.div
                                key={stat.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                            {stat.title}
                                        </p>
                                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                            {stat.value}
                                        </p>
                                    </div>
                                    <div className={`p-3 rounded-lg ${colorMap[stat.color]}`}>
                                        {stat.icon}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Users Tab */}
                {activeTab === 'users' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-900">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Properties
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {users.map((user) => (
                                        <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {user.displayName || 'N/A'}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 dark:text-white">
                                                    {user.email}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    user.role === 'admin'
                                                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                                                }`}>
                                                    {user.role || 'user'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {user.properties?.length || 0}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}

                {/* Properties Tab */}
                {activeTab === 'properties' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-900">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Property
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Location
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {properties.map((property) => (
                                        <tr key={property._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <img
                                                        src={property.imageLink}
                                                        alt={property.name}
                                                        className="h-10 w-10 rounded object-cover"
                                                    />
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {property.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {property.location?.city || property.location?.area || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                ${property.price?.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                    {property.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <button
                                                    onClick={() => deleteProperty(property._id)}
                                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                >
                                                    <FiTrash2 className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-900">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Reviewer
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Property ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Rating
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Review
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {reviews.map((review) => (
                                        <tr key={review._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {review.reviewerName || 'Anonymous'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                                                {review.propertyId?.slice(0, 8)}...
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <FiStar className="w-4 h-4 text-yellow-400 mr-1" />
                                                    <span className="text-sm text-gray-900 dark:text-white">
                                                        {review.starRating}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white max-w-xs truncate">
                                                {review.reviewText}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <button
                                                    onClick={() => deleteReview(review._id)}
                                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                >
                                                    <FiTrash2 className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
