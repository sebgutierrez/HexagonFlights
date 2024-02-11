import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'
const { GoogleGenerativeAI } = require('@google/generative-ai')


const searchFlights = async (searchParams) => {
  const url = 'https://test.api.amadeus.com/v2/shopping/flight-offers';
  const headers = {
    'Authorization': `Bearer YOUR_AMADEUS_API_KEY`
  };

  try {
    const response = await axios.get(url, { headers, params: searchParams });
    return response.data;
  } catch (error) {
    console.error('Amadeus API request failed:', error);
    return null;
  }
};

const fetchGeneratedText = async (prompt) => {
  try {
    const response = await fetch('/generate-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    console.log(data.response); // Use this response to update the state and UI
  } catch (error) {
    console.error('Error fetching generated text:', error);
  }
};



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

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const userMessage = { text: inputText, sender: 'user' };
  //   setMessages(messages => [...messages, userMessage]);
  
  //   try {
  //     const openAIResponse = await axios.post(
  //       'https://api.openai.com/v1/chat/completions',
  //       {
  //         model: "gpt-3.5-turbo", 
  //         prompt: inputText,
  //         max_tokens: 60,
  //         temperature: 0.7,
  //         messages: [
  //           {"role": "system", "content": "You are a helpful assistant."},
  //           {"role": "user", "content": inputText},
  //         ]
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer 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`,
  //         },
  //       });
  //     const botMessage = {
  //       text: openAIResponse.data.choices[0].text.trim(),
  //       sender: 'bot',
  //       borderColor: 'blue', // You can customize this
  //       className: 'msg_cotainer_receive' // You can customize this
  //     };
  //     setMessages(messages => [...messages, botMessage]);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  
  //   setInputText(''); // Clear input after sending
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userMessage = { text: inputText, sender: 'user' };
    setMessages(messages => [...messages, userMessage]);

    try {
      // Assuming '/api/gemini' is your backend endpoint that communicates with the Gemini AI API
      const response = await axios.post('/api/gemini', { prompt: inputText });
      const botMessage = {
        text: response.data, // Assuming the response directly contains the text
        sender: 'bot',
        borderColor: 'blue',
        className: 'msg_cotainer_receive'
      };
      setMessages(messages => [...messages, botMessage]);
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
