import React from 'react';
import { useSearchParams } from 'react-router-dom';
import CheckoutForm from '../../components/payments/CheckoutForm';
import api from '../../api/axiosInstance';

export default function PaymentPage() {
  const [searchParams] = useSearchParams();
  const amount = searchParams.get('amount') || 1500;
  const therapistId = searchParams.get('therapistId');

  const handlePayment = async () => {
    try {
      const res = await api.post('/payments/create-order', {
        amount,
        therapist_id: therapistId,
        client_id: '674e2d3cf38b1f5e04221199'
      });
      alert(`Razorpay Order created: ${res.data.order.id}. Test transaction simulated.`);
    } catch (err) {
      alert('Order creation failed');
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 px-4">
      <CheckoutForm amount={amount} onCheckout={handlePayment} />
    </div>
  );
}
