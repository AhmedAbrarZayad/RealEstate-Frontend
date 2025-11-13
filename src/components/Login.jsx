import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// API base URL
const API_BASE_URL = 'http://localhost:3000';

const Login = () => {
    const { login, signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();


    async function handleLogin(e) {
        e.preventDefault();
        try {
            await login(e.target.email.value, e.target.password.value);
            toast.success('✅ Logged in successfully!');
            navigate(location.state?.from?.pathname || '/');
        } catch (err) {
            console.error('Login failed:', err);
            const message = err.message || 'Login failed. Please try again.';
            toast.error(`❌ ${message}`);
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

    // Google SVG icon
    const GoogleIcon = () => (
        <svg
            className="w-5 h-5 mr-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
        >
            <path
                fill="#FFC107"
                d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 7.917-11.303 7.917-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.159 7.917 3.037l5.475-5.475C39.278 7.516 33.883 5 24 5 12.955 5 4 13.955 4 24s8.955 19 20 19c11.045 0 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
            />
            <path
                fill="#FF3D00"
                d="M6.306 14.691l6.571 4.819C14.655 15.108 18.9 13 24 13c3.059 0 5.842 1.159 7.917 3.037l5.475-5.475C39.278 7.516 33.883 5 24 5 12.955 5 4 13.955 4 24h2c0-3.692 1.33-6.98 3.585-9.309z"
            />
            <path
                fill="#4CAF50"
                d="M24 43c-6.793 0-13.013-3.08-17.07-8.068l6.571-4.819C11.523 35.8 17.5 39 24 39c5.202 0 9.873-1.895 13.435-5.148l5.221 4.887C39.227 41.527 31.956 43 24 43z"
            />
            <path
                fill="#1976D2"
                d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 7.917-11.303 7.917-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.159 7.917 3.037l5.475-5.475C39.278 7.516 33.883 5 24 5 12.955 5 4 13.955 4 24h20l-.389-3.917z"
            />
        </svg>
    );

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-950 p-4 font-['Inter'] fixed inset-0">
            {/* Toast Container */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

            {/* Login Form */}
            <form
                onSubmit={handleLogin}
                className="form flex flex-col gap-3 p-8 bg-gray-900 rounded-3xl transition-all duration-400 ease-in-out shadow-2xl max-w-sm w-full hover:scale-[1.01] hover:border hover:border-gray-700"
            >
                <p id="heading" className="text-center my-8 text-white text-2xl font-semibold">
                    Login
                </p>

                {/* Email */}
                <div className="field flex items-center gap-2.5 p-3 bg-gray-900 rounded-full shadow-inner shadow-black focus-within:shadow-md focus-within:shadow-blue-500/50">
                    <svg
                        className="input-icon h-5 w-5 fill-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
                    </svg>
                    <input
                        autoComplete="off"
                        placeholder="Email"
                        className="input-field bg-transparent border-none outline-none w-full text-gray-300"
                        type="email"
                        name="email"
                        required
                    />
                </div>

                {/* Password */}
                <div className="field flex items-center gap-2.5 p-3 bg-gray-900 rounded-full shadow-inner shadow-black focus-within:shadow-md focus-within:shadow-blue-500/50">
                    <svg
                        className="input-icon h-5 w-5 fill-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                    </svg>
                    <input
                        placeholder="Password"
                        className="input-field bg-transparent border-none outline-none w-full text-gray-300"
                        type="password"
                        name="password"
                        required
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-center mt-10 gap-2">
                    <button
                        type="submit"
                        className="button1 w-1/2 py-3 px-6 rounded-md border-none outline-none transition-all duration-400 ease-in-out bg-gray-800 text-white cursor-pointer font-semibold min-w-fit hover:bg-blue-600 focus:outline-none active:scale-[0.98]"
                    >
                        Login
                    </button>
                    <NavLink to="/signup" className="w-1/2 text-white">
                        <button
                            type="button"
                            className="button2 w-full py-3 px-6 rounded-md border-none outline-none transition-all duration-400 ease-in-out bg-gray-800 text-white cursor-pointer font-semibold min-w-fit hover:bg-green-600 focus:outline-none active:scale-[0.98]"
                        >
                            Sign Up
                        </button>
                    </NavLink>
                </div>

                {/* Forgot Password */}
                <button
                    type="button"
                    className="button3 w-full mt-4 py-3 px-6 rounded-md transition-all duration-400 ease-in-out bg-gray-800 border border-transparent text-gray-400 cursor-pointer font-semibold hover:bg-red-700 hover:text-white hover:border-red-700 focus:outline-none active:scale-[0.98]"
                >
                    Forgot Password
                </button>

                {/* Divider */}
                <div className="flex items-center my-4">
                    <div className="grow border-t border-gray-700"></div>
                    <span className="shrink mx-4 text-gray-500 text-sm font-medium">OR</span>
                    <div className="grow border-t border-gray-700"></div>
                </div>

                {/* Google Sign-In */}
                <button
                    onClick={handleGoogleSignIn}
                    className="button4 w-full mb-8 py-3 px-6 rounded-md transition-all duration-300 ease-in-out bg-white text-gray-900 border border-transparent cursor-pointer font-semibold shadow-md hover:bg-gray-100 focus:outline-none active:scale-[0.98] flex items-center justify-center"
                >
                    <GoogleIcon />
                    Sign In with Google
                </button>
            </form>
        </div>
    );
};

export default Login;
