import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { MapPin, Calendar, Home, Mail, Star } from 'lucide-react';

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
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-slate-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Image */}
      <div className="w-full h-[500px] overflow-hidden relative group">
        <img
          src={property.imageLink}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 leading-tight">
            {property.name}
          </h1>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {/* Price Card */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border border-slate-100">
            <div className="flex items-start justify-between mb-3">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Price</p>
              <div className="text-blue-600 bg-blue-50 p-2 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {formatPrice(property.price)}
            </p>
            {property.category === 'Rent' && (
              <p className="text-sm text-slate-500 mt-2">/month</p>
            )}
          </div>

          {/* Category Card */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border border-slate-100">
            <div className="flex items-start justify-between mb-3">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Category</p>
              <div className="text-purple-600 bg-purple-50 p-2 rounded-lg">
                <Home className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{property.category}</p>
          </div>

          {/* Location Card */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border border-slate-100">
            <div className="flex items-start justify-between mb-3">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Location</p>
              <div className="text-green-600 bg-green-50 p-2 rounded-lg">
                <MapPin className="w-5 h-5" />
              </div>
            </div>
            <p className="text-sm font-bold text-slate-900">{property.location.area}</p>
            <p className="text-sm text-slate-600">{property.location.city}</p>
            <p className="text-xs text-slate-500 mt-1">{property.location.address}</p>
          </div>

          {/* Posted Date Card */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border border-slate-100">
            <div className="flex items-start justify-between mb-3">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Posted</p>
              <div className="text-orange-600 bg-orange-50 p-2 rounded-lg">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xl font-bold text-slate-900">{formatDate(property.postedDate)}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mb-12">
          {property.description}
        </p>

        {/* Divider */}
        <div className="h-px bg-slate-200 my-12"></div>

        {/* Ratings & Reviews Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Ratings & Reviews</h2>
          
          {reviews && reviews.length > 0 ? (
            <div>
              {/* Average Rating Summary */}
              <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-100 mb-8">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-slate-900">{avgRating}</p>
                    <StarRating rating={Math.round(avgRating)} />
                    <p className="text-sm text-slate-600 mt-2">{reviews.length} reviews</p>
                  </div>
                  <div className="flex-1 border-l border-slate-200 pl-6">
                    <p className="text-slate-600">Based on {reviews.length} verified reviews</p>
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review._id} className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <StarRating rating={review.starRating} />
                      <p className="text-xs text-slate-500">{formatDate(review.reviewDate)}</p>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{review.reviewText}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 shadow-md border border-slate-100 text-center">
              <p className="text-slate-600 text-lg">No reviews yet. Be the first to review this property!</p>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-200 my-12"></div>

        {/* Posted By Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-6">Contact Agent</p>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            {/* User Info */}
            <div className="flex items-center gap-4">
              {property.user.imageLink ? (
                <img
                  src={property.user.imageLink}
                  alt={property.user.name}
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-slate-100 shadow-md"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-bold text-2xl ring-4 ring-slate-100 shadow-md">
                  {property.user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
              )}
              
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {property.user.name}
                </h3>
                <a
                  href={`mailto:${property.user.email}`}
                  className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{property.user.email}</span>
                </a>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg">
                Contact
              </button>
              <button className="px-6 py-3 bg-white border-2 border-slate-300 hover:border-slate-400 text-slate-900 font-semibold rounded-lg transition-colors">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;