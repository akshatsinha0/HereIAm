import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { io } from 'socket.io-client';

// Create a socket connection (adjust the URL as needed)
const socket = io('http://localhost:5001');

const Chat = () => {
  // Optionally, we can use the global state for user info etc.
  // const { state, dispatch } = useContext(AppContext);
  // const { messages } = state; 

  // Use local state for chat messages to avoid conflict with global state
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    // Listen for incoming messages
    socket.on('chat message', (msg) => {
      setChatMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up the listener when the component unmounts
    return () => {
      socket.off('chat message');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() === '') return;
    // Emit the message to the server
    socket.emit('chat message', message);
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="page">
      <h2>Chat Room</h2>
      <div className="message-list">
        {chatMessages.map((msg, index) => (
          <div key={index} className="message">
            {/* Assuming msg is a string; if it’s an object, adjust accordingly */}
            <p>{msg}</p>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
