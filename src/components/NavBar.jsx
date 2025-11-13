import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../auth/useAuth';
import HomeImage from '../assets/Home.jpg';
import PropertiesImage from '../assets/Properties.jpg';
import AddProperties from '../assets/AddProperties.jpg';
import MyPropertiesImage from '../assets/MyProperties.jpg';
import MyRatingsImage from '../assets/MyRatings.jpg';
const NavBar = () => {
    const {currentUser, logout} = useAuth();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [bg, setNewBg] = useState(null);
    const [heroText, setHeroText] = useState('');
    function handleInOut() {
        if (currentUser) {
            logout()
        }
        setIsMenuOpen(false);
    }

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    }

    const links = <>
        <NavLink 
            to="/" 
            className={({isActive}) => `bebas-neue-regular text-lg sm:text-xl md:text-2xl transition-all duration-200 ${isActive ? 'underline decoration-2 underline-offset-4' : 'hover:underline hover:underline-offset-4'}`}
            onClick={handleLinkClick}
        >
            Home
        </NavLink>
        <NavLink 
            to="/all-properties" 
            className={({isActive}) => `bebas-neue-regular text-lg sm:text-xl md:text-2xl transition-all duration-200 ${isActive ? 'underline decoration-2 underline-offset-4' : 'hover:underline hover:underline-offset-4'}`}
            onClick={handleLinkClick}
        >
            All Properties
        </NavLink>
        <NavLink 
            to="/add-property" 
            className={({isActive}) => `bebas-neue-regular text-lg sm:text-xl md:text-2xl transition-all duration-200 ${isActive ? 'underline decoration-2 underline-offset-4' : 'hover:underline hover:underline-offset-4'}`}
            onClick={handleLinkClick}
        >
            Add Property
        </NavLink>
        <NavLink 
            to="/my-properties" 
            className={({isActive}) => `bebas-neue-regular text-lg sm:text-xl md:text-2xl transition-all duration-200 ${isActive ? 'underline decoration-2 underline-offset-4' : 'hover:underline hover:underline-offset-4'}`}
            onClick={handleLinkClick}
        >
            My Properties
        </NavLink>
        <NavLink 
            to="/my-ratings" 
            className={({isActive}) => `bebas-neue-regular text-lg sm:text-xl md:text-2xl transition-all duration-200 ${isActive ? 'underline decoration-2 underline-offset-4' : 'hover:underline hover:underline-offset-4'}`}
            onClick={handleLinkClick}
        >
            My Ratings
        </NavLink>
    </>
    const backgroundImages = {
        '/': `url(${HomeImage})`,
        '/all-properties': `url(${PropertiesImage})`,
        '/add-property': `url(${AddProperties})`,
        '/my-properties': `url(${MyPropertiesImage})`,
        '/my-ratings': `url(${MyRatingsImage})`,
    }
    const heroTexts = {
        '/': 'Find Your Dream Home',
        '/all-properties': 'Explore All Properties',
        '/add-property': 'List Your Property Today',
        '/my-properties': 'Your Properties',
        '/my-ratings': 'Your Ratings & Reviews',
    }
    useEffect(() => {
        setNewBg(backgroundImages[location.pathname] || 'none');
        setHeroText(heroTexts[location.pathname] || '');
    }, [location]);

    return (
        <div 
            className='relative bg-cover bg-center bg-no-repeat transition-all duration-300 text-white' 
            style={{
                backgroundImage: bg || 'none', 
                minHeight: '100vh',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/40 via-black/20 to-transparent pointer-events-none"></div>

            {/* Navigation Container */}
            <nav className='relative z-10 px-4 sm:px-6 md:px-8 py-5 sm:py-6 md:py-8'>
                <div className='flex justify-between items-center'>
                    {/* Mobile Menu Button */}
                    <button 
                        className='md:hidden flex flex-col gap-1.5 z-50 hover:opacity-70 transition-opacity'
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>

                    {/* Desktop Navigation Links */}
                    <div className='flex gap-4 justify-end lg:gap-6 w-[55%] md:justify-between items-center'>
                        <div className='hidden md:flex gap-4 lg:gap-8'>
                            {links}
                        </div>
                    </div>

                    {/* Login/Logout Button */}
                    <div className='ml-auto md:ml-0'>
                        <NavLink 
                            to={currentUser ? "/" : "/login"} 
                            onClick={handleInOut} 
                            className={({isActive}) => `bebas-neue-regular text-lg sm:text-xl md:text-2xl transition-all duration-200 px-3 py-1 rounded-sm ${isActive ? 'bg-white/20 underline' : 'hover:bg-white/10'}`}
                        >
                            {currentUser ? "Logout" : "Login"}
                        </NavLink>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div 
                    className={`md:hidden fixed inset-0 bg-black bg-opacity-95 z-40 transition-transform duration-300 ${
                        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <div className='flex flex-col items-center justify-center h-full gap-8'>
                        {links}
                    </div>
                </div>
            </nav>

            <div className='flex items-center justify-center h-[calc(100vh-120px)]'>
                {/* Placeholder for page content */}
                <h1 className="momo-signature-regular text-4xl md:text-6xl drop-shadow-lg text-center transition-all duration-700 delay-700" key={location.pathname}>{heroText}</h1>
            </div>
        </div>
    );
};

export default NavBar;