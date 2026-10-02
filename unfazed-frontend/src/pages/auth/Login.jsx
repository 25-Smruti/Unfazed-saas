import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axiosInstance';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Button from '../../components/common/Button';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/auth/login', data);
      loginUser(res.data.therapist, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 p-8 border rounded-xl bg-white shadow-xs">
      <h2 className="text-2xl font-bold mb-6 text-center">Therapist Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input {...register('email')} type="email" required className="w-full border rounded-lg p-2.5 mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input {...register('password')} type="password" required className="w-full border rounded-lg p-2.5 mt-1" />
        </div>
        <Button type="submit" className="w-full mt-2">Log In</Button>
      </form>
      <p className="text-center text-sm text-gray-500 mt-4">
        Don't have an account? <Link to="/register" className="text-blue-600 underline">Register</Link>
      </p>
    </div>
  );
}
