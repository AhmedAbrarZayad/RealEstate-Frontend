import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 dark:bg-black text-white mt-20">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            🏡 RealEstate
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Your trusted partner in finding the perfect home. We offer premium properties and expert guidance for all your real estate needs.
                        </p>
                        {/* Social Links */}
                        <div className="flex space-x-4 pt-2">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                                aria-label="Facebook"
                            >
                                <FiFacebook className="w-5 h-5" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                                aria-label="Twitter"
                            >
                                <FiTwitter className="w-5 h-5" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-pink-400 transition-colors duration-200"
                                aria-label="Instagram"
                            >
                                <FiInstagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                                aria-label="LinkedIn"
                            >
                                <FiLinkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <NavLink
                                    to="/"
                                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/all-properties"
                                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                                >
                                    Properties
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                                >
                                    About Us
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/contact"
                                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                                >
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Services</h4>
                        <ul className="space-y-2">
                            <li className="text-gray-400 text-sm">Property Buying</li>
                            <li className="text-gray-400 text-sm">Property Selling</li>
                            <li className="text-gray-400 text-sm">Property Renting</li>
                            <li className="text-gray-400 text-sm">Real Estate Consultation</li>
                            <li className="text-gray-400 text-sm">Property Management</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <FiMapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-400 text-sm">
                                    123 Real Estate Ave, City, State 12345
                                </span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <FiPhone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                <a
                                    href="tel:+1234567890"
                                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                                >
                                    +1 (234) 567-890
                                </a>
                            </li>
                            <li className="flex items-center space-x-3">
                                <FiMail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                <a
                                    href="mailto:info@realestate.com"
                                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                                >
                                    info@realestate.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm text-center md:text-left">
                            © {currentYear} RealEstate. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <a
                                href="/privacy"
                                className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="/terms"
                                className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                            >
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
