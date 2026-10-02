import React from 'react';

export default function SlotPicker({ slots = [], onSelectSlot, selectedSlot }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {slots.map((slot, index) => (
        <button
          key={index}
          onClick={() => onSelectSlot(slot)}
          className={`py-2.5 px-3 border rounded-lg text-sm text-center font-medium transition cursor-pointer ${
            selectedSlot === slot 
              ? 'bg-blue-600 text-white border-blue-600' 
              : 'border-gray-200 hover:border-gray-400 bg-white'
          }`}
        >
          {slot}
        </button>
      ))}
    </div>
  );
}
