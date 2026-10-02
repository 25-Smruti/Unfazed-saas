import React from 'react';

export default function InvoiceView({ invoiceUrl }) {
  return (
    <div className="p-4 border rounded-lg bg-gray-50 flex justify-between items-center">
      <span>GST Tax Invoice</span>
      <a href={invoiceUrl} target="_blank" rel="noreferrer" className="text-blue-600 font-semibold underline">
        Download PDF
      </a>
    </div>
  );
}
