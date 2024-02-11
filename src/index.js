import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported here
import '@fortawesome/fontawesome-free/css/all.min.css'; // FontAwesome
import './App.css'; // Your custom CSS
import BackgroundScene from './Components/backgroundScene';
import Chatbot from './Components/chatbot'; // Import the Chatbot component

ReactDOM.render(
  <React.StrictMode>
    <div>
      <BackgroundScene/>
    <Chatbot />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
