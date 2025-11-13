import React from 'react';
import { NavLink } from 'react-router';

const Signup = () => {
    // Icon components for clarity and consistency
    const UserIcon = () => (
        <svg className="input-icon h-5 w-5 fill-gray-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
        </svg>
    );

    const EmailIcon = () => (
        <svg className="input-icon h-5 w-5 fill-gray-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.585l-1.239-.755Z" />
            <path d="M16 4.697v7.104l-5.803-3.558L16 4.697Z" />
        </svg>
    );

    const LinkIcon = () => (
        <svg className="input-icon h-5 w-5 fill-gray-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337l-.519.519A2 2 0 0 1 6.586 8.5L7 7.914a.5.5 0 0 0 .146-.353l-.535-.536z" />
            <path d="M9.439 5.131 10.811 3.76a3 3 0 1 0-4.242 4.243l1.828 1.828a3 3 0 0 0 4.242 0l.136-.135a.5.5 0 0 0 .018-.65c.03-.084.008-.186-.073-.24l-.15-.148a1.002 1.002 0 0 1-.322-.093 2 2 0 0 1-3.155.66l-.52-1.829a.5.5 0 0 0-.149-.053l-.178-.057.148-.148z" />
        </svg>
    );

    const LockIcon = () => (
        <svg className="input-icon h-5 w-5 fill-gray-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
        </svg>
    );

    // Dummy handle functions (in a real app, these would handle form submission/navigation)
    const handleSignup = (e) => {
        e.preventDefault();
        console.log("Attempting to sign up...");
        // In a real application, Firebase signup logic would go here.
    };
    

    return (
        // Wrapper: Dark background covering the entire viewport
        <div className="flex justify-center items-center min-h-screen bg-gray-950 p-4 font-['Inter'] fixed inset-0">
            {/* Form container */}
            <form onSubmit={handleSignup} className="form flex flex-col gap-3 p-8 bg-gray-900 rounded-3xl transition-all duration-400 ease-in-out shadow-2xl max-w-sm w-full hover:scale-[1.01] hover:border hover:border-gray-700">
                
                {/* Heading */}
                <p id="heading" className="text-center mt-4 mb-6 text-white text-2xl font-semibold">
                    Create Account
                </p>

                {/* Name Field */}
                <div className="field flex items-center gap-2.5 p-3 bg-gray-900 rounded-full shadow-inner shadow-black focus-within:shadow-md focus-within:shadow-green-500/50">
                    <UserIcon />
                    <input required placeholder="Full Name" className="input-field bg-transparent border-none outline-none w-full text-gray-300" type="text" />
                </div>
                
                {/* Email Field */}
                <div className="field flex items-center gap-2.5 p-3 bg-gray-900 rounded-full shadow-inner shadow-black focus-within:shadow-md focus-within:shadow-green-500/50">
                    <EmailIcon />
                    <input required placeholder="Email Address" className="input-field bg-transparent border-none outline-none w-full text-gray-300" type="email" />
                </div>

                {/* photoURL Field */}
                <div className="field flex items-center gap-2.5 p-3 bg-gray-900 rounded-full shadow-inner shadow-black focus-within:shadow-md focus-within:shadow-green-500/50">
                    <LinkIcon />
                    <input placeholder="Profile Picture URL (Optional)" className="input-field bg-transparent border-none outline-none w-full text-gray-300" type="url" />
                </div>
                
                {/* Password Field */}
                <div className="field flex items-center gap-2.5 p-3 bg-gray-900 rounded-full shadow-inner shadow-black focus-within:shadow-md focus-within:shadow-green-500/50">
                    <LockIcon />
                    <input required placeholder="Password (min 6 characters)" className="input-field bg-transparent border-none outline-none w-full text-gray-300" type="password" minLength="6" />
                </div>
                
                {/* Sign Up Button */}
                <div className="flex justify-center mt-8 mb-4">
                    <button type="submit" className="w-full py-3 px-6 rounded-md border-none outline-none transition-all duration-400 ease-in-out bg-green-700 text-white cursor-pointer font-semibold min-w-fit hover:bg-green-600 focus:outline-none active:scale-[0.98]">
                        Sign Up
                    </button>
                </div>

                {/* Link to Login Page */}
                <p className="text-center text-gray-400 text-sm mt-4">
                    Already have an account? 
                    <NavLink to={'/login'} className="text-blue-500 hover:text-blue-400 transition-colors duration-200 font-medium ml-1">
                        Log In here
                    </NavLink>
                </p>
            </form>
        </div>
    );
}

export default Signup;