import {  useEffect, useState  } from 'react';

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchAllNotif = async () => {
            const response = await fetch('../../page/api/fetchNotifications');
            const data = await response.json();
            setNotifications(data);
        };

        fetchNotification();
    }, );

    return (
        <div>
            <h1>Notifications</h1>
            <ul>
                {notifications.map((notification) => (
                    <li key={notification.id}>{notification.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationsPage;