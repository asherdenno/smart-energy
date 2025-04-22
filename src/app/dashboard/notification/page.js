'use client'
import {  useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Link } from 'next/link';

export default function NotificationsPage() {
    const [allNotif, setAllNotif] = useState([]);
    const [filterNotif, setFilterNotif] = useState([]);
    const { data:session } = useSession();

    useEffect(() => {
        fetch('/api/fetchNotifications')  
          .then(res => res.json())
          .then(data => {
            console.log('revieved in frontend:', data)
            setAllNotif(data)
          })
          .catch(err => console.error('Fetch error:', err));
    }, []);

    useEffect(() => {
        if (session?.user?.account_id && allNotif.length > 0) {
            const accountId = session?.user?.name;
            console.log(accountId)
            const userNotif = allNotif.filter(
                note => note.f_name === accountId
            );
            console.log(userNotif);
            setFilterNotif(userNotif);
        }
    }, [session, allNotif]);

    return (
        <div>
            <h1>Notification History</h1>
            {filterNotif.length === 0 ? (
                <li>No notifications found for {session?.user?.name}, account id: {session?.user?.account_id}</li>
            ) : (
                <ul>
                    {filterNotif.length === 0? (
                        <p>No notifications found</p>
                    ) : (
                        <ul>
                            {filterNotif.map((note, idx) => (
                                <li key={idx}>
                                    <p>From: {note.from_account_id}</p>
                                    <p>Type: {note.type}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </ul>
            )}
        </div>
    )
}