import React, { useEffect, useState } from 'react';
import api from '../../api/axiosInstance';
import ClientTable from '../../components/crm/ClientTable';
import ClientCard from '../../components/crm/ClientCard';
import Loader from '../../components/common/Loader';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    presentingConcern: ''
  });

  const fetchClients = () => {
    api.get('/clients')
      .then((res) => setClients(res.data.clients || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateClient = async (e) => {
    e.preventDefault();
    try {
      const stored = localStorage.getItem('unfazed_user');
      const user = stored ? JSON.parse(stored) : null;
      if (!user) return alert('Please login first');

      await api.post('/clients/intake', {
        therapist_id: user.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        intakeData: {
          presentingConcern: formData.presentingConcern || 'General consultation',
          demographics: { city: formData.city }
        },
        consentAgreed: true
      });

      setFormData({ name: '', email: '', phone: '', city: '', presentingConcern: '' });
      setIsModalOpen(false);
      fetchClients();
      alert('Client registered successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating client');
    }
  };

  const handleDeleteClient = async (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to remove "${name}" from your clients list?`);
    if (!confirmDelete) return;

    try {
      await api.delete(`/clients/${id}`);
      if (selectedClient?._id === id) {
        setSelectedClient(null);
      }
      fetchClients();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to remove client');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Client Relationship Management (CRM)</h2>
          <p className="text-gray-500 text-sm mt-1">Manage private client intake records and history</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>+ Add New Client</Button>
      </div>

      {clients.length === 0 ? (
        <div className="p-10 text-center bg-white border border-gray-200 rounded-xl text-gray-500">
          No clients registered yet. Click <strong>"+ Add New Client"</strong> above to record your first client.
        </div>
      ) : (
        <ClientTable 
          clients={clients} 
          onSelectClient={setSelectedClient} 
          onDeleteClient={handleDeleteClient} 
        />
      )}

      {selectedClient && <ClientCard client={selectedClient} />}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register New Client">
        <form onSubmit={handleCreateClient} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Rahul Verma"
              className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. rahul@example.com"
              className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +91 9876543210"
              className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">City / Location</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. Mumbai, Maharashtra"
              className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Presenting Concern / Notes</label>
            <textarea
              name="presentingConcern"
              rows="3"
              value={formData.presentingConcern}
              onChange={handleChange}
              placeholder="e.g. Chronic work-related anxiety and sleep difficulties."
              className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save Client</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}