import { useState, useEffect, useRef } from 'react';
import { Container, TextInput, Button, ScrollArea, Group, Text, createTheme } from '@mantine/core';

export function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    const botGreeting = {
      text: 'Hello! How can I help you?',
      sender: 'bot',
    };
    setMessages([botGreeting]);
  }, []);


  const sendMessage = () => {
    if (inputValue.trim() !== '') {
      const userMessage = { text: inputValue, sender: 'user' };
      setMessages([...messages, userMessage]);
      setInputValue('');

      fetch('http://localhost:3000/flight_searcher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.text }),
      })
        .then((response) => response.json())
        .then((data) => {
          const botResponse = {
            text: data.response,
            sender: 'bot',
          };
          setMessages((prevMessages) => [...prevMessages, botResponse]);
          scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight; // Auto scroll to bottom
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <Container h={50}>
      <ScrollArea
        ref={scrollAreaRef}
        style={{ height: 400, marginBottom: 20 }}
        scrollbarSize={2}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                border: '1px solid ',
                borderRadius: '10px',
                padding: '8px',
                marginBottom: '8px',
                alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                marginTop: index === 0 ? '4px' : '0px', // Add top padding to the first message
              }}
            >
              <div
                style={{
                  backgroundColor: message.sender === 'user' ? '#E2E8F0' : '#EBF8FF',
                  color: message.sender === 'user' ? '#000000' : '#0000FF',
                }}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <Group position="apart">
        <TextInput
          value={inputValue}
          onChange={(event) => setInputValue(event.currentTarget.value)}
          placeholder="Type your message here..."
          style={{ flexGrow: 1, marginRight: 10 }}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              sendMessage();
            }
          }}
        />
        <Button onClick={sendMessage}>Send</Button>
      </Group>
    </Container>
  );
}
