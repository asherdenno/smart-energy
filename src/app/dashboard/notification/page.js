'use client'
import {  useEffect, useState } from 'react';

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetch('/api/fetchNotifications')  
          .then(res => res.json())
          .then(data => {
            console.log('revieved in frontend:', data)
            setNotifications(data)
          })
          .catch(err => console.error('Fetch error:', err));
      }, []);      

    return (
        <div>
            <h1>Notification History</h1>
            {notifications.length === 0 ? (
                <p>No notifications found</p>
            ) : (
                <ul>
                    {notifications.map((note, idx) => (
                        <li key={idx}>
                            <p>To: {note.target_account_id}</p>
                            <p>Type: {note.type}</p>
                            <p>From: {note.from_account_id}</p>
                            <p>Details: {note.detail}</p>
                            <p>Resource: {note.resource}</p>
                            <p>Status: {note.isRead}</p>
                            <p>Time: {note.time}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}