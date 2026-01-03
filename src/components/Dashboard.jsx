import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../auth/useAuth';
import { FiHome, FiDollarSign, FiEye, FiStar, FiTrendingUp, FiUsers, FiShield } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { API_BASE } from '../config/api';
import { Link } from 'react-router-dom';

const API_BASE_URL = API_BASE;

const Dashboard = () => {
    const { currentUser, userRole } = useAuth();
    const [stats, setStats] = useState({
        totalProperties: 0,
        totalValue: 0,
        totalViews: 0,
        avgRating: 0
    });
    const [properties, setProperties] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [changes, setChanges] = useState({
        propertyChange: '+0%',
        valueChange: '+0%',
        viewsChange: '+0%',
        ratingChange: '+0'
    });

    useEffect(() => {
        if (currentUser) {
            fetchDashboardData();
        }
    }, [currentUser]);

    const fetchDashboardData = async () => {
        try {
            const token = await currentUser.getIdToken();
            const headers = {
                'Authorization': `Bearer ${token}`
            };

            // Fetch all dashboard data in parallel
            const [statsRes, monthlyRes, distributionRes, propertiesRes, changesRes] = await Promise.all([
                fetch(`${API_BASE_URL}/dashboard/stats?email=${currentUser.email}`, { headers }),
                fetch(`${API_BASE_URL}/dashboard/monthly-activity?email=${currentUser.email}`, { headers }),
                fetch(`${API_BASE_URL}/dashboard/property-distribution?email=${currentUser.email}`, { headers }),
                fetch(`${API_BASE_URL}/dashboard/recent-properties?email=${currentUser.email}`, { headers }),
                fetch(`${API_BASE_URL}/dashboard/changes?email=${currentUser.email}`, { headers })
            ]);

            const statsData = await statsRes.json();
            const monthlyActivityData = await monthlyRes.json();
            const distributionData = await distributionRes.json();
            const propertiesData = await propertiesRes.json();
            const changesData = await changesRes.json();


            setStats(statsData);
            setMonthlyData(monthlyActivityData);
            setCategoryData(distributionData);
            setProperties(propertiesData.properties || []);
            setChanges(changesData);
            
            setLoading(false);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setLoading(false);
        }
    };

    const COLORS = ['#3b82f6', '#7c3aed', '#f59e0b', '#10b981'];

    const statCards = [
        {
            title: 'Total Properties',
            value: stats.totalProperties,
            icon: <FiHome className="w-8 h-8" />,
            color: 'blue',
            change: changes.propertyChange
        },
        {
            title: 'Total Value',
            value: `$${(stats.totalValue / 1000).toFixed(0)}K`,
            icon: <FiDollarSign className="w-8 h-8" />,
            color: 'green',
            change: changes.valueChange
        },
        {
            title: 'Total Views',
            value: stats.totalViews,
            icon: <FiEye className="w-8 h-8" />,
            color: 'purple',
            change: changes.viewsChange
        },
        {
            title: 'Avg Rating',
            value: stats.avgRating,
            icon: <FiStar className="w-8 h-8" />,
            color: 'orange',
            change: changes.ratingChange
        }
    ];

    if (!currentUser) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Please log in to view your dashboard
                    </h2>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                                Dashboard
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-400">
                                Welcome back, {currentUser.displayName || 'User'}!
                            </p>
                        </div>
                        {userRole === 'admin' && (
                            <Link
                                to="/admin"
                                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                            >
                                <FiShield className="w-5 h-5" />
                                <span>Admin Panel</span>
                            </Link>
                        )}
                    </div>
                    {userRole === 'admin' && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-4 p-4 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800 rounded-lg"
                        >
                            <div className="flex items-center space-x-3">
                                <FiShield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                <p className="text-purple-900 dark:text-purple-200 font-medium">
                                    You have administrator privileges. Access the Admin Panel for full system management.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </motion.div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statCards.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/20 text-${stat.color}-600`}>
                                    {stat.icon}
                                </div>
                                <div className="flex items-center space-x-1 text-green-600 text-sm font-semibold">
                                    <FiTrendingUp className="w-4 h-4" />
                                    <span>{stat.change}</span>
                                </div>
                            </div>
                            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                                {stat.title}
                            </h3>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                {stat.value}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Monthly Activity Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            Monthly Activity
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="month" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: '#1f2937', 
                                        border: 'none', 
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }} 
                                />
                                <Legend />
                                <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} />
                                <Line type="monotone" dataKey="inquiries" stroke="#7c3aed" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </motion.div>

                    {/* Property Distribution Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            Property Distribution
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </motion.div>
                </div>

                {/* Recent Properties Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
                >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Recent Properties
                    </h2>
                    {loading ? (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        </div>
                    ) : properties.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold">Property</th>
                                        <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold">Category</th>
                                        <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold">Price</th>
                                        <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold">Location</th>
                                        <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {properties.slice(0, 5).map((property, index) => (
                                        <tr key={index} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <td className="py-4 px-4">
                                                <div className="flex items-center space-x-3">
                                                    <img 
                                                        src={property.imageLink} 
                                                        alt={property.name}
                                                        className="w-12 h-12 rounded-lg object-cover"
                                                    />
                                                    <span className="font-medium text-gray-900 dark:text-white">
                                                        {property.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    property.category === 'Sale' 
                                                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                                                        : 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
                                                }`}>
                                                    {property.category}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-gray-900 dark:text-white font-semibold">
                                                ${property.price.toLocaleString()}
                                            </td>
                                            <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                                                {property.location.city}
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                                                    Active
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <FiHome className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 dark:text-gray-400">
                                No properties yet. Start by adding your first property!
                            </p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
