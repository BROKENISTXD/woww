import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([
    { text: "Hi, I'm Sandi, your virtual assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    setMessages([...messages, { text: inputValue, sender: 'user' }]);
    setInputValue('');

    // Add bot response after a short delay
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Waiting for support to respond. A customer service representative will be with you shortly.", 
        sender: 'bot' 
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors duration-200 z-50"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-lg shadow-xl z-50 flex flex-col overflow-hidden border border-gray-200">
          {/* Chat header */}
          <div className="bg-red-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                <span className="text-red-600 font-bold">S</span>
              </div>
              <div>
                <h3 className="font-bold">Sandi</h3>
                <p className="text-xs">Santander Virtual Assistant</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto max-h-96 bg-gray-50">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user' 
                        ? 'bg-red-600 text-white' 
                        : 'bg-white text-gray-800 border border-gray-200'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 bg-white">
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button 
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded-r-lg hover:bg-red-700 transition-colors duration-200"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;