import React, { useState } from 'react';
import MessageBubble from './MessageBubble';

export default function ChatWindow({ messages, onSendMessage, currentUser }) {
  const [text, setText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text);
    setText('');
  };

  return (
    <div className="flex flex-col h-[400px] border border-gray-200 rounded-xl bg-white overflow-hidden shadow-xs">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((m, idx) => (
          <MessageBubble key={idx} message={m} isOwn={m.sender === currentUser} />
        ))}
      </div>
      <form onSubmit={handleSend} className="p-3 border-t border-gray-100 flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer">
          Send
        </button>
      </form>
    </div>
  );
}
