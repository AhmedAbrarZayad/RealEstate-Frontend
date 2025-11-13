import React, { useState } from 'react';
import { useAuth } from '../auth/useAuth';
import { useNavigate } from 'react-router';

export default function MyPropertyCard({ property, onPropertyUpdated, onPropertyDeleted }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: property.name,
    description: property.description,
    category: property.category,
    price: property.price,
    city: property.location.city,
    area: property.location.area,
    address: property.location.address,
    imageLink: property.imageLink
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const updatedProperty = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        location: {
          city: formData.city,
          area: formData.area,
          address: formData.address
        },
        price: parseFloat(formData.price),
        imageLink: formData.imageLink
      };

      // Your API call here
       await fetch(`http://localhost:3000/my-properties/${property._id}?email=${currentUser.email}`, {
         method: 'PATCH',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${await currentUser.getIdToken()}`
         },
         body: JSON.stringify(updatedProperty)
       });
      
      // Call parent callback to refresh data
      if (onPropertyUpdated) {
        onPropertyUpdated(property._id, updatedProperty);
      }
      
      setShowUpdateModal(false);
      // Show success toast here
      console.log('Property updated successfully!');
    } catch (error) {
      console.error('Error updating property:', error);
      // Show error toast here
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // Your API call here
       await fetch(`http://localhost:3000/my-properties/${property._id}?email=${currentUser.email}`, {
         method: 'DELETE',
         headers: {
           'Authorization': `Bearer ${await currentUser.getIdToken()}`
         }
       });
      
      //Call parent callback to refresh data
      if (onPropertyDeleted) {
        onPropertyDeleted(property._id);
      }
      
      setShowDeleteModal(false);
      // Show success toast here
      console.log('Property deleted successfully!');
    } catch (error) {
      console.error('Error deleting property:', error);
      // Show error toast here
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center p-8">
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
            pointer-events: none;
          }
          .hover-3d:hover {
            transform: rotateY(10deg) rotateX(5deg) scale(1.02);
          }
          .hover-3d:hover > div:nth-child(2) { transform: translateZ(-10px); opacity: 0.3; }
          .hover-3d:hover > div:nth-child(3) { transform: translateZ(-20px); opacity: 0.25; }
          .hover-3d:hover > div:nth-child(4) { transform: translateZ(-30px); opacity: 0.2; }
          .hover-3d:hover > div:nth-child(5) { transform: translateZ(-40px); opacity: 0.15; }
          .hover-3d:hover > div:nth-child(6) { transform: translateZ(-50px); opacity: 0.1; }
          .hover-3d:hover > div:nth-child(7) { transform: translateZ(-60px); opacity: 0.08; }
          .hover-3d:hover > div:nth-child(8) { transform: translateZ(-70px); opacity: 0.05; }
          .hover-3d:hover > div:nth-child(9) { transform: translateZ(-80px); opacity: 0.03; }
        `}</style>

        <div className="hover-3d">
          <div className="card w-96 bg-base-100 shadow-2xl overflow-hidden">
            <figure className="relative h-56">
              <img src={property.imageLink} alt={property.name} className="w-full h-full object-cover" />
              <div className="badge badge-primary absolute top-4 right-4 font-semibold">
                {property.category}
              </div>
            </figure>

            <div className="card-body">
              <h2 className="card-title text-2xl font-bold">{property.name}</h2>
              <p className="text-sm text-base-content opacity-70 mb-2">{property.description}</p>

              <div className="divider my-2"></div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">{property.location.area}, {property.location.city}</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="text-sm">{property.location.address}</span>
                </div>
              </div>

              <div className="divider my-2"></div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-base-content opacity-60">Price</p>
                  <p className="text-3xl font-bold text-primary">
                    {formatPrice(property.price)}
                    <span className="text-sm font-normal text-base-content opacity-60">
                      {property.category === "Rent" ? '/month' : ''}
                    </span>
                  </p>
                </div>

                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content rounded-full w-12">
                    <span className="text-lg font-semibold">{property.user.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                </div>
              </div>

              <div className="text-right mt-2">
                <p className="text-xs font-semibold">{property.user.name}</p>
                <p className="text-xs text-base-content opacity-60">{property.user.email}</p>
                <p className="text-xs text-base-content opacity-50 mt-1">Posted: {property.postedDate}</p>
              </div>

              <div className="card-actions justify-between mt-4">
                <button className="btn btn-primary btn-sm" onClick={() => navigate(`/property/${property._id}`)}>View Details</button>
                <button className="btn btn-warning btn-sm" onClick={() => setShowUpdateModal(true)}>Update</button>
                <button className="btn btn-error btn-sm" onClick={() => setShowDeleteModal(true)}>Delete</button>
              </div>
            </div>
          </div>

          <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
      </div>

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-base-100 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-base-100 p-6 border-b border-base-300 z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Update Property</h3>
                <button onClick={() => setShowUpdateModal(false)} className="btn btn-sm btn-circle btn-ghost">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Property Name *</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Description *</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full h-24"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Category *</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Rent">For Rent</option>
                    <option value="Sale">For Sale</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Land">Land</option>
                    <option value="Residential">Residential</option>
                    <option value="Apartment">Apartment</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Price (USD) *</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              <div className="divider">Location Details</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">City *</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Area *</span>
                  </label>
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Full Address *</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Image URL *</span>
                </label>
                <input
                  type="url"
                  name="imageLink"
                  value={formData.imageLink}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-base-100 p-6 border-t border-base-300 flex justify-end gap-3">
              <button onClick={() => setShowUpdateModal(false)} className="btn btn-ghost">
                Cancel
              </button>
              <button 
                onClick={handleUpdate} 
                className="btn btn-primary"
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Updating...
                  </>
                ) : (
                  'Update Property'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-base-100 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-error bg-opacity-20 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Delete Property?</h3>
              <p className="text-base-content opacity-70 mb-6">
                Are you sure you want to delete "<strong>{property.name}</strong>"? This action cannot be undone.
              </p>
              <div className="flex justify-center gap-3">
                <button onClick={() => setShowDeleteModal(false)} className="btn btn-ghost">
                  Cancel
                </button>
                <button 
                  onClick={handleDelete} 
                  className="btn btn-error"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Deleting...
                    </>
                  ) : (
                    'Delete Property'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}