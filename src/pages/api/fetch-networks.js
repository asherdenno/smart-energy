import { fetchNetworks, fetchNetwork } from '@/lib/db';

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const { searchString, accountTypeId, networkFilterId } = req.body;
            if (searchString === null || searchString === undefined) {
                return res.status(400).json({ message: 'Search string is required' });
            }
            if (accountTypeId === 1) {
                const networks = await fetchNetworks(searchString);
                res.status(200).json(networks);
            } else if (accountTypeId === 3) {
                console.log("YOUR ACCONT TYPE ID IS 3");
                const network = await fetchNetwork(networkFilterId);
                if (network) {
                    res.status(200).json(network);
                } else {
                    res.status(404).json({ message: 'Network not found' });
                }
            }
        } else {
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: error.message });
    }
}