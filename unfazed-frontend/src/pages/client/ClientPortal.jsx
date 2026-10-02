import React, { useState } from 'react';
import ChatWindow from '../../components/chat/ChatWindow';

export default function ClientPortal() {
  const [messages, setMessages] = useState([
    { sender: 'Therapist', text: 'Welcome! Looking forward to our initial session.' }
  ]);

  const handleSendMessage = (text) => {
    setMessages((prev) => [...prev, { sender: 'You', text }]);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Client Private Portal</h2>
      <ChatWindow messages={messages} onSendMessage={handleSendMessage} currentUser="You" />
    </div>
  );
}
