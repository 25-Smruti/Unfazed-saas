import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axiosInstance';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Button from '../../components/common/Button';

export default function Register() {
  const { register, handleSubmit } = useForm();
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        specializations: data.specializations.split(',').map((s) => s.trim()),
        languages: data.languages.split(',').map((l) => l.trim())
      };
      const res = await api.post('/auth/register', payload);
      loginUser(res.data.therapist, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-8 border rounded-xl bg-white shadow-xs">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Practice Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name (Dr./Practitioner)</label>
          <input {...register('name')} required className="w-full border rounded-lg p-2.5 mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input {...register('email')} type="email" required className="w-full border rounded-lg p-2.5 mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input {...register('password')} type="password" required className="w-full border rounded-lg p-2.5 mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium">Specializations (comma separated)</label>
          <input {...register('specializations')} placeholder="Anxiety, CBT, Trauma" className="w-full border rounded-lg p-2.5 mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium">Languages (comma separated)</label>
          <input {...register('languages')} placeholder="English, Hindi" className="w-full border rounded-lg p-2.5 mt-1" />
        </div>
        <Button type="submit" className="w-full">Create SaaS Account</Button>
      </form>
      <p className="text-center text-sm text-gray-500 mt-4">
        Already registered? <Link to="/login" className="text-blue-600 underline">Sign In</Link>
      </p>
    </div>
  );
}
