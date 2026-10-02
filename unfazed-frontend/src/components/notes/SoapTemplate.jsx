import React from 'react';

export default function SoapTemplate({ data, onChange }) {
  const fields = ['subjective', 'objective', 'assessment', 'plan'];

  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <div key={field}>
          <label className="block text-xs uppercase font-bold text-gray-500 mb-1">{field}</label>
          <textarea
            rows="3"
            value={data[field] || ''}
            onChange={(e) => onChange(field, e.target.value)}
            className="w-full border border-gray-200 rounded-md p-2 text-sm focus:ring-1 focus:ring-blue-500 bg-white"
          />
        </div>
      ))}
    </div>
  );
}
