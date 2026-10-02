import React from 'react';

export default function ClientTable({ clients, onSelectClient, onDeleteClient }) {
  return (
    <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl">
      <table className="w-full text-left text-sm text-gray-600">
        <thead className="bg-gray-50 border-b border-gray-200 font-semibold text-gray-700">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Status</th>
            <th className="p-4">Consent Status</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c._id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="p-4 font-medium text-gray-900">{c.name}</td>
              <td className="p-4">{c.email}</td>
              <td className="p-4">
                <span className="bg-green-100 text-green-700 text-xs px-2.5 py-0.5 rounded-full font-medium">
                  {c.status}
                </span>
              </td>
              <td className="p-4">{c.consentAgreed ? 'Audited' : 'Pending'}</td>
              <td className="p-4 text-right space-x-3">
                <button 
                  onClick={() => onSelectClient(c)} 
                  className="text-blue-600 hover:underline font-medium cursor-pointer"
                >
                  View Details
                </button>
                <button
                  onClick={() => onDeleteClient(c._id, c.name)}
                  className="text-red-500 hover:text-red-700 hover:underline font-medium cursor-pointer"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}