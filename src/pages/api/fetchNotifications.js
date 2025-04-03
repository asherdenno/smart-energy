import {  fetchAllNotif  } from '@/lib/db'

export default async function handler(req, res){
    try{
        const notifications = await fetchAllNotif();
        res.status(200).json(notifications);
    }catch (error){
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
}