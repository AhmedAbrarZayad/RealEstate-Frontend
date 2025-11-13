import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE } from '../config/api';

const API_BASE_URL = API_BASE;

const Signup = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signup, signInWithGoogle } = useAuth();

    // form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [photoURL, setPhotoURL] = useState('');

    const [passwordValidation, setPasswordValidation] = useState({
        hasUpper: false,
        hasLower: false,
        hasLength: false,
    });

    function handlePasswordChange(e) {
        const value = e.target.value;
        setPassword(value);

        setPasswordValidation({
            hasUpper: /[A-Z]/.test(value),
            hasLower: /[a-z]/.test(value),
            hasLength: value.length >= 6,
        });
    }

    // Handle Firebase signup + backend storage
    async function handleSignUp(e) {
        e.preventDefault();

        // 🔥 Prevent signup if password invalid
        if (!passwordValidation.hasUpper || !passwordValidation.hasLower || !passwordValidation.hasLength) {
            toast.error('Password must contain uppercase, lowercase, and at least 6 characters');
            return;
        }

        try {
            const userCredential = await signup(email, password, name, photoURL);
            const user = userCredential.user;

            const newUser = {
                name,
                email: user.email,
                photoURL: photoURL || user.photoURL || '',
                password,
                properties: [],
            };

            const token = await user.getIdToken();

            const res = await fetch(`${API_BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newUser),
            });

            const data = await res.json();

            if (data.existingUser) {
                toast.info('User already exists. Welcome back!');
            } else {
                toast.success('Account created successfully!');
            }

            navigate(location.state?.from?.pathname || '/');
        } catch (err) {
            console.error('Signup failed:', err);
            toast.error(err.message || 'Failed to create account');
        }
    }

    // Google Sign-in (unchanged)
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

            const res = await fetch(`${API_BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newUser),
            });

            const data = await res.json();

            if (data.existingUser) {
                toast.info('Welcome back!');
            } else {
                toast.success('Signed in with Google!');
            }

            navigate(location.state?.from?.pathname || '/');
        } catch (err) {
            console.error('Google sign-in failed:', err);
            toast.error(err.message || 'Google sign-in failed');
        }
    }

    // SVG icons omitted for brevity...

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-950 p-4 font-['Inter'] fixed inset-0">
            <form onSubmit={handleSignUp} className="form flex flex-col gap-3 p-8 bg-gray-900 rounded-3xl shadow-2xl max-w-sm w-full">
                <p className="text-center text-white text-2xl font-semibold mb-6">Create Account</p>

                {/* name */}
                <div className="field flex items-center gap-2.5 p-3 bg-gray-800 rounded-full">
                    <input required placeholder="Full Name" className="bg-transparent border-none outline-none w-full text-gray-300"
                        type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                {/* email */}
                <div className="field flex items-center gap-2.5 p-3 bg-gray-800 rounded-full">
                    <input required placeholder="Email Address" className="bg-transparent border-none outline-none w-full text-gray-300"
                        type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                {/* photo URL */}
                <div className="field flex items-center gap-2.5 p-3 bg-gray-800 rounded-full">
                    <input placeholder="Profile Picture URL (Optional)" className="bg-transparent border-none outline-none w-full text-gray-300"
                        type="url" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
                </div>

                {/* 🔥 password */}
                <div className="field flex flex-col gap-2 bg-gray-800 rounded-2xl p-3">
                    <input
                        required
                        placeholder="Password (min 6 characters)"
                        className="bg-transparent border-none outline-none w-full text-gray-300"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />

                    {/* 🔥 live validation hints */}
                    <ul className="text-sm mt-1 space-y-1">
                        <li className={`${passwordValidation.hasUpper ? 'text-green-500' : 'text-red-500'}`}>
                            {passwordValidation.hasUpper ? '✔' : '✖'} Must include an uppercase letter
                        </li>
                        <li className={`${passwordValidation.hasLower ? 'text-green-500' : 'text-red-500'}`}>
                            {passwordValidation.hasLower ? '✔' : '✖'} Must include a lowercase letter
                        </li>
                        <li className={`${passwordValidation.hasLength ? 'text-green-500' : 'text-red-500'}`}>
                            {passwordValidation.hasLength ? '✔' : '✖'} Must be at least 6 characters
                        </li>
                    </ul>
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
                    Sign in with Google
                </button>
            </form>
        </div>
    );
};

export default Signup;
