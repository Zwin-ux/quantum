// Module 3: Entanglement - Split-screen Synced Grids

import { progressTracker } from '../utils/progressTracker.js';

export class Entanglement {
    constructor() {
        this.containerA = document.getElementById('entangle-grid-a');
        this.containerB = document.getElementById('entangle-grid-b');
        this.linkBtn = document.getElementById('link-btn');

        this.gridSize = 16; // Smaller grid for better visibility
        this.gridA = [];
        this.gridB = [];
        this.tilesA = [];
        this.tilesB = [];

        this.isActive = false;
        this.isLinked = false;
        this.ghostUserActive = false;

        // Point tracking
        this.moduleIndex = 3;
        this.linkTime = null;

        // UI elements for statistics
        this.statusDisplay = document.getElementById('entangle-status');
        this.correlationDisplay = document.getElementById('entangle-correlation');
        this.matchesDisplay = document.getElementById('entangle-matches');
        this.infoDisplay = document.getElementById('entangle-info');
        this.line1 = document.getElementById('entangle-line-1');
        this.line2 = document.getElementById('entangle-line-2');
        this.symbol = document.getElementById('entangle-symbol');
    }

    init() {
        this.createGrids();
        this.setupEventListeners();
    }

    createGrids() {
        // Create Grid A (local)
        const gridElementA = document.createElement('div');
        gridElementA.className = 'quantum-grid';
        gridElementA.style.gridTemplateColumns = `repeat(${this.gridSize}, 14px)`;
        gridElementA.style.gridTemplateRows = `repeat(${this.gridSize}, 14px)`;

        // Create Grid B (remote)
        const gridElementB = document.createElement('div');
        gridElementB.className = 'quantum-grid';
        gridElementB.style.gridTemplateColumns = `repeat(${this.gridSize}, 14px)`;
        gridElementB.style.gridTemplateRows = `repeat(${this.gridSize}, 14px)`;

        // Initialize grids
        this.gridA = Array(this.gridSize * this.gridSize).fill(0);
        this.gridB = Array(this.gridSize * this.gridSize).fill(0);

        // Create tiles for both grids
        for (let i = 0; i < this.gridSize * this.gridSize; i++) {
            // Grid A tile (interactive)
            const tileA = document.createElement('div');
            tileA.className = 'grid-tile state-0';
            tileA.dataset.index = i;
            tileA.addEventListener('click', () => this.onTileClick(i));

            gridElementA.appendChild(tileA);
            this.tilesA.push(tileA);

            // Grid B tile (mirrored)
            const tileB = document.createElement('div');
            tileB.className = 'grid-tile state-0';
            tileB.dataset.index = i;
            tileB.style.pointerEvents = 'none'; // Not interactive

            gridElementB.appendChild(tileB);
            this.tilesB.push(tileB);
        }

        this.containerA.appendChild(gridElementA);
        this.containerB.appendChild(gridElementB);
    }

    setupEventListeners() {
        this.linkBtn.addEventListener('click', () => this.toggleLink());
    }

    toggleLink() {
        if (!this.isActive) return;

        this.isLinked = !this.isLinked;

        if (this.isLinked) {
            this.linkBtn.textContent = '[ UNLINK ]';
            this.linkBtn.classList.remove('border-quantum-orange');
            this.linkBtn.classList.add('border-quantum-cyan');
            this.startGhostUser();

            // Visual feedback - brighten connection
            this.line1.style.opacity = '1';
            this.line2.style.opacity = '1';
            this.symbol.style.opacity = '1';

            // Update status
            this.statusDisplay.textContent = 'ENTANGLED';
            this.infoDisplay.textContent = 'Quantum correlation active - changes propagate instantly';

            // Award points for linking
            progressTracker.addPoints(this.moduleIndex, 5);
            this.linkTime = Date.now();
        } else {
            this.linkBtn.textContent = '[ LINK ]';
            this.linkBtn.classList.remove('border-quantum-cyan');
            this.linkBtn.classList.add('border-quantum-orange');
            this.stopGhostUser();

            // Visual feedback - dim connection
            this.line1.style.opacity = '0.3';
            this.line2.style.opacity = '0.3';
            this.symbol.style.opacity = '0.3';

            // Update status
            this.statusDisplay.textContent = 'UNLINKED';
            this.infoDisplay.textContent = 'Systems independent - no quantum correlation';

            // Check for time-linked bonus (30+ seconds)
            if (this.linkTime) {
                const elapsed = (Date.now() - this.linkTime) / 1000;
                if (elapsed >= 30) {
                    progressTracker.addPoints(this.moduleIndex, 15);
                    console.log('Link duration bonus awarded! +15 points');
                }
                this.linkTime = null;
            }
        }

        this.updateCorrelationDisplay();
    }

