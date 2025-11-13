import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/useAuth';
import { API_BASE } from '../config/api';

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
    }, [reviews, currentUser, propertyDetails]);

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
            const reviewsResponse = await fetch(`http://localhost:3000/reviews?email=${currentUser.email}`, {
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
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">Error: {error}</div>;
    }

    if (!currentUser) {
        return <div className="text-center">Please log in to view and submit ratings.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">My Ratings</h1>
            
            {reviews.length === 0 ? (
                <p className="text-gray-600 mb-8">You haven't submitted any reviews yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {reviews.map((review) => {
                        const prop = propertyDetails[review.propertyId];
                        if (!prop) return null;

                        return (
                            <div
                                key={review._id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                                <img
                                    src={prop.imageLink}
                                    alt={prop.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{prop.name}</h2>
                                    <p className="text-sm text-gray-600 mb-1">Reviewer: {currentUser.displayName}</p>
                                    <p className="text-sm text-gray-600 mb-1">
                                        Rating: <span className="text-yellow-400">{'⭐'.repeat(review.starRating)}</span>
                                    </p>
                                    <p className="text-gray-700 mb-2">{review.reviewText}</p>
                                    <p className="text-xs text-gray-500">
                                        Date: {new Date(review.reviewDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Write a Review</h2>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-4">
                <div>
                    <label htmlFor="property" className="block text-sm font-medium text-gray-700 mb-1">
                        Select Property
                    </label>
                    <select
                        id="property"
                        value={selectedProperty}
                        onChange={(e) => setSelectedProperty(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                        Star Rating
                    </label>
                    <select
                        id="rating"
                        value={starRating}
                        onChange={(e) => setStarRating(Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {[1, 2, 3, 4, 5].map((n) => (
                            <option key={n} value={n}>
                                {n} Star{n > 1 ? 's' : ''}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
                        Review Text
                    </label>
                    <textarea
                        id="review"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Write your review here..."
                        className="w-full border border-gray-300 rounded-md p-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default MyRatings;