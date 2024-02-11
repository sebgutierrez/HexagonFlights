import React, { useEffect, useState, useRef } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const messageContainerRef = useRef(null);

  useEffect(() => {
    const initialBotMessage = {
      text: "Hey, where are you looking to travel? I could be of some help.",
      sender: 'bot',
      borderColor: 'red', // Added borderColor property
      className: 'msg_cotainer_receive' // Added className property
    };
    setMessages([initialBotMessage]);
  }, []);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newMessage = { text: inputText, sender: 'user' };
    setMessages([...messages, newMessage]);

    try {
      const response = await fetch('/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ msg: inputText }),
      });
      const data = await response.json();
      const botMessage = { text: data, sender: 'bot' };
      setMessages([...messages, newMessage, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    }

    setInputText(''); // Clear input after sending
  };

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center h-100">
        <div className="col-md-8 col-xl-6 chat">
          <div className="card">
            {/* Card Header */}
            <div className="card-header msg_head">
              {/* Header Content */}
            </div>
            {/* Message Area */}
            <div ref={messageContainerRef} className="card-body msg_card_body" style={{ overflowY: 'auto' }}>
              {messages.map((msg, index) => (
                <div key={index} className={`d-flex justify-content-${msg.sender === 'user' ? 'end' : 'start'} mb-4`}>
                  <div className={`msg_cotainer_${msg.sender === 'user' ? 'send' : 'receive'}`} style={{ color: msg.sender === 'user' ? 'white' : 'black', borderColor: msg.borderColor }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            {/* Input Area */}
            <div className="card-footer">
              <form className="input-group" onSubmit={handleSubmit}>
                <input type="text" className="form-control type_msg" placeholder="Type your message..." value={inputText} onChange={(e) => setInputText(e.target.value)} required />
                <div className="input-group-append">
                  <button className="input-group-text send_btn"><i className="fas fa-location-arrow"></i></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
