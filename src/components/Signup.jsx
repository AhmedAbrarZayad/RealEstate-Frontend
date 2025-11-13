import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ✅ API base URL
const API_BASE_URL = 'http://localhost:3000';

const Signup = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signup, signInWithGoogle } = useAuth();

    // form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [photoURL, setPhotoURL] = useState('');

    // Handle Firebase signup + backend storage
    async function handleSignUp(e) {
        e.preventDefault();
        try {
            // Firebase signup
            const userCredential = await signup(email, password);
            const user = userCredential.user;

            // Store user data in backend
            const newUser = {
                name,
                email: user.email,
                photoURL: photoURL || user.photoURL || '',
                properties: [],
            };

            const token = await user.getIdToken(); // Firebase JWT token

            await fetch(`${API_BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newUser),
            });

            toast.success('Account created successfully!');
            navigate(location.state?.from?.pathname || '/');
        } catch (err) {
            console.error('Signup failed:', err);
            toast.error(err.message || 'Failed to create account');
        }
    }

    // Handle Google sign-in
    async function handleGoogleSignIn() {
        try {
            const result = await signInWithGoogle();
            const user = result.user;

            const token = await user.getIdToken();

            const newUser = {
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                properties: [],
            };

            await fetch(`${API_BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newUser),
            });

            toast.success('Signed in with Google!');
            navigate(location.state?.from?.pathname || '/');
        } catch (err) {
            console.error('Google sign-in failed:', err);
            toast.error(err.message || 'Google sign-in failed');
        }
    }

    // SVG icons
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

    const GoogleIcon = () => (
        <svg className="h-5 w-5 mr-2" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
            <path fill="#4285f4" d="M533.5 278.4c0-17.4-1.5-34.1-4.4-50.4H272v95.3h147.5c-6.4 34.6-25.8 63.9-55 83.5v69.3h88.8c52 47.9 82.2 118.4 82.2 197.6z" />
            <path fill="#34a853" d="M272 544.3c73.7 0 135.4-24.5 180.5-66.6l-88.8-69.3c-24.7 16.6-56.2 26.3-91.7 26.3-70.6 0-130.3-47.7-151.6-111.7H30.3v70.1c45.6 89.3 138.8 150.9 241.7 150.9z" />
            <path fill="#fbbc05" d="M120.4 323c-10.6-31.6-10.6-65.6 0-97.1V155.8H30.3C10.8 197.7 0 240.8 0 278.4s10.8 80.7 30.3 122.6l90.1-70.1z" />
            <path fill="#ea4335" d="M272 109.7c40.1 0 76 13.8 104.4 40.9l77.8-77.8C407.4 27.3 345.7 0 272 0 169.1 0 75.9 61.6 30.3 150.9l90.1 70.1C141.7 157.4 201.4 109.7 272 109.7z" />
        </svg>
    );

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-950 p-4 font-['Inter'] fixed inset-0">
            <form onSubmit={handleSignUp} className="form flex flex-col gap-3 p-8 bg-gray-900 rounded-3xl shadow-2xl max-w-sm w-full">
                <p className="text-center text-white text-2xl font-semibold mb-6">Create Account</p>

                <div className="field flex items-center gap-2.5 p-3 bg-gray-800 rounded-full">
                    <UserIcon />
                    <input required placeholder="Full Name" className="input-field bg-transparent border-none outline-none w-full text-gray-300"
                        type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="field flex items-center gap-2.5 p-3 bg-gray-800 rounded-full">
                    <EmailIcon />
                    <input required placeholder="Email Address" className="input-field bg-transparent border-none outline-none w-full text-gray-300"
                        type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="field flex items-center gap-2.5 p-3 bg-gray-800 rounded-full">
                    <LinkIcon />
                    <input placeholder="Profile Picture URL (Optional)" className="input-field bg-transparent border-none outline-none w-full text-gray-300"
                        type="url" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
                </div>

                <div className="field flex items-center gap-2.5 p-3 bg-gray-800 rounded-full">
                    <LockIcon />
                    <input required placeholder="Password (min 6 characters)" className="input-field bg-transparent border-none outline-none w-full text-gray-300"
                        type="password" minLength="6" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button type="submit" className="w-full py-3 mt-4 rounded-md bg-green-700 text-white font-semibold hover:bg-green-600">
                    Sign Up
                </button>

                <p className="text-center text-gray-400 text-sm mt-4">
                    Already have an account?
                    <NavLink to="/login" className="text-blue-500 hover:text-blue-400 ml-1">Log In</NavLink>
                </p>

                <div className="flex items-center my-4">
                    <div className="grow border-t border-gray-700"></div>
                    <span className="mx-4 text-gray-500 text-sm">OR</span>
                    <div className="grow border-t border-gray-700"></div>
                </div>

                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full py-3 mb-4 rounded-md bg-white text-gray-900 font-semibold shadow-md flex items-center justify-center hover:bg-gray-100">
                    <GoogleIcon /> Sign in with Google
                </button>
            </form>
        </div>
    );
};

export default Signup;
