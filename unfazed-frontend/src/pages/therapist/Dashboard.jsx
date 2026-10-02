import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import StatCard from '../../components/analytics/StatCard';
import Button from '../../components/common/Button';

export default function Dashboard() {
  const { user, loginUser } = useContext(AuthContext);
  const [currentTier, setCurrentTier] = useState(user?.tier || 'pro');

  const handleUpgrade = () => {
    const updatedUser = { ...user, tier: 'pro' };
    localStorage.setItem('unfazed_user', JSON.stringify(updatedUser));
    setCurrentTier('pro');
    if (loginUser && localStorage.getItem('unfazed_token')) {
      loginUser(updatedUser, localStorage.getItem('unfazed_token'));
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Welcome, {user?.name || 'Smrutirekha Sahoo'}
          </h1>
          <p className="text-gray-500 mt-1">
            Branded URL: <span className="font-mono text-blue-600">unfazed.in/{user?.slug || 'smrutirekha-sahoo'}</span>
          </p>
        </div>
        {currentTier.toLowerCase() !== 'pro' && (
          <Button onClick={handleUpgrade}>Upgrade to PRO</Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-gray-500 text-xs font-semibold uppercase">Active Tier</span>
            <div className="text-2xl font-bold mt-2 text-blue-600">PRO</div>
          </div>
          <span className="text-xs text-green-600 font-medium mt-2">✓ All features unlocked</span>
        </div>
        <StatCard title="Sessions Scheduled" value="12" />
        <StatCard title="Total Clients" value="4" />
      </div>
    </div>
  );
}