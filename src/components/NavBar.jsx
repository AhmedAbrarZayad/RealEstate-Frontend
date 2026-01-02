import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../auth/useAuth';
import { useTheme } from '../context/ThemeContext';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FiSun, FiMoon, FiMenu, FiX, FiUser, FiLogOut, FiHome, FiGrid, FiPlusCircle, FiList, FiStar, FiSettings, FiBarChart2 } from 'react-icons/fi';
import HomeImage from '../assets/Home.jpg';
import PropertiesImage from '../assets/Properties.jpg';
import AddProperties from '../assets/AddProperties.jpg';
import MyPropertiesImage from '../assets/MyProperties.jpg';
import MyRatingsImage from '../assets/MyRatings.jpg';

const NavBar = () => {
    const { currentUser, logout } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [bg, setNewBg] = useState(null);
    const [heroText, setHeroText] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);

    // Track scroll for sticky navbar effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    function handleInOut() {
        if (currentUser) {
            logout();
        }
        setIsMenuOpen(false);
    }

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    const publicLinks = [
        { to: '/', label: 'Home', icon: <FiHome /> },
        { to: '/all-properties', label: 'Properties', icon: <FiGrid /> },
    ];

    const protectedLinks = currentUser ? [
        { to: '/add-property', label: 'Add Property', icon: <FiPlusCircle /> },
        { to: '/my-properties', label: 'My Properties', icon: <FiList /> },
        { to: '/my-ratings', label: 'My Ratings', icon: <FiStar /> },
        { to: '/dashboard', label: 'Dashboard', icon: <FiBarChart2 /> },
    ] : [];

    const allLinks = [...publicLinks, ...protectedLinks];

    const backgroundImages = {
        '/': `url(${HomeImage})`,
        '/all-properties': `url(${PropertiesImage})`,
        '/add-property': `url(${AddProperties})`,
        '/my-properties': `url(${MyPropertiesImage})`,
        '/my-ratings': `url(${MyRatingsImage})`,
    };

    const heroTexts = {
        '/': 'Find Your Dream Home',
        '/all-properties': 'Explore All Properties',
        '/add-property': 'List Your Property Today',
        '/my-properties': 'Your Properties',
        '/my-ratings': 'Your Ratings & Reviews',
    };

    useEffect(() => {
        setNewBg(backgroundImages[location.pathname] || 'none');
        setHeroText(heroTexts[location.pathname] || '');
    }, [location]);

    // Hide hero section on certain pages
    const hideHero = location.pathname.includes('/property/') || 
                     location.pathname.includes('/dashboard') || 
                     location.pathname.includes('/profile') ||
                     location.pathname.includes('/about') ||
                     location.pathname.includes('/contact');

    return (
        <div 
            className={`relative transition-all duration-300 ${
                hideHero ? 'min-h-0' : 'min-h-screen'
            }`}
            style={!hideHero ? {
                backgroundImage: bg || 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            } : {}}
        >
            {!hideHero && (
                <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent pointer-events-none"></div>
            )}

            {/* Sticky Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled || hideHero 
                    ? 'bg-white dark:bg-gray-900 shadow-lg' 
                    : 'bg-transparent'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <NavLink 
                            to="/" 
                            className="flex items-center space-x-2 group"
                            onClick={handleLinkClick}
                        >
                            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                🏡 RealEstate
                            </div>
                        </NavLink>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {publicLinks.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    onClick={handleLinkClick}
                                    className={({ isActive }) =>
                                        `flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                            isActive
                                                ? 'bg-blue-600 text-white'
                                                : isScrolled || hideHero
                                                ? 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                                                : 'text-white hover:bg-white/10'
                                        }`
                                    }
                                >
                                    <span className="text-lg">{link.icon}</span>
                                    <span>{link.label}</span>
                                </NavLink>
                            ))}

                            {/* Protected Links Dropdown */}
                            {currentUser && protectedLinks.length > 0 && (
                                <Menu as="div" className="relative">
                                    <Menu.Button className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                        isScrolled || hideHero
                                            ? 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                                            : 'text-white hover:bg-white/10'
                                    }`}>
                                        <FiSettings className="text-lg" />
                                        <span>More</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="p-1">
                                                {protectedLinks.map((link) => (
                                                    <Menu.Item key={link.to}>
                                                        {({ active }) => (
                                                            <NavLink
                                                                to={link.to}
                                                                onClick={handleLinkClick}
                                                                className={`${
                                                                    active ? 'bg-gray-100 dark:bg-gray-700' : ''
                                                                } flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-200 rounded-md transition-colors`}
                                                            >
                                                                <span className="text-lg">{link.icon}</span>
                                                                <span>{link.label}</span>
                                                            </NavLink>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            )}
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center space-x-4">
                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-lg transition-all duration-200 ${
                                    isScrolled || hideHero
                                        ? 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        : 'text-white hover:bg-white/10'
                                }`}
                                aria-label="Toggle theme"
                            >
                                {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                            </button>

                            {/* User Menu or Login */}
                            {currentUser ? (
                                <Menu as="div" className="relative">
                                    <Menu.Button className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                        isScrolled || hideHero
                                            ? 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                                            : 'text-white hover:bg-white/10'
                                    }`}>
                                        {currentUser.photoURL ? (
                                            <img 
                                                src={currentUser.photoURL} 
                                                alt="Profile" 
                                                className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-600"
                                            />
                                        ) : (
                                            <FiUser className="w-5 h-5" />
                                        )}
                                        <span className="hidden md:inline">{currentUser.displayName || 'User'}</span>
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="p-1">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <NavLink
                                                            to="/profile"
                                                            onClick={handleLinkClick}
                                                            className={`${
                                                                active ? 'bg-gray-100 dark:bg-gray-700' : ''
                                                            } flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-200 rounded-md transition-colors`}
                                                        >
                                                            <FiUser />
                                                            <span>Profile</span>
                                                        </NavLink>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={handleInOut}
                                                            className={`${
                                                                active ? 'bg-gray-100 dark:bg-gray-700' : ''
                                                            } flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-200 rounded-md transition-colors w-full text-left`}
                                                        >
                                                            <FiLogOut />
                                                            <span>Logout</span>
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            ) : (
                                <NavLink
                                    to="/login"
                                    className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                                        isScrolled || hideHero
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : 'bg-white text-blue-600 hover:bg-gray-100'
                                    }`}
                                >
                                    Login
                                </NavLink>
                            )}

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`lg:hidden p-2 rounded-lg transition-all duration-200 ${
                                    isScrolled || hideHero
                                        ? 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        : 'text-white hover:bg-white/10'
                                }`}
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <Transition
                    show={isMenuOpen}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                >
                    <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                        <div className="px-4 py-4 space-y-2">
                            {allLinks.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    onClick={handleLinkClick}
                                    className={({ isActive }) =>
                                        `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                                            isActive
                                                ? 'bg-blue-600 text-white'
                                                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`
                                    }
                                >
                                    <span className="text-lg">{link.icon}</span>
                                    <span>{link.label}</span>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </Transition>
            </nav>

            {/* Hero Section */}
            {!hideHero && (
                <div className="relative flex items-center justify-center h-screen pt-20">
                    <h1 className="momo-signature-regular text-5xl md:text-7xl text-white drop-shadow-2xl text-center px-4 transition-all duration-700">
                        {heroText}
                    </h1>
                </div>
            )}
        </div>
    );
};

export default NavBar;
