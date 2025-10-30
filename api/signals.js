// Vercel Serverless Function - Signal Storage
// GET: Retrieve recent signals
// POST: Store new signal

const signals = [];
const MAX_SIGNALS = 100;

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        // Return recent signals
        const limit = parseInt(req.query.limit) || 20;
        const recent = signals.slice(-limit).reverse();
        
        return res.status(200).json({
            signals: recent,
            total: signals.length
        });
    }

    if (req.method === 'POST') {
        const { hash, pattern, timestamp } = req.body;

        if (!hash || !pattern) {
            return res.status(400).json({ error: 'Missing hash or pattern' });
        }

        // Store signal
        const signal = {
            hash,
            pattern: pattern.slice(0, 1024), // Limit pattern size
            timestamp: timestamp || Date.now(),
            id: signals.length
        };

        signals.push(signal);

        // Keep only last MAX_SIGNALS
        if (signals.length > MAX_SIGNALS) {
            signals.shift();
        }

        return res.status(201).json({ 
            success: true,
            id: signal.id 
        });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
