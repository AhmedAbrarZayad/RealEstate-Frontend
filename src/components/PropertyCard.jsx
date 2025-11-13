import React from 'react';
// Assuming `useNavigate` from 'react-router-dom' is available for redirection
// import { useNavigate } from 'react-router-dom'; 

export default function PropertyCard({property}) {
  // const navigate = useNavigate(); // Uncomment if you are using react-router-dom

  // Helper function for price formatting (optional, but good practice)
  const formatPrice = (price) => {
    // Assuming 'price' is a number. Format to currency (e.g., $1,200)
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
    
  // Function to handle "View Details" click
  const handleViewDetails = () => {
    // Implement your navigation logic here.
    // Example using react-router-dom:
    // navigate(`/property/${property._id}`);
    
    // For demonstration, logging the action and required steps
    console.log(`Redirecting to details for property ID: ${property._id}`);
    console.log("NOTE: Full access requires login.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <style>{`
        .hover-3d {
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.6s ease;
        }
        
        .hover-3d > div:not(:first-child) {
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.4), rgba(236, 72, 153, 0.4));
          transition: transform 0.6s ease, opacity 0.6s ease;
          opacity: 0;
        }
        
        .hover-3d:hover {
          transform: rotateY(10deg) rotateX(5deg) scale(1.02);
        }
        
        .hover-3d:hover > div:nth-child(2) {
          transform: translateZ(-10px);
          opacity: 0.3;
        }
        
        .hover-3d:hover > div:nth-child(3) {
          transform: translateZ(-20px);
          opacity: 0.25;
        }
        
        .hover-3d:hover > div:nth-child(4) {
          transform: translateZ(-30px);
          opacity: 0.2;
        }
        
        .hover-3d:hover > div:nth-child(5) {
          transform: translateZ(-40px);
          opacity: 0.15;
        }
        
        .hover-3d:hover > div:nth-child(6) {
          transform: translateZ(-50px);
          opacity: 0.1;
        }
        
        .hover-3d:hover > div:nth-child(7) {
          transform: translateZ(-60px);
          opacity: 0.08;
        }
        
        .hover-3d:hover > div:nth-child(8) {
          transform: translateZ(-70px);
          opacity: 0.05;
        }
        
        .hover-3d:hover > div:nth-child(9) {
          transform: translateZ(-80px);
          opacity: 0.03;
        }
      `}</style>
      
      <div className="hover-3d">
        <div className="card w-96 bg-base-100 shadow-2xl overflow-hidden">
          <figure className="relative h-56">
            <img 
              src={property.imageLink} 
              alt={property.name}
              className="w-full h-full object-cover"
            />
            {/* O Category */}
            <div className="badge badge-primary absolute top-4 right-4 font-semibold">
              {property.category}
            </div>
          </figure>
          
          <div className="card-body">
            {/* O Property Name */}
            <h2 className="card-title text-2xl font-bold">
              {property.name}
            </h2>
            
            {/* O Short Description */}
            <p className="text-sm text-base-content opacity-70 mb-2">
              {property.description}
            </p>
            
            <div className="divider my-2"></div>
            
            <div className="space-y-2">
              {/* O Location (City & Area) */}
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">
                  {/* Accessing location object: property.location.area, property.location.city */}
                  {property.location.area}, {property.location.city}
                </span>
              </div>
              
              {/* O Location (Address - optional detail) */}
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                {/* Accessing location object: property.location.address */}
                <span className="text-sm">{property.location.address}</span>
              </div>
            </div>
            
            <div className="divider my-2"></div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-base-content opacity-60">Price</p>
                {/* O Property Price */}
                <p className="text-3xl font-bold text-primary">
                  {/* Using the formatPrice helper (or just ${property.price} if preferred) */}
                  {formatPrice(property.price)}
                  <span className="text-sm font-normal text-base-content opacity-60">
                    {/* Displaying /month if category is Rent */}
                    {property.category === "Rent" ? '/month' : ''}
                  </span>
                </p>
              </div>
              
              {/* This section displays the User/Owner's initials and info (not explicitly requested but already in code) */}
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-12">
                  <span className="text-lg font-semibold">
                    {/* Accessing user object: property.user.name */}
                    {property.user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-right mt-2">
              <p className="text-xs font-semibold">{property.user.name}</p>
              <p className="text-xs text-base-content opacity-60">{property.user.email}</p>
            </div>
            
            {/* O "View Details" button (redirects to property details, login required for full access) */}
            <div className="card-actions justify-end mt-4">
              <button 
                className="btn btn-primary btn-block"
                onClick={handleViewDetails} // Add the click handler
                title="Login required for full access" // Hint about login requirement
              >
                View Details
              </button>
            </div>
          </div>
        </div>
        
        {/* These divs create the 3D effect layers */}
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}