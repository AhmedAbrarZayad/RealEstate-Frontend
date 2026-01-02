import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiAward, FiUsers, FiHeart, FiTrendingUp, FiShield } from 'react-icons/fi';

const About = () => {
    const values = [
        {
            icon: <FiTarget className="w-8 h-8" />,
            title: 'Our Mission',
            description: 'To make real estate transactions transparent, accessible, and stress-free for everyone.'
        },
        {
            icon: <FiAward className="w-8 h-8" />,
            title: 'Excellence',
            description: 'We strive for excellence in every property we list and every client we serve.'
        },
        {
            icon: <FiUsers className="w-8 h-8" />,
            title: 'Community Focus',
            description: 'Building lasting relationships with our clients and communities.'
        },
        {
            icon: <FiHeart className="w-8 h-8" />,
            title: 'Customer First',
            description: 'Your satisfaction and happiness are at the core of everything we do.'
        },
        {
            icon: <FiTrendingUp className="w-8 h-8" />,
            title: 'Innovation',
            description: 'Leveraging technology to provide the best real estate experience.'
        },
        {
            icon: <FiShield className="w-8 h-8" />,
            title: 'Integrity',
            description: 'Honest, transparent, and ethical practices in all our dealings.'
        }
    ];

    const team = [
        {
            name: 'John Smith',
            role: 'CEO & Founder',
            image: 'https://ui-avatars.com/api/?name=John+Smith&size=200&background=3b82f6&color=fff',
            bio: '15+ years in real estate with a passion for innovation'
        },
        {
            name: 'Sarah Johnson',
            role: 'Head of Operations',
            image: 'https://ui-avatars.com/api/?name=Sarah+Johnson&size=200&background=7c3aed&color=fff',
            bio: 'Expert in streamlining processes and customer satisfaction'
        },
        {
            name: 'Michael Chen',
            role: 'Chief Technology Officer',
            image: 'https://ui-avatars.com/api/?name=Michael+Chen&size=200&background=f59e0b&color=fff',
            bio: 'Technology visionary transforming real estate digital experience'
        },
        {
            name: 'Emily Davis',
            role: 'Senior Real Estate Agent',
            image: 'https://ui-avatars.com/api/?name=Emily+Davis&size=200&background=10b981&color=fff',
            bio: 'Dedicated to finding perfect homes for families'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                        About Us
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        We are a team of passionate real estate professionals committed to helping you find your dream property. 
                        With years of experience and a customer-first approach, we make property transactions seamless and enjoyable.
                    </p>
                </motion.div>

                {/* Story Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 mb-16 border border-gray-200 dark:border-gray-700"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        Our Story
                    </h2>
                    <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                        <p>
                            Founded in 2010, RealEstate has grown from a small local agency to one of the most trusted 
                            real estate platforms in the region. Our journey began with a simple mission: to make property 
                            buying and selling transparent, efficient, and accessible to everyone.
                        </p>
                        <p>
                            Over the years, we've helped thousands of families find their dream homes, assisted investors 
                            in making smart property decisions, and supported sellers in achieving the best value for their 
                            properties. Our success is built on trust, expertise, and a genuine commitment to our clients' satisfaction.
                        </p>
                        <p>
                            Today, we continue to innovate and adapt to the changing real estate landscape, leveraging 
                            technology to provide you with the best possible experience. Whether you're buying your first home, 
                            investing in commercial property, or looking for the perfect rental, we're here to guide you every step of the way.
                        </p>
                    </div>
                </motion.div>

                {/* Values Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
                        Our Values
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                            >
                                <div className="text-blue-600 mb-4">{value.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Team Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
                        Meet Our Team
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {member.name}
                                    </h3>
                                    <p className="text-blue-600 font-semibold mb-3">
                                        {member.role}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {member.bio}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Statistics */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">
                        Our Impact
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <div className="text-5xl font-bold mb-2">1200+</div>
                            <div className="text-white/80">Properties Sold</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">3500+</div>
                            <div className="text-white/80">Happy Clients</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">150+</div>
                            <div className="text-white/80">Expert Agents</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">50+</div>
                            <div className="text-white/80">Cities Covered</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
