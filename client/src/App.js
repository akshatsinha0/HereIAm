import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import LoginModal from './LoginModal';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';

function App() {
  const [messages, setMessages] = useState([
    { sender: 'Akshat Sinha', text: 'Hello, how are you?', time: '10:45 AM', type: 'received' },
    { sender: 'You', text: 'I am good, thanks!', time: '10:46 AM', type: 'sent' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim() === '') return;
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage = {
      sender: 'You',
      text: input,
      time: currentTime,
      type: 'sent'
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInput('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-logo">
        <img src={`${process.env.PUBLIC_URL}/chat-logo.png`} alt="Chat Logo" />
          <h1>HereIAm Chat</h1>
        </div>
        <button className="login-btn" onClick={openModal}>Login</button>
        <nav>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Sign Up</Link>
            <Link to="/chat" className="nav-link">Chat</Link>
          </nav>
      </header>
      <main className="chat-container">
        <div className="message-list">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`}>
              <span className="sender">{msg.sender}</span>
              <p>{msg.text}</p>
              <span className="time">{msg.time}</span>
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/chat" element={<Chat />} />
            {/* Default route */}
            <Route path="/" element={<Chat />} />
          </Routes>
      </main>
      {isModalOpen && <LoginModal closeModal={closeModal} />}
    </div>
  );
}

export default App;
