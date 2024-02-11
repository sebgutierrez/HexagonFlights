import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'
import { Map } from './Map'




const getUserLocatoin = () =>{
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser."));
    } else {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }
  });
}

const fetchWelcomeMessage = async (prompt) => {
  try {
    const response = await fetch('http://localhost:5000', { // Adjust the URL/port as necessary
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt}),
    });
    const data = await response.json();
    console.log(data.response);
    return data.response; // Return the response text for further use
  } catch (error) {
    console.error('Error fetching generated text:', error);
    return "Sorry, I couldn't understand that."; // Fallback response
  }
}

const fetchGeneratedText = async (prompt) => {
  try {
    const response = await fetch('http://localhost:5000/generate-response', { // Adjust the URL/port as necessary
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({ prompt}), 
      //! EDITING THIS
      body:prompt['message'],
    });
    const data = await response.json();
    console.log(data.response);
    // return data.response; // Return the response text for further use
    return data;
  } catch (error) {
    console.error('Error fetching generated text:', error);
    return "Sorry, I couldn't understand that."; // Fallback response
  }
};




export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false); 
  const messageContainerRef = useRef(null);

  useEffect(() => {
    const getWelcomeMessage = async () => {
      const welcomeMessage = await fetchWelcomeMessage();
      setMessages([{
        type: 'text',
        text: welcomeMessage,
        sender: 'bot',
        borderColor: 'red',
      }]);
    };

    getWelcomeMessage();
  }, []);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const addTextMessage = (text, sender) => {
    setMessages(messages => [...messages, { type: 'text', text, sender, borderColor: sender === 'user' ? 'blue' : 'red' }]);
  };

  const addMapMessage = (coordinates) => {
    setMessages(messages => [...messages, { type: 'map', coordinates }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    if (!inputText.trim()) return; // Prevent empty messages
    addTextMessage(inputText, 'user');
    setHasInteracted(true);

    const position = await getUserLocatoin();
    const {latitude, longitude} = position.coords;
    const promptWithLocation = `${inputText} [User's location: Latitude ${latitude}, Longitude ${longitude}]`;

    // const geminiResponse = await fetchGeneratedText(promptWithLocation); // Get the response from Gemini
    const geminiResponse = await fetchGeneratedText({
      message: inputText,
      lat: latitude,
      lng: longitude
    });

    const {message, lat, lng} = geminiResponse;

    addTextMessage(message, 'bot');                      // ! backend server

  //  if (inputText.toLowerCase().includes('map')) { // Adjust based on your logic or response
  //     getUserLocatoin().then(position => {
  //       const { latitude, longitude } = position.coords;
  //       addMapMessage({ lat: latitude, lng: longitude }, "You are here"); // Add a marker label as needed
  //     }).catch(error => {
  //       console.error("Error getting location", error);
  //       addTextMessage("Failed to get location.", 'bot');
  //     });
  //   }

  //  setCoordinates({lat: latitude, lng: longitude}, {lat, lng}); // ! OR
   setCoordinates([
    { lat: latitude, lng: longitude }, // User's current location
    { lat, lng } // AI-suggested destination
  ]);

    setInputText(''); // Clear input after sending
  };

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center h-100">
        <div className="col-md-8 col-xl-6 chat">
          <div className="card">
            <div className="card-header msg_head">
              {/* Optional: Any header content */}
            </div>
            <div ref={messageContainerRef} className="card-body msg_card_body" style={{ overflowY: 'auto' }}>
              {messages.map((msg, index) => {
                if (msg.type === 'text') {
                  return (
                    <div key={index} className={`d-flex justify-content-${msg.sender === 'user' ? 'end' : 'start'} mb-4`}>
                      <div className={`msg_cotainer_${msg.sender === 'user' ? 'send' : 'receive'}`} style={{ color: msg.sender === 'user' ? 'white' : 'black', borderColor: msg.borderColor }}>
                        {msg.text}
                      </div>
                    </div>
                  );
                } else if (msg.type === 'map') {
                  return (
                    <div key={index} className="d-flex justify-content-start mb-4">
                      <div className="msg_container_map" style={{ maxWidth: '100%', height: '250px' }}> {/* Adjust size of map */}
                        <Map coordinates={coordinates} />
                      </div>
                    </div>
                  );
                }
                return null; 
              })}
            </div>
            <div className="card-footer">
              <form className="input-group" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="form-control type_msg"
                  placeholder={!hasInteracted ? "Hey, where are you looking to travel?" : ""}
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    if (!hasInteracted) setHasInteracted(true);
                  }}
                  required
                />
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
