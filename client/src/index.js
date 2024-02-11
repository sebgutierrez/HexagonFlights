import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { MantineProvider, ColorSchemeScript, Container, Group } from '@mantine/core'
import '@mantine/core/styles.css';
import { Top } from './Components/title.js'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MantineProvider>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>Hexagon</title>

        <ColorSchemeScript />
      </head>
      
      <body>
        <Top />
        <Container
          style={{ width: '100vhf', boxSizing: 'border-box', border: '3px solid black', height:'500px'}}
          size=""
        >
          <App />
        </Container>
      </body>
    </html>
  </MantineProvider>

);
