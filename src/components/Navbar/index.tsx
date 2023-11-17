import React, { useEffect, useState } from 'react';
import './navbar.css';
import Notification from '../Notification';
import { NotificationModel } from '../../models/notificationModel';

interface NavbarProps {
  notifications: NotificationModel[];
  setNotifications:React.Dispatch<React.SetStateAction<NotificationModel[]>>
}

function Navbar({ notifications, setNotifications }:NavbarProps) {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [unread, setUnread] = useState<number|null>(null)
  const notificationIcon = '🔔'
  const handleClickNotifications = () => {
    setShowNotifications(!showNotifications)
    if (!showNotifications) return
    const newNotifications = notifications.map(notification => ({ ...notification, read: true }));
    setNotifications(newNotifications)
  }
  useEffect(() => {
    const unreads = notifications.filter(notification => !notification.read).length;
    setUnread(unreads > 0 ? unreads : null);
  },[notifications])
  return (
    <div className="navbar">
      <h1>Te lo alquilo chat</h1>
      <div className="notification-icon" onClick={handleClickNotifications}>
        <span>{notificationIcon}</span>
        {showNotifications && <Notification notifications={notifications} />}
        {unread !== null &&
        <p className='notification-quantity'>{unread}</p>}
      </div>
    </div>
  );
};

export default Navbar;