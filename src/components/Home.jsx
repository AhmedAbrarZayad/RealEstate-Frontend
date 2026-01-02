import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FiSearch, FiHome, FiDollarSign, FiMapPin, FiUsers, FiAward, FiShield, FiTrendingUp, FiCheckCircle, FiStar, FiArrowRight, FiPhone } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import PropertyCard from './PropertyCard';
import slide1 from '../assets/slide1.jpg';
import slide2 from '../assets/slide2.jpg';
import slide3 from '../assets/slide3.jpg';
import { API_BASE } from '../config/api';

const API_BASE_URL = API_BASE;

const Home = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats] = useState({
        properties: 1200,
        clients: 3500,
        agents: 150,
        cities: 50
    });

    useEffect(() => {
        fetch(`${API_BASE_URL}/property?sortBy=price&order=desc`)
            .then(res => res.json())
            .then(data => {
                setProperties(data.slice(0, 6));
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    // Section 1: Hero Carousel
    const HeroCarousel = () => {
        const slides = [
            {
                id: 1,
                title: 'Find Your Dream Home',
                description: 'Explore thousands of premium properties listed exclusively for you',
                image: slide1,
            },
            {
                id: 2,
                title: 'Expert Real Estate Services',
                description: 'Get professional guidance from our experienced real estate agents',
                image: slide2,
            },
            {
                id: 3,
                title: 'Secure Your Investment',
                description: 'Transparent transactions and legal support for peace of mind',
                image: slide3,
            }
        ];

        return (
            <section className="w-full max-h-[70vh] overflow-hidden">
                <Carousel
                    autoPlay
                    infiniteLoop
                    showThumbs={false}
                    showStatus={false}
                    interval={5000}
                    transitionTime={800}
                    swipeable={true}
                    emulateTouch={true}
                    showIndicators={true}
                >
                    {slides.map((slide) => (
                        <div
                            key={slide.id}
                            className="relative h-[60vh] md:h-[70vh] flex items-center justify-center bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
                            <div className="relative z-10 max-w-7xl mx-auto px-4 text-left">
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                                >
                                    {slide.title}
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-2xl"
                                >
                                    {slide.description}
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                >
                                    <NavLink
                                        to="/all-properties"
                                        className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
                                    >
                                        <span>Explore Properties</span>
                                        <FiArrowRight />
                                    </NavLink>
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </section>
        );
    };

    // Section 2: Statistics
    const Statistics = () => (
        <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                            {stats.properties}+
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 font-medium">Properties Listed</div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-center"
                    >
                        <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
                            {stats.clients}+
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 font-medium">Happy Clients</div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-center"
                    >
                        <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                            {stats.agents}+
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 font-medium">Expert Agents</div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-center"
                    >
                        <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">
                            {stats.cities}+
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 font-medium">Cities Covered</div>
                    </motion.div>
                </div>
            </div>
        </section>
    );

    // Section 3: Features
    const Features = () => {
        const features = [
            {
                icon: <FiSearch className="w-8 h-8" />,
                title: 'Advanced Search',
                description: 'Find properties using powerful filters and smart search technology'
            },
            {
                icon: <FiHome className="w-8 h-8" />,
                title: 'Quality Listings',
                description: 'Browse verified properties from trusted sellers and agents'
            },
            {
                icon: <FiDollarSign className="w-8 h-8" />,
                title: 'Best Prices',
                description: 'Competitive pricing and transparent cost breakdowns'
            },
            {
                icon: <FiMapPin className="w-8 h-8" />,
                title: 'Prime Locations',
                description: 'Properties in the most desirable neighborhoods and areas'
            },
            {
                icon: <FiUsers className="w-8 h-8" />,
                title: 'Expert Agents',
                description: 'Professional guidance from experienced real estate experts'
            },
            {
                icon: <FiShield className="w-8 h-8" />,
                title: 'Secure Transactions',
                description: 'Safe and protected transactions with legal support'
            }
        ];

        return (
            <section className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            Why Choose Us
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            We provide comprehensive real estate services to make your property journey seamless
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <div className="text-blue-600 mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        );
    };

    // Section 4: Featured Properties
    const FeaturedProperties = () => (
        <section className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Featured Properties
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Explore our handpicked selection of premium properties
                    </p>
                </motion.div>
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="skeleton h-96 rounded-xl"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {properties.map((property) => (
                            <PropertyCard key={property._id} property={property} />
                        ))}
                    </div>
                )}
                <div className="text-center mt-12">
                    <NavLink
                        to="/all-properties"
                        className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200"
                    >
                        <span>View All Properties</span>
                        <FiArrowRight />
                    </NavLink>
                </div>
            </div>
        </section>
    );

    // Section 5: How It Works
    const HowItWorks = () => {
        const steps = [
            {
                number: '01',
                title: 'Search & Discover',
                description: 'Use our advanced search filters to find properties that match your requirements',
                icon: <FiSearch className="w-8 h-8" />
            },
            {
                number: '02',
                title: 'Contact & Visit',
                description: 'Schedule property tours and get in touch with our expert agents',
                icon: <FiPhone className="w-8 h-8" />
            },
            {
                number: '03',
                title: 'Make an Offer',
                description: 'Submit your offer and negotiate the best deal with our support',
                icon: <FiDollarSign className="w-8 h-8" />
            },
            {
                number: '04',
                title: 'Close the Deal',
                description: 'Complete the paperwork and move into your dream property',
                icon: <FiCheckCircle className="w-8 h-8" />
            }
        ];

        return (
            <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            How It Works
                        </h2>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            Four simple steps to find and secure your perfect property
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="bg-white/10 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    {step.icon}
                                </div>
                                <div className="text-5xl font-bold text-white/20 mb-4">
                                    {step.number}
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                                <p className="text-white/80">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        );
    };

    // Section 6: Testimonials
    const Testimonials = () => {
        const testimonials = [
            {
                name: 'Sarah Johnson',
                role: 'Home Buyer',
                image: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=3b82f6&color=fff',
                rating: 5,
                comment: 'Found my dream home within a week! The service was exceptional and the process was smooth.'
            },
            {
                name: 'Michael Chen',
                role: 'Property Investor',
                image: 'https://ui-avatars.com/api/?name=Michael+Chen&background=7c3aed&color=fff',
                rating: 5,
                comment: 'Best real estate platform I have used. Great investment opportunities and professional agents.'
            },
            {
                name: 'Emily Davis',
                role: 'First Time Buyer',
                image: 'https://ui-avatars.com/api/?name=Emily+Davis&background=f59e0b&color=fff',
                rating: 5,
                comment: 'As a first-time buyer, I felt supported throughout. Highly recommend this platform!'
            }
        ];

        return (
            <section className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            What Our Clients Say
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Real experiences from satisfied customers
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg"
                            >
                                <div className="flex items-center mb-6">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-16 h-16 rounded-full mr-4"
                                    />
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 italic">
                                    "{testimonial.comment}"
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        );
    };

    // Section 7: Property Categories
    const PropertyCategories = () => {
        const categories = [
            { name: 'Apartments', count: 450, icon: '🏢' },
            { name: 'Houses', count: 380, icon: '🏠' },
            { name: 'Villas', count: 220, icon: '🏡' },
            { name: 'Commercial', count: 150, icon: '🏭' }
        ];

        return (
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            Browse by Category
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Find properties that match your lifestyle
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {categories.map((category, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-xl text-center hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                            >
                                <div className="text-6xl mb-4">{category.icon}</div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    {category.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {category.count} Properties
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        );
    };

    // Section 8: Trust Indicators
    const TrustIndicators = () => {
        const indicators = [
            { icon: <FiAward />, title: 'Award Winning', description: 'Industry recognition for excellence' },
            { icon: <FiShield />, title: 'Secure Platform', description: 'Your data is safe with us' },
            { icon: <FiTrendingUp />, title: 'Market Expertise', description: 'Deep insights and analysis' },
            { icon: <FiCheckCircle />, title: 'Verified Listings', description: 'All properties are verified' }
        ];

        return (
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {indicators.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-blue-600 text-4xl mb-4 flex justify-center">
                                    {item.icon}
                                </div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                                    {item.title}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        );
    };

    // Section 9: Newsletter
    const Newsletter = () => (
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Stay Updated
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Subscribe to get the latest property listings and market updates
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                            Subscribe
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );

    // Section 10: CTA
    const CallToAction = () => (
        <section className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Ready to Find Your Dream Home?
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                        Start your property search today and let us help you every step of the way
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <NavLink
                            to="/all-properties"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200"
                        >
                            Browse Properties
                        </NavLink>
                        <NavLink
                            to="/contact"
                            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200"
                        >
                            Contact Us
                        </NavLink>
                    </div>
                </motion.div>
            </div>
        </section>
    );

    return (
        <div className="w-full overflow-hidden bg-primary">
            <HeroCarousel />
            <Statistics />
            <Features />
            <FeaturedProperties />
            <HowItWorks />
            <PropertyCategories />
            <Testimonials />
            <TrustIndicators />
            <Newsletter />
            <CallToAction />
        </div>
    );
};

export default Home;
