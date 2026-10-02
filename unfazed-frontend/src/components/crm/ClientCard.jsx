import React from 'react';

export default function ClientCard({ client }) {
  if (!client) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs">
      <h3 className="text-xl font-bold mb-2">{client.name}</h3>
      <p className="text-sm text-gray-500 mb-4">{client.email} | {client.phone}</p>
      <div className="text-sm">
        <h4 className="font-semibold text-gray-700">Presenting Concern:</h4>
        <p className="text-gray-600 mt-1">{client.intakeData?.presentingConcern || 'None provided'}</p>
      </div>
    </div>
  );
}
