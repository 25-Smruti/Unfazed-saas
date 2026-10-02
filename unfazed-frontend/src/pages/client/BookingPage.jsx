import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axiosInstance';
import Hero from '../../components/profile/Hero';
import About from '../../components/profile/About';
import ServiceCard from '../../components/profile/ServiceCard';
import SlotPicker from '../../components/scheduling/SlotPicker';
import Loader from '../../components/common/Loader';

export default function BookingPage() {
  const { slug } = useParams();
  const [therapist, setTherapist] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/therapist/public/${slug}`)
      .then((res) => setTherapist(res.data.therapist))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loader />;
  if (!therapist) return <div className="text-center py-16">Practitioner page not found.</div>;

  return (
    <div className="max-w-4xl mx-auto my-6 space-y-6 px-4">
      <Hero therapist={therapist} />
      <About therapist={therapist} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ServiceCard
          title="Standard Individual Session"
          duration={50}
          price={therapist.sessionPrice || 1500}
          onSelect={() => {}}
        />
        <div className="bg-white p-6 border rounded-xl shadow-xs">
          <h4 className="font-semibold mb-3">Available Slots</h4>
          <SlotPicker
            slots={['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM']}
            selectedSlot={selectedSlot}
            onSelectSlot={(slot) => {
              setSelectedSlot(slot);
              navigate(`/pay?therapistId=${therapist._id}&amount=${therapist.sessionPrice || 1500}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
