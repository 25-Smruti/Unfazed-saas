import React from 'react';

export default function StatCard({ title, value }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs">
      <span className="text-gray-500 text-xs font-semibold uppercase">{title}</span>
      <div className="text-2xl font-bold mt-2 text-gray-900">{value}</div>
    </div>
  );
}
