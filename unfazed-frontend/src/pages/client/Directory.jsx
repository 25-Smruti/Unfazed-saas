import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axiosInstance';
import Loader from '../../components/common/Loader';
import { AuthContext } from '../../context/AuthContext';

export default function Directory() {
  const { user } = useContext(AuthContext);
  const [therapists, setTherapists] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Current logged-in user profile fallback
    const currentUserProfile = {
      _id: user?.id || 'current-user',
      name: user?.name || 'Dr. Smrutirekha Sahoo',
      slug: user?.slug || 'dr-smrutirekha-sahoo',
      specialization: user?.specializations?.[0] || 'Neurologist & Clinical Specialist',
      consultationFee: 1500,
    };

    const initialList = [
      currentUserProfile,
      {
        _id: 'default-1',
        name: 'Dr. Somnath Sahoo',
        slug: 'drsomnath-sahoo',
        specialization: 'Clinical Psychology & CBT',
        consultationFee: 1500,
      },
      {
        _id: 'default-2',
        name: 'Dr. Sharma',
        slug: 'dr-sharma',
        specialization: 'Mental Health Professional',
        consultationFee: 1500,
      }
    ];

    api.get('/therapists/all')
      .then((res) => {
        const fetched = res.data.therapists || [];
        if (fetched.length > 0) {
          // Merge fetched therapists with the current logged-in profile if not already present
          const exists = fetched.some(t => t.name === currentUserProfile.name || t.slug === currentUserProfile.slug);
          setTherapists(exists ? fetched : [currentUserProfile, ...fetched]);
        } else {
          setTherapists(initialList);
        }
      })
      .catch((err) => {
        console.warn('Using directory fallback list:', err);
        setTherapists(initialList);
      })
      .finally(() => setLoading(false));
  }, [user]);

  const filtered = therapists.filter((t) =>
    (t.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (t.specialization || '').toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loader />;

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-gray-900">Find a Practitioner</h1>
        <p className="text-gray-500">Search available therapists and book an appointment slot</p>
      </div>

      <div className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by name or specialization..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-xs focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {filtered.map((t) => (
          <div
            key={t._id || t.slug}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition"
          >
            <div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                  {t.name ? t.name[0] : 'D'}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{t.name}</h3>
                  <p className="text-sm text-blue-600">{t.specialization || 'Therapist'}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Fee: <span className="font-semibold text-gray-800">₹{t.consultationFee || 1500}</span> / session
              </p>
            </div>

            <div className="mt-6">
              <Link
                to={`/${t.slug}`}
                className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition"
              >
                View Profile & Book Slot
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}