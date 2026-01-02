import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { FiMapPin, FiCalendar, FiHome, FiMail, FiStar, FiDollarSign } from 'react-icons/fi';
import { motion } from 'framer-motion';

const PropertyDetails = () => {
  const { property, reviews } = useLoaderData();

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const avgRating = reviews && reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.starRating, 0) / reviews.length).toFixed(1)
    : 0;

  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={`w-5 h-5 transition-all ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Image Section */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        <img
          src={property.imageLink}
          alt={property.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        {/* Title Overlay */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-0 left-0 right-0 p-8"
        >
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {property.name}
            </h1>
            <div className="flex items-center gap-2 text-white/90 text-lg">
              <FiMapPin className="w-5 h-5" />
              <span>{property.location.area}, {property.location.city}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Property Info Cards Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {/* Price Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Price</p>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                <FiDollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {formatPrice(property.price)}
            </p>
            {property.category === 'Rent' && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">/month</p>
            )}
          </div>

          {/* Category Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Category</p>
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                <FiHome className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {property.category}
            </p>
          </div>

          {/* Location Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Location</p>
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                <FiMapPin className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{property.location.area}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{property.location.city}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{property.location.address}</p>
          </div>
        </motion.div>

        {/* Description Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-10 shadow-lg mb-12 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">About This Property</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            {property.description}
          </p>
        </motion.div>

        {/* Reviews Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">Ratings & Reviews</h2>
          
          {reviews && reviews.length > 0 ? (
            <div>
              {/* Average Rating Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-10 shadow-lg mb-6 border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="text-center md:text-left">
                    <div className="text-6xl md:text-7xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {avgRating}
                    </div>
                    <StarRating rating={Math.round(avgRating)} />
                    <p className="text-gray-600 dark:text-gray-400 mt-2 font-medium">
                      Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div 
                    key={review._id} 
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                      <StarRating rating={review.starRating} />
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                        <FiCalendar className="w-4 h-4" />
                        <span>{formatDate(review.reviewDate)}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                      {review.reviewText}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 md:p-16 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full mb-6">
                <FiStar className="w-10 h-10 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-gray-900 dark:text-white text-xl font-semibold mb-2">No reviews yet</p>
              <p className="text-gray-600 dark:text-gray-400">Be the first to review this property!</p>
            </div>
          )}
        </motion.div>

        {/* Contact Agent Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-10 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-6">
            Property Agent
          </p>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Agent Info */}
            <div className="flex items-center gap-6">
              {property.user.imageLink ? (
                <img
                  src={property.user.imageLink}
                  alt={property.user.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shadow-lg border-4 border-gray-100 dark:border-gray-700"
                />
              ) : (
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold text-2xl md:text-3xl shadow-lg">
                  {property.user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </div>
              )}
              
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {property.user.name}
                </h3>
                <a
                  href={`mailto:${property.user.email}`}
                  className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <FiMail className="w-5 h-5" />
                  <span className="text-sm md:text-base">{property.user.email}</span>
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 md:px-8 py-3 md:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">
                Contact Agent
              </button>
              <button className="px-6 md:px-8 py-3 md:py-4 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 text-gray-900 dark:text-white font-semibold rounded-lg transition-all duration-200">
                Save Property
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PropertyDetails;