import React, { useEffect, useMemo, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import slide1 from '../assets/slide1.jpg';
import slide2 from '../assets/slide2.jpg';
import slide3 from '../assets/slide3.jpg';
import PropertyCard from './PropertyCard';
import ParticlesImage from '../assets/Particles.png';
import WhyChooseUsImage from '../assets/WhyChooseUs.png'; // Make sure this path is correct
// Assuming you have an icon library like react-icons installed
// import { FaCheckCircle, FaUserTie, FaShieldAlt, FaMapMarkerAlt, FaRegHeart, FaKey } from 'react-icons/fa';

const Home = () => {
    const [properties, setProperties] = useState([]);
    const slides = useMemo(() => [
        {
            id: 1,
            title: 'Find Your Dream Home',
            description: 'Explore thousands of premium properties listed exclusively for you',
            bgColor: `url(${slide1})`,
        },
        {
            id: 2,
            title: 'Expert Real Estate Services',
            description: 'Get professional guidance from our experienced real estate agents',
            bgColor: `url(${slide2})`,
        },
        {
            id: 3,
            title: 'Secure Your Investment',
            description: 'Transparent transactions and legal support for peace of mind',
            bgColor: `url(${slide3})`,
        }
    ], []);

    useEffect(() => {
        // Mocking the fetch call for demonstration, as the provided URL might not be active
        // In a real application, you'd keep the original fetch:
        fetch("http://localhost:3000/property?sortBy=price&order=desc")
        .then(res => res.json())
        .then(data => {
            data = data.slice(0, 6); // Get only the top 6 properties
            setProperties(data);
        })
        .catch(err => console.error(err));

        // For testing without a backend:
        // const mockProperties = [
        // 	 { _id: '1', title: 'Luxury Villa', location: 'Beverly Hills', price: 5000000, beds: 5, baths: 6, sqft: 7500, imageUrl: 'https://via.placeholder.com/400x300?text=Property+1' },
        // 	 { _id: '2', title: 'Modern Condo', location: 'Downtown', price: 850000, beds: 2, baths: 2, sqft: 1200, imageUrl: 'https://via.placeholder.com/400x300?text=Property+2' },
        // 	 { _id: '3', title: 'Family House', location: 'Suburban Area', price: 320000, beds: 4, baths: 3, sqft: 2500, imageUrl: 'https://via.placeholder.com/400x300?text=Property+3' },
        // 	 { _id: '4', title: 'Penthouse View', location: 'City Center', price: 1200000, beds: 3, baths: 4, sqft: 1800, imageUrl: 'https://via.placeholder.com/400x300?text=Property+4' },
        // 	 { _id: '5', title: 'Rustic Cabin', location: 'Mountain Escape', price: 180000, beds: 1, baths: 1, sqft: 800, imageUrl: 'https://via.placeholder.com/400x300?text=Property+5' },
        // 	 { _id: '6', title: 'Beach Front', location: 'Coastal Town', price: 3500000, beds: 4, baths: 5, sqft: 4500, imageUrl: 'https://via.placeholder.com/400x300?text=Property+6' },
        // ];
        // setProperties(mockProperties);
    },[])

    // --- Static Why Choose Us Section Component (REPLACED CUSTOM SHADOWS) ---
    const WhyChooseUs = () => (
        <section 
            className='py-20 px-4 md:px-8 relative overflow-hidden bg-cover bg-center min-h-[400px] flex flex-col justify-center'
            style={{
                backgroundImage: `url('${WhyChooseUsImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        > 
            {/* Added a subtle overlay for better text contrast */}
            <div className='absolute inset-0 bg-black opacity-40'></div>

            {/* Replaced 'shadow-text-blue' with 'drop-shadow-2xl' for strong contrast */}
            <h2 className='text-center mb-16 bebas-neue-content text-5xl text-white relative z-10 tracking-wider drop-shadow-2xl'>
                WHY CHOOSE US?
            </h2>
            <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10'>
                {/* Trusted Expertise */}
                <div className='text-center flex flex-col items-center p-4 transition duration-300 hover:scale-105'>
                    {/* Increased size and added blue glow/shadow (using drop-shadow-lg) */}
                    <div className='text-6xl text-blue-400 mb-6 drop-shadow-lg'>🏆</div> 
                    {/* Replaced 'shadow-text-sm' with 'drop-shadow-lg' */}
                    <h3 className='text-2xl font-bold mb-2 text-white drop-shadow-lg'>Trusted Expertise</h3>
                    {/* Increased text size slightly and increased max width */}
                    <p className='text-gray-300 text-base max-w-[200px]'>Years of experience and deep market knowledge guarantee the best advice.</p>
                </div>
                
                {/* Client-Centric Approach */}
                <div className='text-center flex flex-col items-center p-4 transition duration-300 hover:scale-105'>
                    <div className='text-6xl text-blue-400 mb-6 drop-shadow-lg'>🤝</div> 
                    <h3 className='text-2xl font-bold mb-2 text-white drop-shadow-lg'>Client-Centric Approach</h3>
                    <p className='text-gray-300 text-base max-w-[200px]'>Your needs come first. We customize our services to your specific goals.</p>
                </div>
                
                {/* Seamless Transactions */}
                <div className='text-center flex flex-col items-center p-4 transition duration-300 hover:scale-105'>
                    <div className='text-6xl text-blue-400 mb-6 drop-shadow-lg'>🔒</div> 
                    <h3 className='text-2xl font-bold mb-2 text-white drop-shadow-lg'>Seamless Transactions</h3>
                    <p className='text-gray-300 text-base max-w-[200px]'>We handle all the complexities, ensuring a smooth and stress-free closing process.</p>
                </div>
                
                {/* Exclusive Listings */}
                <div className='text-center flex flex-col items-center p-4 transition duration-300 hover:scale-105'>
                    <div className='text-6xl text-blue-400 mb-6 drop-shadow-lg'>🌐</div> 
                    <h3 className='text-2xl font-bold mb-2 text-white drop-shadow-lg'>Exclusive Listings</h3>
                    <p className='text-gray-300 text-base max-w-[200px]'>Access to premium properties that aren't available on the open market.</p>
                </div>
            </div>
        </section>
    );

    // --- Extra Section 1: Our Simple Process (REPLACED CUSTOM SHADOWS) ---
    const OurSimpleProcess = () => (
        <section
            className='py-20 px-4 md:px-8 relative overflow-hidden bg-cover bg-center bg-no-repeat min-h-[450px] flex flex-col justify-center'
            style={{
                backgroundImage: `url('${ParticlesImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Replaced 'shadow-text-blue' with 'drop-shadow-2xl' for strong contrast */}
            <h2 className='text-center mb-16 bebas-neue-content text-5xl text-white opacity-90 relative z-10 tracking-wider drop-shadow-2xl'>
                OUR SIMPLE PROCESS
            </h2>
            <div className='max-w-6xl mx-auto relative z-10'>
                {/* Replaced the simple connector line with hidden/visible arrow indicators */}
                <div className='hidden md:flex absolute top-[90px] left-0 right-0 justify-between items-center px-4'>
                    <div className='w-full h-1 bg-blue-400/30 -mx-4'></div> {/* The main line */}
                    {/* Add arrows on top of the line */}
                    <div className='absolute left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-blue-400 opacity-70'>&gt;</div>
                    <div className='absolute right-1/3 top-1/2 transform translate-x-1/2 -translate-y-1/2 text-2xl text-blue-400 opacity-70'>&gt;</div>
                </div>


                <div className='flex flex-col md:flex-row justify-between items-start space-y-12 md:space-y-0 md:space-x-12'>
                    {/* Step 1 */}
                    <div className='flex flex-col items-center text-center flex-1 relative'>
                        {/* Number Circle - Added standard 'shadow-2xl' for emphasis */}
                        <div className='w-24 h-24 rounded-full bg-blue-900 bg-opacity-80 text-white flex items-center justify-center text-4xl font-extrabold mb-4 border-4 border-blue-400 shadow-2xl transition duration-300 hover:scale-105'>
                            1
                        </div>
                        {/* Content - Replaced 'shadow-text-sm' with 'drop-shadow-md' */}
                        <h3 className='text-2xl font-bold mb-2 text-white mt-4 drop-shadow-md'>Search & Discover</h3>
                        <p className='text-gray-300 max-w-xs text-base'>Use our advanced filters to find properties that match your exact criteria.</p>
                    </div>

                    {/* Separator/Arrow on mobile */}
                    <div className='md:hidden w-full flex justify-center relative'>
                        <div className='w-0.5 h-12 bg-blue-400 opacity-30'></div>
                        <div className='absolute top-1/2 transform -translate-y-1/2 text-2xl text-blue-400'>&#x25BC;</div> {/* Downward Arrow */}
                    </div>

                    {/* Step 2 */}
                    <div className='flex flex-col items-center text-center flex-1 relative'>
                        {/* Number Circle - Added standard 'shadow-2xl' for emphasis */}
                        <div className='w-24 h-24 rounded-full bg-blue-900 bg-opacity-80 text-white flex items-center justify-center text-4xl font-extrabold mb-4 border-4 border-blue-400 shadow-2xl transition duration-300 hover:scale-105'>
                            2
                        </div>
                        {/* Content - Replaced 'shadow-text-sm' with 'drop-shadow-md' */}
                        <h3 className='text-2xl font-bold mb-2 text-white mt-4 drop-shadow-md'>Tour & Evaluate</h3>
                        <p className='text-gray-300 max-w-xs text-base'>Schedule virtual or in-person tours and get expert valuation reports.</p>
                    </div>

                    {/* Separator/Arrow on mobile */}
                    <div className='md:hidden w-full flex justify-center relative'>
                        <div className='w-0.5 h-12 bg-blue-400 opacity-30'></div>
                        <div className='absolute top-1/2 transform -translate-y-1/2 text-2xl text-blue-400'>&#x25BC;</div> {/* Downward Arrow */}
                    </div>

                    {/* Step 3 */}
                    <div className='flex flex-col items-center text-center flex-1 relative'>
                        {/* Number Circle - Added standard 'shadow-2xl' for emphasis */}
                        <div className='w-24 h-24 rounded-full bg-blue-900 bg-opacity-80 text-white flex items-center justify-center text-4xl font-extrabold mb-4 border-4 border-blue-400 shadow-2xl transition duration-300 hover:scale-105'>
                            3
                        </div>
                        {/* Content - Replaced 'shadow-text-sm' with 'drop-shadow-md' */}
                        <h3 className='text-2xl font-bold mb-2 text-white mt-4 drop-shadow-md'>Close & Move In</h3>
                        <p className='text-gray-300 max-w-xs text-base'>Finalize the deal with our legal support and receive the keys to your new property.</p>
                    </div>
                </div>
            </div>
        </section>
    );

    // --- Extra Section 2: Client Testimonials (No change needed) ---
    const ClientTestimonials = () => (
        <section className='py-16 bg-gray-50 px-4 md:px-8'>
            <h2 className='text-center mb-12 bebas-neue-content text-4xl text-gray-800'>Hear From Our Clients</h2>
            <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8'>
                {/* Testimonial 1 */}
                <div className='bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-600'>
                    <p className='text-gray-700 italic mb-4'>
                        "The team was incredibly knowledgeable and helped us find the perfect investment property in a competitive market. The process was smooth from start to finish."
                    </p>
                    <div className='font-bold text-gray-800'>— Sarah L.</div>
                    <div className='text-sm text-gray-500'>Investor</div>
                </div>

                {/* Testimonial 2 */}
                <div className='bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-600'>
                    <p className='text-gray-700 italic mb-4'>
                        "Moving across the country was stressful, but our agent made the home-buying experience seamless. Their local expertise was invaluable."
                    </p>
                    <div className='font-bold text-gray-800'>— The Jonson Family</div>
                    <div className='text-sm text-gray-500'>New Home Owners</div>
                </div>

                {/* Testimonial 3 */}
                <div className='bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-600'>
                    <p className='text-gray-700 italic mb-4'>
                        "We sold our apartment in record time and for a price higher than expected. The professional photography and marketing were top-notch."
                    </p>
                    <div className='font-bold text-gray-800'>— Michael P.</div>
                    <div className='text-sm text-gray-500'>Seller</div>
                </div>
            </div>
        </section>
    );
    // --- End of new components ---

    return (
        <div className='w-full'>
            <div className='carousel-container'>
                <h1 className='text-center mt-10 bebas-neue-content text-4xl text-gray-800'> What We Offer </h1>
                <Carousel
                    autoPlay
                    infiniteLoop
                    showThumbs={false}
                    showStatus={false}
                    interval={5000}
                    transitionTime={800}
                    swipeable={true}
                    emulateTouch={true}
                >
                    {slides.map((slide) => (
                        <div
                            key={slide.id}
                            className={`h-96 flex flex-col items-center justify-center text-white px-8 bg-cover bg-center relative`}
                            style={{ backgroundImage: slide.bgColor }}
                        >
                            {/* Overlay for better text readability */}
                            <div className='absolute inset-0 bg-black opacity-40'></div> 
                            <div className='relative z-10'>
                                <h2 className='text-4xl md:text-5xl font-bold mb-4 text-center'>
                                    {slide.title}
                                </h2>
                                <p className='text-lg md:text-xl text-center max-w-2xl opacity-90'>
                                    {slide.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </Carousel>

                {/* --- Featured Properties Section --- */}
                <div className='mt-12 px-4 md:px-8'>
                    <h1 className='text-center mb-8 bebas-neue-content text-4xl text-gray-800'>Featured Properties</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {
                            properties.map(property => <PropertyCard key={property._id} property={property} />)
                        }
                    </div>
                </div>

                <hr className='my-16 border-gray-200' /> {/* Separator */}
                
                {/* --- 1. Why Choose Us Section (UPDATED) --- */}
                <WhyChooseUs />

                <hr className='my-16 border-gray-200' /> {/* Separator */}
                
                {/* --- 2. Our Simple Process Section (UPDATED) --- */}
                <OurSimpleProcess />

                <hr className='my-16 border-gray-200' /> {/* Separator */}

                {/* --- 3. Client Testimonials Section --- */}
                <ClientTestimonials />
                
                <div className='h-20'></div> {/* Final padding/spacer */}
            </div>
        </div>
    );
};

export default Home;