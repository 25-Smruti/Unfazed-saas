import React from 'react';

export default function About({ therapist }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-xs mb-6">
      <h3 className="text-lg font-bold mb-2">About Practice</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">{therapist?.bio}</p>
      <div className="text-sm text-gray-500">
        <span className="font-semibold text-gray-700">Languages:</span> {therapist?.languages?.join(', ') || 'English, Hindi'}
      </div>
    </div>
  );
}
