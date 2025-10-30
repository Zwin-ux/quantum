// Module 6: Signal Gallery - View recent signals from other users

import { api } from '../utils/api.js';

export class Gallery {
    constructor() {
        this.container = document.getElementById('gallery-container');
        this.gridContainer = document.getElementById('gallery-grid');
        this.statsDisplay = document.getElementById('gallery-stats');
        this.refreshBtn = document.getElementById('refresh-gallery');
        
        this.isActive = false;
        this.signals = [];
        this.selectedIndex = null;
        
        // Point tracking
        this.moduleIndex = 5;
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        if (this.refreshBtn) {
            this.refreshBtn.addEventListener('click', () => this.loadSignals());
        }
    }

    async start() {
        this.isActive = true;
        await this.loadSignals();
        await this.loadStats();
    }

    async loadSignals() {
        if (!this.isActive) return;

        const data = await api.getSignals(12);
        this.signals = data.signals || [];
        this.renderGallery();
    }

    async loadStats() {
        const stats = await api.getStats();
        if (stats && this.statsDisplay) {
            this.statsDisplay.innerHTML = `
                <div class="text-xs opacity-50 space-y-1">
                    <p>SIGNALS: ${stats.totalSignals}</p>
                    <p>OBSERVATIONS: ${stats.totalObservations}</p>
                    <p>VISITORS: ${stats.uniqueVisitors}</p>
                </div>
            `;
        }
    }

    renderGallery() {
        if (!this.gridContainer) return;

        this.gridContainer.innerHTML = '';

        if (this.signals.length === 0) {
            this.gridContainer.innerHTML = `
                <div class="col-span-full text-center text-xs opacity-30">
                    NO_SIGNALS_DETECTED
                </div>
            `;
            return;
        }

        this.signals.forEach((signal, index) => {
            const card = this.createSignalCard(signal, index);
            this.gridContainer.appendChild(card);
        });
    }

    createSignalCard(signal, index) {
        const card = document.createElement('div');
        card.className = 'signal-card border border-quantum-cyan border-opacity-20 p-3 hover:border-opacity-50 transition-all cursor-pointer';
        card.dataset.index = index;

        // Create mini grid preview (8x8 sample)
        const miniGrid = document.createElement('div');
        miniGrid.className = 'mini-grid';
        miniGrid.style.display = 'grid';
        miniGrid.style.gridTemplateColumns = 'repeat(8, 8px)';
        miniGrid.style.gridTemplateRows = 'repeat(8, 8px)';
        miniGrid.style.gap = '1px';

        // Sample pattern (take every 4th cell for 8x8 preview)
        const pattern = signal.pattern || [];
        for (let i = 0; i < 64; i++) {
            const sourceIndex = Math.floor(i * (pattern.length / 64));
            const cell = document.createElement('div');
            const state = pattern[sourceIndex] || 0;
            cell.className = `w-2 h-2 ${state === 1 ? 'bg-quantum-cyan' : 'bg-quantum-dark'} opacity-${state === 1 ? '70' : '20'}`;
            miniGrid.appendChild(cell);
        }

        // Hash display
        const hashEl = document.createElement('div');
        hashEl.className = 'text-xs text-quantum-orange mt-2 truncate';
        hashEl.textContent = signal.hash;

        // Timestamp
        const timeEl = document.createElement('div');
        timeEl.className = 'text-xs opacity-30 mt-1';
        const timeAgo = this.getTimeAgo(signal.timestamp);
        timeEl.textContent = timeAgo;

        card.appendChild(miniGrid);
        card.appendChild(hashEl);
        card.appendChild(timeEl);

        // Click to expand
        card.addEventListener('click', () => this.showSignalDetail(signal));

        return card;
    }

    showSignalDetail(signal) {
        // Could expand to show full grid in modal
        console.log('Signal detail:', signal);
    }

    getTimeAgo(timestamp) {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        
        if (seconds < 60) return `${seconds}s`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
        return `${Math.floor(seconds / 86400)}d`;
    }

    stop() {
        this.isActive = false;
    }

    reset() {
        this.signals = [];
        if (this.gridContainer) {
            this.gridContainer.innerHTML = '';
        }
    }
}
