// Module 2: Collapse - Wave Function Collapse and Hash Generation

import { generateSignalHash, generatePattern, createInteractionSeed } from '../utils/hash.js';

export class Collapse {
    constructor() {
        this.container = document.getElementById('collapse-grid');
        this.observeBtn = document.getElementById('observe-btn');
        this.hashDisplay = document.getElementById('hash-display');
        this.signalHashEl = document.getElementById('signal-hash');
        this.copyBtn = document.getElementById('copy-hash');

        this.gridSize = 32;
        this.grid = [];
        this.tiles = [];
        this.isActive = false;
        this.isCollapsed = false;
        this.interactions = [];
        this.signalHash = '';
    }

    init() {
        this.createGrid();
        this.setupEventListeners();
    }

    createGrid() {
        // Create grid element
        const gridElement = document.createElement('div');
        gridElement.className = 'quantum-grid';
        gridElement.style.gridTemplateColumns = `repeat(${this.gridSize}, 12px)`;
        gridElement.style.gridTemplateRows = `repeat(${this.gridSize}, 12px)`;

        // Initialize grid state (random superposition)
        this.grid = Array(this.gridSize * this.gridSize).fill(null);
        this.tiles = [];

        // Create tiles
        for (let i = 0; i < this.gridSize * this.gridSize; i++) {
            const tile = document.createElement('div');
            tile.className = 'grid-tile superposition';
            tile.dataset.index = i;

            gridElement.appendChild(tile);
            this.tiles.push(tile);

            // Start all tiles in superposition
            this.startFlickering(i);
        }

        this.container.appendChild(gridElement);
    }

    setupEventListeners() {
        this.observeBtn.addEventListener('click', () => this.observeGrid());
        this.copyBtn.addEventListener('click', () => this.copyHash());

        // Track interactions
        this.container.addEventListener('click', (e) => {
            if (!this.isCollapsed && this.isActive) {
                const tile = e.target.closest('.grid-tile');
                if (tile) {
                    const index = parseInt(tile.dataset.index);
                    this.interactions.push(index);
                }
            }
        });
    }

    startFlickering(index) {
        const tile = this.tiles[index];

        tile.flickerInterval = setInterval(() => {
            const randomBit = Math.random() > 0.5 ? '1' : '0';
            tile.textContent = randomBit;
        }, 100);
    }

    observeGrid() {
        if (this.isCollapsed || !this.isActive) return;

        this.isCollapsed = true;

        // Create seed from interactions
        const seed = createInteractionSeed(this.interactions);

        // Generate deterministic pattern
        const pattern = generatePattern(seed, this.gridSize);

        // Generate signal hash
        this.signalHash = generateSignalHash(seed);

        // Collapse all tiles with animation
        this.tiles.forEach((tile, i) => {
            // Stop flickering
            if (tile.flickerInterval) {
                clearInterval(tile.flickerInterval);
                tile.flickerInterval = null;
            }

            // Stagger the collapse animation
            setTimeout(() => {
                const state = pattern[i];
                this.grid[i] = state;

                tile.classList.remove('superposition');
                tile.classList.add('frozen', `state-${state}`);
                tile.textContent = state;
            }, Math.random() * 500);
        });

        // Show hash after collapse animation
        setTimeout(() => {
            this.signalHashEl.textContent = this.signalHash;
            this.hashDisplay.style.opacity = '1';
        }, 1000);

        // Disable observe button
        this.observeBtn.disabled = true;
        this.observeBtn.style.opacity = '0.3';
        this.observeBtn.style.pointerEvents = 'none';
    }

    copyHash() {
        if (this.signalHash) {
            navigator.clipboard.writeText(this.signalHash)
                .then(() => {
                    // Visual feedback
                    const originalText = this.copyBtn.textContent;
                    this.copyBtn.textContent = '[ COPIED ]';
                    setTimeout(() => {
                        this.copyBtn.textContent = originalText;
                    }, 1500);
                })
                .catch(err => {
                    console.error('Failed to copy:', err);
                });
        }
    }

    start() {
        this.isActive = true;
    }

    stop() {
        this.isActive = false;

        // Stop all flickering
        this.tiles.forEach(tile => {
            if (tile.flickerInterval) {
                clearInterval(tile.flickerInterval);
                tile.flickerInterval = null;
            }
        });
    }

    reset() {
        this.isCollapsed = false;
        this.interactions = [];
        this.signalHash = '';

        // Reset grid
        this.grid = Array(this.gridSize * this.gridSize).fill(null);

        // Reset tiles
        this.tiles.forEach((tile, i) => {
            if (tile.flickerInterval) {
                clearInterval(tile.flickerInterval);
                tile.flickerInterval = null;
            }

            tile.classList.remove('frozen', 'state-0', 'state-1');
            tile.classList.add('superposition');
            this.startFlickering(i);
        });

        // Reset UI
        this.hashDisplay.style.opacity = '0';
        this.observeBtn.disabled = false;
        this.observeBtn.style.opacity = '1';
        this.observeBtn.style.pointerEvents = 'auto';
    }

    getSignalHash() {
        return this.signalHash;
    }
}
