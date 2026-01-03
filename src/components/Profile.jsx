import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../auth/useAuth';
import { FiEdit2, FiSave, FiX, FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiShield } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';

const Profile = () => {
    const { currentUser, userRole } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        displayName: currentUser?.displayName || '',
        email: currentUser?.email || '',
        phone: '',
        address: '',
        bio: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async () => {
        // Simulate save operation
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success('Profile updated successfully!');
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({
            displayName: currentUser?.displayName || '',
            email: currentUser?.email || '',
            phone: '',
            address: '',
            bio: ''
        });
        setIsEditing(false);
    };

    if (!currentUser) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Please log in to view your profile
                    </h2>
                </div>
            </div>
        );
    }

    const accountCreatedDate = currentUser.metadata?.creationTime 
        ? new Date(currentUser.metadata.creationTime).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : 'N/A';

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                        My Profile
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Manage your personal information
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                            <div className="text-center">
                                {currentUser.photoURL ? (
                                    <img
                                        src={currentUser.photoURL}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-600"
                                    />
                                ) : (
                                    <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                                        <span className="text-5xl font-bold text-white">
                                            {currentUser.displayName?.charAt(0) || 'U'}
                                        </span>
                                    </div>
                                )}
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    {currentUser.displayName || 'User'}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    {currentUser.email}
                                </p>
                                
                                <div className="space-y-4 text-left">
                                    <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                                        <FiCalendar className="w-5 h-5" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-500">Member Since</p>
                                            <p className="text-sm font-semibold">{accountCreatedDate}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                                        <FiUser className="w-5 h-5" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-500">Account Status</p>
                                            <p className="text-sm font-semibold text-green-600">Active</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                                        <FiShield className="w-5 h-5" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-500">Role</p>
                                            <p className={`text-sm font-semibold ${
                                                userRole === 'admin' 
                                                    ? 'text-purple-600 dark:text-purple-400' 
                                                    : 'text-blue-600 dark:text-blue-400'
                                            }`}>
                                                {userRole === 'admin' ? 'Administrator' : 'User'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Profile Information */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Personal Information
                                </h2>
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200"
                                    >
                                        <FiEdit2 className="w-4 h-4" />
                                        <span>Edit</span>
                                    </button>
                                ) : (
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={handleSave}
                                            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200"
                                        >
                                            <FiSave className="w-4 h-4" />
                                            <span>Save</span>
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200"
                                        >
                                            <FiX className="w-4 h-4" />
                                            <span>Cancel</span>
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                {/* Display Name */}
                                <div>
                                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        <FiUser className="w-4 h-4" />
                                        <span>Full Name</span>
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="displayName"
                                            value={formData.displayName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <p className="text-gray-900 dark:text-white px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            {currentUser.displayName || 'Not set'}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        <FiMail className="w-4 h-4" />
                                        <span>Email Address</span>
                                    </label>
                                    <p className="text-gray-900 dark:text-white px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                        {currentUser.email}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                        Email cannot be changed
                                    </p>
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        <FiPhone className="w-4 h-4" />
                                        <span>Phone Number</span>
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+1 (234) 567-890"
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <p className="text-gray-900 dark:text-white px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            {formData.phone || 'Not set'}
                                        </p>
                                    )}
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        <FiMapPin className="w-4 h-4" />
                                        <span>Address</span>
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="123 Main St, City, State"
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <p className="text-gray-900 dark:text-white px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            {formData.address || 'Not set'}
                                        </p>
                                    )}
                                </div>

                                {/* Bio */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Bio
                                    </label>
                                    {isEditing ? (
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleChange}
                                            rows="4"
                                            placeholder="Tell us about yourself..."
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                        />
                                    ) : (
                                        <p className="text-gray-900 dark:text-white px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg min-h-[100px]">
                                            {formData.bio || 'Not set'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
