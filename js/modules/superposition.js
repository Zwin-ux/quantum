// Module 1: Superposition - Interactive Binary Grid

import { progressTracker } from '../utils/progressTracker.js';

export class Superposition {
    constructor() {
        this.container = document.getElementById('superposition-grid');
        this.gridSize = 32;
        this.grid = [];
        this.tiles = [];
        this.isActive = false;

        // Point tracking
        this.moduleIndex = 1;
        this.clickCount = 0;
        this.startTime = null;
        this.bonusAwarded = false;

        // Statistics tracking
        this.zerosCount = 0;
        this.onesCount = 0;

        // UI elements
        this.measurementsDisplay = document.getElementById('superposition-measurements');
        this.zerosDisplay = document.getElementById('superposition-zeros');
        this.onesDisplay = document.getElementById('superposition-ones');
    }

    init() {
        this.createGrid();
    }

    createGrid() {
        // Create grid element
        const gridElement = document.createElement('div');
        gridElement.className = 'quantum-grid';
        gridElement.style.gridTemplateColumns = `repeat(${this.gridSize}, 12px)`;
        gridElement.style.gridTemplateRows = `repeat(${this.gridSize}, 12px)`;

        // Initialize grid state
        this.grid = Array(this.gridSize * this.gridSize).fill(0);
        this.tiles = [];

        // Create tiles
        for (let i = 0; i < this.gridSize * this.gridSize; i++) {
            const tile = document.createElement('div');
            tile.className = 'grid-tile state-0';
            tile.dataset.index = i;

            // Add event listeners
            tile.addEventListener('mouseenter', () => this.onTileHover(i));
            tile.addEventListener('mouseleave', () => this.onTileLeave(i));
            tile.addEventListener('click', () => this.onTileClick(i));

            gridElement.appendChild(tile);
            this.tiles.push(tile);
        }

        this.container.appendChild(gridElement);
    }

    onTileHover(index) {
        if (!this.isActive) return;

        const tile = this.tiles[index];

        // Enter superposition state
        if (!tile.classList.contains('superposition')) {
            tile.classList.add('superposition');
            tile.classList.remove('state-0', 'state-1');

            // Flicker between 0 and 1
            this.startFlickering(index);
        }
    }

    onTileLeave(index) {
        if (!this.isActive) return;

        const tile = this.tiles[index];

        // Stop flickering
        if (tile.flickerInterval) {
            clearInterval(tile.flickerInterval);
            tile.flickerInterval = null;
        }

        // Return to previous state
        tile.classList.remove('superposition');
        const state = this.grid[index];
        tile.classList.add(`state-${state}`);
        tile.textContent = state;
    }

    onTileClick(index) {
        if (!this.isActive) return;

        // Toggle state
        const currentState = this.grid[index];
        const newState = currentState === 0 ? 1 : 0;

        this.grid[index] = newState;

        const tile = this.tiles[index];

        // Stop flickering if active
        if (tile.flickerInterval) {
            clearInterval(tile.flickerInterval);
            tile.flickerInterval = null;
        }

        // Update visual state
        tile.classList.remove('superposition', 'state-0', 'state-1');
        tile.classList.add(`state-${newState}`);
        tile.textContent = newState;

        // Update statistics
        if (newState === 0) {
            this.zerosCount++;
        } else {
            this.onesCount++;
        }
        this.updateStatsDisplay();

        // Award points
        this.clickCount++;
        const result = progressTracker.addPoints(this.moduleIndex, 1);

        // Check for speed bonus (10 tiles in under 30 seconds)
        if (!this.bonusAwarded && this.clickCount === 10) {
            const elapsed = (Date.now() - this.startTime) / 1000;
            if (elapsed < 30) {
                progressTracker.addPoints(this.moduleIndex, 10);
                this.bonusAwarded = true;
                console.log('Speed bonus awarded! +10 points');
            }
        }

        if (result.completed) {
            console.log('Superposition completed! Module 2 unlocked.');
        }
    }

    updateStatsDisplay() {
        const totalMeasurements = this.zerosCount + this.onesCount;
        this.measurementsDisplay.textContent = totalMeasurements;
        this.zerosDisplay.textContent = this.zerosCount;
        this.onesDisplay.textContent = this.onesCount;

        // Calculate probabilities
        if (totalMeasurements > 0) {
            const probZero = ((this.zerosCount / totalMeasurements) * 100).toFixed(1);
            const probOne = ((this.onesCount / totalMeasurements) * 100).toFixed(1);

            // Update probability display
            const probabilityText = document.querySelector('#module-1 .text-xs');
            if (probabilityText) {
                probabilityText.textContent = `Measured probabilities: P(0) = ${probZero}%, P(1) = ${probOne}%`;
            }
        }
    }

    startFlickering(index) {
        const tile = this.tiles[index];

        tile.flickerInterval = setInterval(() => {
            const randomBit = Math.random() > 0.5 ? '1' : '0';
            tile.textContent = randomBit;
        }, 100);
    }

    start() {
        this.isActive = true;
        this.startTime = Date.now();
    }

    stop() {
        this.isActive = false;

        // Clear all flickering intervals
        this.tiles.forEach(tile => {
            if (tile.flickerInterval) {
                clearInterval(tile.flickerInterval);
                tile.flickerInterval = null;
            }
        });
    }

    reset() {
        // Reset grid state
        this.grid = Array(this.gridSize * this.gridSize).fill(0);

        // Reset tile visuals
        this.tiles.forEach((tile, i) => {
            if (tile.flickerInterval) {
                clearInterval(tile.flickerInterval);
                tile.flickerInterval = null;
            }

            tile.classList.remove('superposition', 'state-0', 'state-1');
            tile.classList.add('state-0');
            tile.textContent = '';
        });

        // Reset point tracking
        this.clickCount = 0;
        this.startTime = null;
        this.bonusAwarded = false;

        // Reset statistics
        this.zerosCount = 0;
        this.onesCount = 0;
        this.updateStatsDisplay();

        // Reset probability display
        const probabilityText = document.querySelector('#module-1 .text-xs');
        if (probabilityText) {
            probabilityText.textContent = 'Equal probability: P(0) = 50%, P(1) = 50%';
        }
    }

    getGridState() {
        return [...this.grid];
    }
}
