import React from 'react';

export default function MessageBubble({ message, isOwn }) {
  return (
    <div className={`flex flex-col mb-2 ${isOwn ? 'items-end' : 'items-start'}`}>
      <div className={`max-w-[70%] px-4 py-2 rounded-xl text-sm ${
        isOwn ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'
      }`}>
        {message.text}
      </div>
      <span className="text-[10px] text-gray-400 mt-1">{message.sender}</span>
    </div>
  );
}
