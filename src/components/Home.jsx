import React, { useEffect, useMemo, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import slide1 from '../assets/slide1.jpg';
import slide2 from '../assets/slide2.jpg';
import slide3 from '../assets/slide3.jpg';
import PropertyCard from './PropertyCard';
import ParticlesImage from '../assets/Particles.png';
import WhyChooseUsImage from '../assets/WhyChooseUs.png';

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
        fetch("http://localhost:3000/property?sortBy=price&order=desc")
        .then(res => res.json())
        .then(data => {
            data = data.slice(0, 6);
            setProperties(data);
        })
        .catch(err => console.error(err));
    },[])

    const WhyChooseUs = () => (
        <section 
            className='py-12 md:py-20 px-4 md:px-8 relative overflow-hidden bg-cover bg-center min-h-[400px] flex flex-col justify-center'
            style={{
                backgroundImage: `url('${WhyChooseUsImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        > 
            <div className='absolute inset-0 bg-black opacity-40'></div>
            <h2 className='text-center mb-8 md:mb-16 bebas-neue-content text-3xl md:text-5xl text-white relative z-10 tracking-wider drop-shadow-2xl px-4'>
                WHY CHOOSE US?
            </h2>
            <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative z-10'>
                <div className='text-center flex flex-col items-center p-4 transition duration-300 hover:scale-105'>
                    <div className='text-5xl md:text-6xl text-blue-400 mb-4 md:mb-6 drop-shadow-lg'>🏆</div> 
                    <h3 className='text-xl md:text-2xl font-bold mb-2 text-white drop-shadow-lg'>Trusted Expertise</h3>
                    <p className='text-gray-300 text-sm md:text-base max-w-[200px]'>Years of experience and deep market knowledge guarantee the best advice.</p>
                </div>
                
                <div className='text-center flex flex-col items-center p-4 transition duration-300 hover:scale-105'>
                    <div className='text-5xl md:text-6xl text-blue-400 mb-4 md:mb-6 drop-shadow-lg'>🤝</div> 
                    <h3 className='text-xl md:text-2xl font-bold mb-2 text-white drop-shadow-lg'>Client-Centric Approach</h3>
                    <p className='text-gray-300 text-sm md:text-base max-w-[200px]'>Your needs come first. We customize our services to your specific goals.</p>
                </div>
                
                <div className='text-center flex flex-col items-center p-4 transition duration-300 hover:scale-105'>
                    <div className='text-5xl md:text-6xl text-blue-400 mb-4 md:mb-6 drop-shadow-lg'>🔒</div> 
                    <h3 className='text-xl md:text-2xl font-bold mb-2 text-white drop-shadow-lg'>Seamless Transactions</h3>
                    <p className='text-gray-300 text-sm md:text-base max-w-[200px]'>We handle all the complexities, ensuring a smooth and stress-free closing process.</p>
                </div>
                
                <div className='text-center flex flex-col items-center p-4 transition duration-300 hover:scale-105'>
                    <div className='text-5xl md:text-6xl text-blue-400 mb-4 md:mb-6 drop-shadow-lg'>🌐</div> 
                    <h3 className='text-xl md:text-2xl font-bold mb-2 text-white drop-shadow-lg'>Exclusive Listings</h3>
                    <p className='text-gray-300 text-sm md:text-base max-w-[200px]'>Access to premium properties that aren't available on the open market.</p>
                </div>
            </div>
        </section>
    );

    const OurSimpleProcess = () => (
        <section
            className='py-12 md:py-20 px-4 md:px-8 relative overflow-hidden bg-cover bg-center bg-no-repeat min-h-[450px] flex flex-col justify-center'
            style={{
                backgroundImage: `url('${ParticlesImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <h2 className='text-center mb-8 md:mb-16 bebas-neue-content text-3xl md:text-5xl text-white opacity-90 relative z-10 tracking-wider drop-shadow-2xl px-4'>
                OUR SIMPLE PROCESS
            </h2>
            <div className='max-w-6xl mx-auto relative z-10'>
                <div className='hidden md:flex absolute top-[90px] left-0 right-0 justify-between items-center px-4'>
                    <div className='w-full h-1 bg-blue-400/30 -mx-4'></div>
                    <div className='absolute left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-blue-400 opacity-70'>&gt;</div>
                    <div className='absolute right-1/3 top-1/2 transform translate-x-1/2 -translate-y-1/2 text-2xl text-blue-400 opacity-70'>&gt;</div>
                </div>

                <div className='flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0 md:space-x-12'>
                    <div className='flex flex-col items-center text-center flex-1 relative'>
                        <div className='w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-900 bg-opacity-80 text-white flex items-center justify-center text-3xl md:text-4xl font-extrabold mb-4 border-4 border-blue-400 shadow-2xl transition duration-300 hover:scale-105'>
                            1
                        </div>
                        <h3 className='text-xl md:text-2xl font-bold mb-2 text-white mt-4 drop-shadow-md'>Search & Discover</h3>
                        <p className='text-gray-300 max-w-xs text-sm md:text-base px-2'>Use our advanced filters to find properties that match your exact criteria.</p>
                    </div>

                    <div className='md:hidden w-full flex justify-center relative'>
                        <div className='w-0.5 h-12 bg-blue-400 opacity-30'></div>
                        <div className='absolute top-1/2 transform -translate-y-1/2 text-2xl text-blue-400'>&#x25BC;</div>
                    </div>

                    <div className='flex flex-col items-center text-center flex-1 relative'>
                        <div className='w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-900 bg-opacity-80 text-white flex items-center justify-center text-3xl md:text-4xl font-extrabold mb-4 border-4 border-blue-400 shadow-2xl transition duration-300 hover:scale-105'>
                            2
                        </div>
                        <h3 className='text-xl md:text-2xl font-bold mb-2 text-white mt-4 drop-shadow-md'>Tour & Evaluate</h3>
                        <p className='text-gray-300 max-w-xs text-sm md:text-base px-2'>Schedule virtual or in-person tours and get expert valuation reports.</p>
                    </div>

                    <div className='md:hidden w-full flex justify-center relative'>
                        <div className='w-0.5 h-12 bg-blue-400 opacity-30'></div>
                        <div className='absolute top-1/2 transform -translate-y-1/2 text-2xl text-blue-400'>&#x25BC;</div>
                    </div>

                    <div className='flex flex-col items-center text-center flex-1 relative'>
                        <div className='w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-900 bg-opacity-80 text-white flex items-center justify-center text-3xl md:text-4xl font-extrabold mb-4 border-4 border-blue-400 shadow-2xl transition duration-300 hover:scale-105'>
                            3
                        </div>
                        <h3 className='text-xl md:text-2xl font-bold mb-2 text-white mt-4 drop-shadow-md'>Close & Move In</h3>
                        <p className='text-gray-300 max-w-xs text-sm md:text-base px-2'>Finalize the deal with our legal support and receive the keys to your new property.</p>
                    </div>
                </div>
            </div>
        </section>
    );

    const ClientTestimonials = () => (
        <section className='py-12 md:py-16 bg-gray-50 px-4 md:px-8'>
            <h2 className='text-center mb-8 md:mb-12 bebas-neue-content text-3xl md:text-4xl text-gray-800'>Hear From Our Clients</h2>
            <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8'>
                <div className='bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-blue-600'>
                    <p className='text-gray-700 italic mb-4 text-sm md:text-base'>
                        "The team was incredibly knowledgeable and helped us find the perfect investment property in a competitive market. The process was smooth from start to finish."
                    </p>
                    <div className='font-bold text-gray-800'>— Sarah L.</div>
                    <div className='text-sm text-gray-500'>Investor</div>
                </div>

                <div className='bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-blue-600'>
                    <p className='text-gray-700 italic mb-4 text-sm md:text-base'>
                        "Moving across the country was stressful, but our agent made the home-buying experience seamless. Their local expertise was invaluable."
                    </p>
                    <div className='font-bold text-gray-800'>— The Jonson Family</div>
                    <div className='text-sm text-gray-500'>New Home Owners</div>
                </div>

                <div className='bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-blue-600'>
                    <p className='text-gray-700 italic mb-4 text-sm md:text-base'>
                        "We sold our apartment in record time and for a price higher than expected. The professional photography and marketing were top-notch."
                    </p>
                    <div className='font-bold text-gray-800'>— Michael P.</div>
                    <div className='text-sm text-gray-500'>Seller</div>
                </div>
            </div>
        </section>
    );

    return (
        <div className='w-full overflow-x-hidden'>
            <div className='carousel-container'>
                <h1 className='text-center mt-6 md:mt-10 bebas-neue-content text-3xl md:text-4xl text-gray-800 px-4'> What We Offer </h1>
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
                            className={`h-80 md:h-96 flex flex-col items-center justify-center text-white px-4 md:px-8 bg-cover bg-center relative`}
                            style={{ backgroundImage: slide.bgColor }}
                        >
                            <div className='absolute inset-0 bg-black opacity-40'></div> 
                            <div className='relative z-10 max-w-4xl mx-auto'>
                                <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-center leading-tight'>
                                    {slide.title}
                                </h2>
                                <p className='text-base sm:text-lg md:text-xl text-center max-w-2xl opacity-90 px-4'>
                                    {slide.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </Carousel>

                <div className='mt-8 md:mt-12 px-4 md:px-8'>
                    <h1 className='text-center mb-6 md:mb-8 bebas-neue-content text-3xl md:text-4xl text-gray-800'>Featured Properties</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
                        {
                            properties.map(property => <PropertyCard key={property._id} property={property} />)
                        }
                    </div>
                </div>

                <hr className='my-12 md:my-16 border-gray-200' />
                
                <WhyChooseUs />

                <hr className='my-12 md:my-16 border-gray-200' />
                
                <OurSimpleProcess />

                <hr className='my-12 md:my-16 border-gray-200' />

                <ClientTestimonials />
                
                <div className='h-12 md:h-20'></div>
            </div>
        </div>
    );
};

export default Home;