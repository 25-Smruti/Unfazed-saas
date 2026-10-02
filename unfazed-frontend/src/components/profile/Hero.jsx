import React from 'react';

export default function Hero({ therapist }) {
  return (
    <div className="bg-slate-50 border-b border-gray-200 py-12 px-6 text-center">
      <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
        {therapist?.name?.[0] || 'T'}
      </div>
      <h1 className="text-3xl font-extrabold text-gray-900">{therapist?.name}</h1>
      <p className="text-gray-600 mt-2 max-w-md mx-auto">{therapist?.bio || 'Mental Health Professional'}</p>
      <div className="flex justify-center gap-2 mt-4 flex-wrap">
        {therapist?.specializations?.map((s, idx) => (
          <span key={idx} className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
