import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axiosInstance';
import Loader from '../../components/common/Loader';
import Button from '../../components/common/Button';

export default function Profile() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [therapist, setTherapist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState('');

  useEffect(() => {
    api.get(`/therapists/${slug}`)
      .then((res) => setTherapist(res.data.therapist))
      .catch(() => {
        setTherapist({
          name: slug ? slug.replace(/-/g, ' ').toUpperCase() : 'Practitioner',
          specialization: 'Clinical Mental Health Specialist',
          bio: 'Licensed mental health professional providing structured clinical consultations.',
          consultationFee: 1500,
          _id: 'default-id'
        });
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loader />;

  const timeSlots = ['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'];

  const handleBook = () => {
    if (!selectedSlot) return alert('Please select an available time slot.');
    navigate(`/pay?therapistId=${therapist?._id || 'demo'}&amount=${therapist?.consultationFee || 1500}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 shadow-xs">
        <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-3xl">
          {therapist?.name ? therapist.name[0] : 'T'}
        </div>
        <div className="text-center md:text-left flex-1 space-y-1">
          <h1 className="text-3xl font-extrabold text-gray-900">{therapist?.name}</h1>
          <p className="text-blue-600 font-medium">{therapist?.specialization || 'Clinical Counseling'}</p>
          <p className="text-gray-500 text-sm mt-2">{therapist?.bio}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Session Details</h2>
          <div className="flex justify-between border-b pb-3 text-sm">
            <span className="text-gray-500">Duration</span>
            <span className="font-semibold text-gray-800">50 Minutes</span>
          </div>
          <div className="flex justify-between border-b pb-3 text-sm">
            <span className="text-gray-500">Mode</span>
            <span className="font-semibold text-gray-800">Online Telehealth</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Consultation Fee</span>
            <span className="font-bold text-lg text-blue-600">₹{therapist?.consultationFee || 1500}</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Available Slots</h2>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`py-2 px-3 text-sm rounded-lg border font-medium transition cursor-pointer ${
                  selectedSlot === slot
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
          <Button onClick={handleBook} className="w-full mt-4">
            Proceed to Payment (₹{therapist?.consultationFee || 1500})
          </Button>
        </div>
      </div>
    </div>
  );
}