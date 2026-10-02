import React from 'react';
import Button from '../common/Button';

export default function CheckoutForm({ amount, onCheckout }) {
  return (
    <div className="bg-white border rounded-xl p-6 border-gray-200 shadow-xs">
      <h3 className="font-bold text-lg mb-4">Complete Payment</h3>
      <div className="flex justify-between items-center mb-6">
        <span className="text-gray-600">Total Payable:</span>
        <span className="text-2xl font-bold">₹{amount}</span>
      </div>
      <Button onClick={onCheckout} className="w-full">Pay with Razorpay</Button>
    </div>
  );
}
