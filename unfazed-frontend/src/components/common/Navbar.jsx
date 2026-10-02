import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="text-xl font-black tracking-wider text-blue-600">
          UNFAZED
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-6 text-sm font-medium text-gray-600">
          {/* Always Visible Public Directory */}
          <Link
            to="/directory"
            className="hover:text-blue-600 transition"
          >
            Find Therapists
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-600 transition">
                Dashboard
              </Link>
              <Link to="/schedule" className="hover:text-blue-600 transition">
                Schedule
              </Link>
              <Link to="/clients" className="hover:text-blue-600 transition">
                Clients
              </Link>
              <Link to="/notes" className="hover:text-blue-600 transition">
                Notes
              </Link>
              <Link to="/analytics" className="hover:text-blue-600 transition">
                Analytics
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 transition cursor-pointer font-semibold ml-2"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="hover:text-blue-600 transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                Get Started
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}