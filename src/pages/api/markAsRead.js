import { markAsRead } from '@/lib/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {notif_id} = req.body;
    
        try{
            await markAsRead(notif_id);
            res.status(200).json({success: true});
        }catch (err){
            console.error('Failed to update notification:', err);
            return res.status(500).json({ error: 'failed to update notification' });
        }
    }
}