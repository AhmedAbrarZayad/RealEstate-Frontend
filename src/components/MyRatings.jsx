import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../auth/useAuth';
import { API_BASE } from '../config/api';
import { FiStar, FiCalendar, FiEdit3, FiMapPin } from 'react-icons/fi';

const API_BASE_URL = API_BASE;
const MyRatings = () => {
    const { currentUser } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [properties, setProperties] = useState([]);
    const [propertyDetails, setPropertyDetails] = useState({});
    const [userMongoId, setUserMongoId] = useState(null);
    const [selectedProperty, setSelectedProperty] = useState('');
    const [starRating, setStarRating] = useState(3);
    const [reviewText, setReviewText] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!currentUser) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const token = await currentUser.getIdToken();

                // Fetch user's mongo ID
                const userIdResponse = await fetch(`${API_BASE_URL}/users?email=${currentUser.email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!userIdResponse.ok) {
                    throw new Error('Failed to fetch user ID');
                }
                const userIdData = await userIdResponse.json();
                setUserMongoId(userIdData._id);

                // Fetch user's reviews
                const reviewsResponse = await fetch(`${API_BASE_URL}/reviews?email=${currentUser.email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!reviewsResponse.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const reviewsData = await reviewsResponse.json();
                setReviews(reviewsData);

                // Fetch properties not owned by the user
                const propertiesResponse = await fetch(`${API_BASE_URL}/not-my-properties?email=${currentUser.email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!propertiesResponse.ok) {
                    throw new Error('Failed to fetch properties');
                }
                const propertiesData = await propertiesResponse.json();
                setProperties(propertiesData);

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [currentUser]);

    useEffect(() => {
        if (reviews.length === 0 || !currentUser) return;

        const fetchPropertyDetails = async () => {
            try {
                const token = await currentUser.getIdToken();
                const newDetails = { ...propertyDetails };

                for (const review of reviews) {
                    const propId = review.propertyId;
                    if (!newDetails[propId]) {
                        const response = await fetch(`${API_BASE_URL}/property/${propId}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                        if (!response.ok) {
                            console.error(`Failed to fetch property ${propId}`);
                            continue;
                        }
                        const data = await response.json();
                        newDetails[propId] = data;
                    }
                }

                setPropertyDetails(newDetails);
            } catch (err) {
                console.error('Error fetching property details:', err);
            }
        };

        fetchPropertyDetails();
    }, [reviews, currentUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedProperty || !reviewText || !currentUser || !userMongoId) return;

        try {
            const token = await currentUser.getIdToken();
            const newReview = {
                reviewerId: userMongoId,
                propertyId: selectedProperty,
                starRating,
                reviewText,
                reviewDate: new Date().toISOString(),
            };

            const response = await fetch(`${API_BASE_URL}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newReview),
            });

            if (!response.ok) {
                throw new Error('Failed to submit review');
            }

            // Refresh reviews after submission
            const reviewsResponse = await fetch(`${API_BASE_URL}/reviews?email=${currentUser.email}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const updatedReviews = await reviewsResponse.json();
            setReviews(updatedReviews);

            // Reset form
            setSelectedProperty('');
            setStarRating(3);
            setReviewText('');
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 flex justify-center items-center">
                <div className="text-xl font-semibold text-gray-900 dark:text-white">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-red-700 dark:text-red-300">
                        Error: {error}
                    </div>
                </div>
            </div>
        );
    }

    if (!currentUser) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Please log in to view and submit ratings.
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
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                        My Ratings & Reviews
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Share your experience with properties you've visited
                    </p>
                </motion.div>

                {/* Write Review Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-12"
                >
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                                <FiEdit3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                Write a Review
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="property" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Select Property
                                </label>
                                <select
                                    id="property"
                                    value={selectedProperty}
                                    onChange={(e) => setSelectedProperty(e.target.value)}
                                    className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    required
                                >
                                    <option value="">Choose a property to review</option>
                                    {properties.map((prop) => (
                                        <option key={prop._id} value={prop._id}>
                                            {prop.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="rating" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Star Rating
                                </label>
                                <select
                                    id="rating"
                                    value={starRating}
                                    onChange={(e) => setStarRating(Number(e.target.value))}
                                    className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                >
                                    {[1, 2, 3, 4, 5].map((n) => (
                                        <option key={n} value={n}>
                                            {'⭐'.repeat(n)} ({n} Star{n > 1 ? 's' : ''})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="review" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Review Text
                                </label>
                                <textarea
                                    id="review"
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    placeholder="Share your thoughts about this property..."
                                    className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                            >
                                Submit Review
                            </button>
                        </form>
                    </div>
                </motion.div>

                {/* My Reviews Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        My Reviews ({reviews.length})
                    </h2>
                    
                    {reviews.length === 0 ? (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 md:p-16 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full mb-6">
                                <FiStar className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                            </div>
                            <p className="text-gray-900 dark:text-white text-xl font-semibold mb-2">
                                No reviews yet
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">
                                You haven't submitted any reviews. Start by reviewing a property above!
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {reviews.map((review, index) => {
                                const prop = propertyDetails[review.propertyId];
                                if (!prop) return null;

                                return (
                                    <motion.div
                                        key={review._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="group"
                                    >
                                        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col border border-gray-200 dark:border-gray-700">
                                            {/* Property Image */}
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={prop.imageLink}
                                                    alt={prop.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                                {/* Rating Badge */}
                                                <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-1">
                                                    <FiStar className="w-4 h-4 fill-current" />
                                                    {review.starRating}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6 flex flex-col flex-grow">
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                    {prop.name}
                                                </h3>

                                                {/* Location */}
                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-3 text-sm">
                                                    <FiMapPin className="w-4 h-4 text-blue-600" />
                                                    <span className="line-clamp-1">{prop.location.city}</span>
                                                </div>

                                                {/* Star Rating Display */}
                                                <div className="flex gap-1 mb-3">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <FiStar
                                                            key={star}
                                                            className={`w-5 h-5 ${
                                                                star <= review.starRating
                                                                    ? 'fill-yellow-400 text-yellow-400'
                                                                    : 'text-gray-300 dark:text-gray-600'
                                                            }`}
                                                        />
                                                    ))}
                                                </div>

                                                {/* Review Text */}
                                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
                                                    {review.reviewText}
                                                </p>

                                                {/* Date */}
                                                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500 text-xs pt-4 border-t border-gray-200 dark:border-gray-700">
                                                    <FiCalendar className="w-4 h-4" />
                                                    <span>{new Date(review.reviewDate).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default MyRatings;