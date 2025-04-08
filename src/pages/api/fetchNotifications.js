// src/pages/api/fetchNotifications.js
import { fetchAllNotif } from '@/lib/db';

export default async function handler(req, res) {
  try {
    const notifications = await fetchAllNotif();
    res.status(200).json(notifications);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
