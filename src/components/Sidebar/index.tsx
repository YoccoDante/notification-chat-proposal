import React from 'react';
import './sidebar.css';
import { UserModel } from '../../models/userModel';

interface SidebarProps {
  users: UserModel[];
  onSelectUser: (user: UserModel) => void;
}

function Sidebar ({ users, onSelectUser }:SidebarProps) {
    
  return (
  <div className="sidebar">
    contactos:
    {users.map((user, index) => (
      <div key={index} className="user-bubble" onClick={() => onSelectUser(user)}>
        {user.name}
      </div>
    ))}
  </div>
)};

export default Sidebar;