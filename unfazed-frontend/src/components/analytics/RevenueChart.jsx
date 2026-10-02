import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export default function RevenueChart({ data }) {
  return (
    <div className="h-[250px] w-full bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="_id" stroke="#888888" fontSize={12} />
          <YAxis stroke="#888888" fontSize={12} />
          <Tooltip />
          <Line type="monotone" dataKey="totalRevenue" stroke="#2563eb" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
