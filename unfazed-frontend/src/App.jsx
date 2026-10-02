import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 text-gray-900 font-sans">
          <Navbar />
          <AppRoutes />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
