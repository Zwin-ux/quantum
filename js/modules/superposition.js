// Module 1: Superposition - Interactive Binary Grid

export class Superposition {
    constructor() {
        this.container = document.getElementById('superposition-grid');
        this.gridSize = 32;
        this.grid = [];
        this.tiles = [];
        this.isActive = false;
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
    }

    getGridState() {
        return [...this.grid];
    }
}
