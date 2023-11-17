import React from 'react';
import './notification.css'
import { NotificationModel } from '../../models/notificationModel';
import { read } from 'fs';

interface NotificationProps {
  notifications: NotificationModel[];
}

function Notification({notifications}:NotificationProps) { 
  return (
    <div className="notifications">
    {notifications.map((notification, index) => (
      <div key={index} className={notification.read? "notification read" : "notification un-read"}>
        <span>{notification.content}</span>
        <span>{notification.read? '✅' : '❗'}</span>
      </div>
    ))}
  </div>
  )
}

export default Notification