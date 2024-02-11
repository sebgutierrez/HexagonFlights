import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported here
import '@fortawesome/fontawesome-free/css/all.min.css'; // FontAwesome
import './App.css'; // Your custom CSS
import Chatbot from './Components/chatbot'; // Import the Chatbot component
import { Background } from './Components/gridbox';

ReactDOM.render(
  <React.StrictMode>
    <div>
      <Background/>
    <Chatbot />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