    onTileClick(index) {
        if (!this.isActive) return;

        // Toggle state on Grid A
        const currentState = this.gridA[index];
        const newState = currentState === 0 ? 1 : 0;

        this.gridA[index] = newState;
        this.updateTile(this.tilesA[index], newState, true);

        // Award 1 point per tile click
        const result = progressTracker.addPoints(this.moduleIndex, 1);
        if (result.completed) {
            console.log('Entanglement completed! Module 4 unlocked.');
        }

        // If linked, mirror on Grid B with delay
        if (this.isLinked) {
            setTimeout(() => {
                this.gridB[index] = newState;
                this.updateTile(this.tilesB[index], newState, true);
                this.updateCorrelationDisplay();
            }, 100 + Math.random() * 200);
        } else {
            this.updateCorrelationDisplay();
        }
    }

    updateTile(tile, state, entangled = false) {
        tile.classList.remove('state-0', 'state-1', 'entangled');
        tile.classList.add(`state-${state}`);
        tile.textContent = state;

        if (entangled) {
            tile.classList.add('entangled');

            // Remove entangled class after animation
            setTimeout(() => {
                tile.classList.remove('entangled');
            }, 1000);
        }
    }

    startGhostUser() {
        this.ghostUserActive = true;
        this.simulateGhostInteraction();
    }

    stopGhostUser() {
        this.ghostUserActive = false;
    }

    simulateGhostInteraction() {
        if (!this.ghostUserActive || !this.isActive) return;

        // Random delay between ghost interactions (2-5 seconds)
        const delay = 2000 + Math.random() * 3000;

        setTimeout(() => {
            if (!this.ghostUserActive) return;

            // Pick a random tile
            const randomIndex = Math.floor(Math.random() * (this.gridSize * this.gridSize));

            // Toggle state on Grid B (ghost's action)
            const currentState = this.gridB[randomIndex];
            const newState = currentState === 0 ? 1 : 0;

            this.gridB[randomIndex] = newState;
            this.updateTile(this.tilesB[randomIndex], newState, true);

            // Mirror on Grid A with delay (entanglement)
            setTimeout(() => {
                this.gridA[randomIndex] = newState;
                this.updateTile(this.tilesA[randomIndex], newState, true);
            }, 100 + Math.random() * 200);

            // Continue ghost interactions
            this.simulateGhostInteraction();
        }, delay);
    }

    start() {
        this.isActive = true;
    }

    stop() {
        this.isActive = false;
        this.stopGhostUser();
    }

    updateCorrelationDisplay() {
        // Calculate correlation between grids
        let matches = 0;
        let total = this.gridSize * this.gridSize;

        for (let i = 0; i < total; i++) {
            if (this.gridA[i] === this.gridB[i]) {
                matches++;
            }
        }

        const correlation = matches / total;

        // Update displays
        this.correlationDisplay.textContent = `${(correlation * 100).toFixed(1)}%`;
        this.matchesDisplay.textContent = `${matches}/${total}`;

        // Color code correlation strength
        if (correlation >= 0.9) {
            this.correlationDisplay.style.color = '#00ff88'; // Strong correlation
        } else if (correlation >= 0.7) {
            this.correlationDisplay.style.color = '#00ddff'; // Moderate correlation
        } else if (correlation >= 0.5) {
            this.correlationDisplay.style.color = '#ffaa00'; // Weak correlation
        } else {
            this.correlationDisplay.style.color = '#ff4444'; // Very weak/no correlation
        }
    }

    reset() {
        // Stop ghost user
        this.stopGhostUser();
        this.isLinked = false;

        // Reset grids
        this.gridA = Array(this.gridSize * this.gridSize).fill(0);
        this.gridB = Array(this.gridSize * this.gridSize).fill(0);

        // Reset tiles
        this.tilesA.forEach(tile => {
            tile.classList.remove('state-0', 'state-1', 'entangled');
            tile.classList.add('state-0');
            tile.textContent = '';
        });

        this.tilesB.forEach(tile => {
            tile.classList.remove('state-0', 'state-1', 'entangled');
            tile.classList.add('state-0');
            tile.textContent = '';
        });

        // Reset button
        this.linkBtn.textContent = '[ LINK ]';
        this.linkBtn.classList.remove('border-quantum-cyan');
        this.linkBtn.classList.add('border-quantum-orange');

        // Reset displays
        this.statusDisplay.textContent = 'UNLINKED';
        this.correlationDisplay.textContent = '100.0%';
        this.matchesDisplay.textContent = '256/256';
        this.infoDisplay.textContent = 'Click LINK to entangle the quantum systems';
    }
}
