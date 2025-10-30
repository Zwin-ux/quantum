// Vercel Serverless Function - Global Stats
// GET: Retrieve global statistics

let stats = {
    totalSignals: 0,
    totalObservations: 0,
    totalInteractions: 0,
    uniqueVisitors: new Set(),
    startTime: Date.now()
};

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        const uptime = Math.floor((Date.now() - stats.startTime) / 1000);
        
        return res.status(200).json({
            totalSignals: stats.totalSignals,
            totalObservations: stats.totalObservations,
            totalInteractions: stats.totalInteractions,
            uniqueVisitors: stats.uniqueVisitors.size,
            uptime
        });
    }

    if (req.method === 'POST') {
        const { type, visitorId } = req.body;

        if (visitorId) {
            stats.uniqueVisitors.add(visitorId);
        }

        switch (type) {
            case 'signal':
                stats.totalSignals++;
                break;
            case 'observation':
                stats.totalObservations++;
                break;
            case 'interaction':
                stats.totalInteractions++;
                break;
        }

        return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
