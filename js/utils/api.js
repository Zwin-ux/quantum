// API Client for backend communication

const API_BASE = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api'
    : '/api';

export const api = {
    // Store a signal
    async storeSignal(hash, pattern) {
        try {
            const response = await fetch(`${API_BASE}/signals`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    hash,
                    pattern,
                    timestamp: Date.now()
                })
            });
            return await response.json();
        } catch (error) {
            console.error('Failed to store signal:', error);
            return { success: false };
        }
    },

    // Get recent signals
    async getSignals(limit = 20) {
        try {
            const response = await fetch(`${API_BASE}/signals?limit=${limit}`);
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch signals:', error);
            return { signals: [], total: 0 };
        }
    },

    // Get global stats
    async getStats() {
        try {
            const response = await fetch(`${API_BASE}/stats`);
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch stats:', error);
            return null;
        }
    },

    // Track event
    async trackEvent(type) {
        try {
            const visitorId = this.getVisitorId();
            await fetch(`${API_BASE}/stats`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, visitorId })
            });
        } catch (error) {
            console.error('Failed to track event:', error);
        }
    },

    // Get or create visitor ID
    getVisitorId() {
        let id = localStorage.getItem('quantum_visitor_id');
        if (!id) {
            id = 'v_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
            localStorage.setItem('quantum_visitor_id', id);
        }
        return id;
    }
};
