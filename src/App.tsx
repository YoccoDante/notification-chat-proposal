import React, { useState } from 'react';
import './App.css';
import Chat from './components/Chat';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { NotificationModel } from './models/notificationModel';
import { UserModel } from './models/userModel';
import { MessageModel } from './models/messageModel';

interface Chat {
  id: number;
  messages: MessageModel[];
}

const App: React.FC = () => {
  
  const [notifications, setNotifications] = useState<NotificationModel[]>([
    {from:'Martina',content:'Martina ha comentado la publicación "Cuarto en estreno"', read:false},
    {from:'Pablo',content:'Pablo ha conseguido un nuevo hogar', read:true},
    {from:'Piero',content:'Piero ha conseguido un nuevo hogar', read:true},
    {from:'Carla',content:'Carla se ha unido al chat', read:false},
    // Add more notifications here...
  ]);
  
  const users:UserModel[] = [
    {_id:1,name:'Pablo'},
    {_id:2,name:'Piero'},
    {_id:3,name:'Carla'}
  ]


  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      messages: [
        { sender: { _id: 1, name: 'user1' }, content: 'hi!' },
        { sender: { _id: 0, name: 'me' }, content: 'hi there!' },
        { sender: { _id: 1, name: 'user1' }, content: 'how r u?' },
      ],
    },
    {
      id: 2,
      messages: [
        { sender: { _id: 2, name: 'user2' }, content: 'it\'s late!' },
        { sender: { _id: 0, name: 'me' }, content: 'I know!' },
        { sender: { _id: 2, name: 'user2' }, content: 'hurry up' },
      ],
    },
    // Add more chats here...
  ]);

  const [selectedUsers, setSelectedUsers] = useState<UserModel[]>([]);

  const handleSelectUser = (user: UserModel) => {
    if (!selectedUsers.some(selectedUser => selectedUser._id === user._id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleCloseChat = (user: UserModel) => {
    setSelectedUsers(selectedUsers.filter(u => u._id !== user._id));
  };

  const handleSendMessage = (chatId: number, text: string) => {
    setChats(chats => {
      const chatIndex = chats.findIndex(chat => chat.id === chatId);
      if (chatIndex !== -1) {
        // If the chat exists, update its messages
        const updatedChats = [...chats];
        updatedChats[chatIndex] = {
          ...updatedChats[chatIndex],
          messages: [...updatedChats[chatIndex].messages, { sender: { _id: 0, name: 'me' }, content: text }],
        };
        return updatedChats;
      } else {
        // If the chat doesn't exist, create a new one
        return [...chats, { id: chatId, messages: [{ sender: { _id: 0, name: 'me' }, content: text }] }];
      }
    });
    setNotifications([...notifications, { from: 'me', content: 'mensaje enviado correctamente', read: false }]);
  };

  return (
    <div className="app">
      <Navbar notifications={notifications} setNotifications={setNotifications}/>
      <Sidebar users={users} onSelectUser={handleSelectUser} />
      <div className="chats">
        {selectedUsers.map(user => {
          const chat = chats.find(chat => chat.id === user._id);
          return (
            <Chat key={user._id} user={user} messages={chat ? chat.messages : []} onSendMessage={(text) => handleSendMessage(user._id, text)} onClose={() => handleCloseChat(user)} />
          );
        })}
      </div>
    </div>
  );
};

export default App;