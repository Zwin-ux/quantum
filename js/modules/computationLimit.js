// Module 4: Computation Limit - Cellular Automata Performance Degradation

export class ComputationLimit {
    constructor() {
        this.canvas = document.getElementById('automata-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.fpsCounter = document.getElementById('fps-counter');

        this.cellSize = 4;
        this.cols = 160;
        this.rows = 120;

        this.grid = [];
        this.nextGrid = [];

        this.isActive = false;
        this.animationFrame = null;

        this.fps = 60;
        this.frameCount = 0;
        this.lastFrameTime = performance.now();
        this.fpsUpdateInterval = null;

        this.complexity = 0;
        this.maxComplexity = 100;
    }

    init() {
        // Set canvas size
        this.canvas.width = this.cols * this.cellSize;
        this.canvas.height = this.rows * this.cellSize;

        // Initialize grids
        this.initializeGrid();
    }

    initializeGrid() {
        // Create grids
        this.grid = Array(this.rows).fill(null).map(() => Array(this.cols).fill(0));
        this.nextGrid = Array(this.rows).fill(null).map(() => Array(this.cols).fill(0));

        // Seed with random pattern in center
        const centerX = Math.floor(this.cols / 2);
        const centerY = Math.floor(this.rows / 2);
        const seedSize = 20;

        for (let y = -seedSize; y < seedSize; y++) {
            for (let x = -seedSize; x < seedSize; x++) {
                const row = centerY + y;
                const col = centerX + x;

                if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
                    this.grid[row][col] = Math.random() > 0.7 ? 1 : 0;
                }
            }
        }
    }

    countNeighbors(row, col) {
        let count = 0;

        for (let y = -1; y <= 1; y++) {
            for (let x = -1; x <= 1; x++) {
                if (y === 0 && x === 0) continue;

                const newRow = row + y;
                const newCol = col + x;

                // Wrap around edges (torus topology)
                const wrappedRow = (newRow + this.rows) % this.rows;
                const wrappedCol = (newCol + this.cols) % this.cols;

                count += this.grid[wrappedRow][wrappedCol];
            }
        }

        return count;
    }

    update() {
        // Conway's Game of Life rules
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const neighbors = this.countNeighbors(row, col);
                const cell = this.grid[row][col];

                // Apply rules
                if (cell === 1) {
                    // Living cell
                    this.nextGrid[row][col] = (neighbors === 2 || neighbors === 3) ? 1 : 0;
                } else {
                    // Dead cell
                    this.nextGrid[row][col] = (neighbors === 3) ? 1 : 0;
                }

                // Increase complexity near edges (simulate performance degradation)
                const distToEdge = Math.min(row, col, this.rows - row - 1, this.cols - col - 1);
                if (distToEdge < 10 && this.complexity > 50) {
                    // Add artificial delay/complexity near edges
                    for (let i = 0; i < Math.floor(this.complexity / 10); i++) {
                        Math.random(); // Waste cycles
                    }
                }
            }
        }

        // Swap grids
        [this.grid, this.nextGrid] = [this.nextGrid, this.grid];

        // Increase complexity over time
        this.complexity = Math.min(this.maxComplexity, this.complexity + 0.5);
    }

    render() {
        // Clear canvas
        this.ctx.fillStyle = '#0a0a0a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw cells
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.grid[row][col] === 1) {
                    const x = col * this.cellSize;
                    const y = row * this.cellSize;

                    // Color based on position (edge cells appear glitchy)
                    const distToEdge = Math.min(row, col, this.rows - row - 1, this.cols - col - 1);

                    if (distToEdge < 10) {
                        // Edge cells - orange (glitchy)
                        this.ctx.fillStyle = '#ff6600';

                        // Add random flicker effect
                        if (Math.random() > 0.8) {
                            this.ctx.fillStyle = '#00ffff';
                        }
                    } else {
                        // Normal cells - cyan
                        this.ctx.fillStyle = '#00ffff';
                    }

                    this.ctx.fillRect(x, y, this.cellSize, this.cellSize);

                    // Add glow to edge cells
                    if (distToEdge < 10 && this.complexity > 70) {
                        this.ctx.fillStyle = 'rgba(255, 102, 0, 0.3)';
                        this.ctx.fillRect(x - 1, y - 1, this.cellSize + 2, this.cellSize + 2);
                    }
                }
            }
        }

        // Visual glitch effect when complexity is high
        if (this.complexity > 80) {
            this.ctx.fillStyle = `rgba(255, 102, 0, ${(this.complexity - 80) / 100})`;
            this.ctx.fillRect(0, 0, this.canvas.width, 5);
            this.ctx.fillRect(0, this.canvas.height - 5, this.canvas.width, 5);
        }
    }

    animate() {
        if (!this.isActive) return;

        // Update
        this.update();

        // Render
        this.render();

        // Calculate FPS
        this.frameCount++;
        const now = performance.now();
        const delta = now - this.lastFrameTime;

        if (delta >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / delta);
            this.frameCount = 0;
            this.lastFrameTime = now;
        }

        // Simulate slowdown by skipping frames when complexity is high
        const frameDelay = Math.max(0, Math.floor((this.complexity - 50) / 5));

        setTimeout(() => {
            this.animationFrame = requestAnimationFrame(() => this.animate());
        }, frameDelay);
    }

    updateFPS() {
        if (!this.isActive) return;
        this.fpsCounter.textContent = `FPS: ${this.fps} | Complexity: ${Math.round(this.complexity)}%`;
    }

    start() {
        this.isActive = true;
        this.animate();

        // Update FPS display
        this.fpsUpdateInterval = setInterval(() => this.updateFPS(), 100);
    }

    stop() {
        this.isActive = false;

        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }

        if (this.fpsUpdateInterval) {
            clearInterval(this.fpsUpdateInterval);
        }
    }

    reset() {
        this.complexity = 0;
        this.fps = 60;
        this.frameCount = 0;
        this.lastFrameTime = performance.now();

        this.initializeGrid();
        this.render();
    }
}
