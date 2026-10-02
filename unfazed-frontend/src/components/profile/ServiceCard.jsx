import React from 'react';
import Button from '../common/Button';

export default function ServiceCard({ title, duration, price, onSelect }) {
  return (
    <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition bg-white">
      <h4 className="font-semibold text-lg">{title}</h4>
      <p className="text-gray-500 text-sm">{duration} Minutes</p>
      <div className="text-xl font-bold my-3">₹{price}</div>
      <Button onClick={onSelect} className="w-full">Select Slot</Button>
    </div>
  );
}
