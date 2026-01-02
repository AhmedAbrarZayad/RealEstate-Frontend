import React from 'react';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import { ThemeProvider } from '../context/ThemeContext';

const Root = () => {
    return (
        <ThemeProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <NavBar />
                <Outlet />
                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default Root;