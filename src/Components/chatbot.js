import React, { useEffect, useState } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const initialBotMessage = {
      text: "Hey, how can I help you today?",
      sender: 'bot',
      time: new Date()
    };
    setMessages([initialBotMessage]);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newMessage = { text: inputText, sender: 'user', time: new Date() };
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
      const botMessage = { text: data, sender: 'bot', time: new Date() };
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
            <div className="card-body msg_card_body">
              {messages.map((msg, index) => (
                <div key={index} className={`d-flex justify-content-${msg.sender === 'user' ? 'end' : 'start'} mb-4`}>
                  <div className={`msg_cotainer_${msg.sender === 'user' ? 'send' : ''}`} style={{ color: msg.sender === 'user' ? 'white' : 'black' }}>
                    <span className="msg_time" style={{ float: 'right' }}>{msg.time.toLocaleTimeString()}</span>
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
