import React, { useState } from 'react';
import './chat.css'
import { UserModel } from '../../models/userModel';

interface Message {
  sender: UserModel;
  content: string;
}

interface ChatProps {
  user: UserModel;
  messages: Message[];
  onSendMessage: (message: string) => void;
  onClose: () => void;
}

function Chat ({ user, messages, onSendMessage, onClose }:ChatProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    onSendMessage(message);
    setMessage('');
  };

  return (
    <div className={`chat`}>
      <p>{user.name}</p>
      <button className="close-button" onClick={onClose}>X</button>
      <div className='message-area'>
        {messages.map((message, index) => (
          <div key={index} className={message.sender.name === 'me' ? 'message-me' : 'message'}>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      <div className='typer'>
        <textarea className="textarea" value={message} onChange={e => setMessage(e.target.value)} />
        <button className="send-button" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;