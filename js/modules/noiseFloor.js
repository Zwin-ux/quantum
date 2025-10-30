// Module 0: Noise Floor - Landing Scene

import { progressTracker } from '../utils/progressTracker.js';

export class NoiseFloor {
    constructor() {
        this.canvas = document.getElementById('noise-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.introText = document.getElementById('intro-text');
        this.typewriterContainer = document.getElementById('typewriter-container');
        this.typewriterText = document.getElementById('typewriter-text');

        this.message = "At quantum scales, even empty space fluctuates with energy. This is quantum vacuum noise - particles constantly appearing and disappearing due to Heisenberg's uncertainty principle: ΔE·Δt ≥ ℏ/2";
        this.charIndex = 0;
        this.isActive = false;

        this.particles = [];
        this.gridLines = [];
        this.mousePos = { x: 0.5, y: 0.5 };
        this.time = 0;
        this.animationFrame = null;

        // Point tracking
        this.moduleIndex = 0;
        this.measurementCount = 0;
        this.requiredMeasurements = 10;
    }

    init() {
        console.log('NoiseFloor: Initializing with Canvas 2D...');

        // Set canvas size to match viewport
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Set up mouse tracking
        this.setupMouseTracking();

        // Set up resize handler
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.createParticles();
            this.createGrid();
        });

        // Create particles and grid
        this.createParticles();
        this.createGrid();

        console.log('NoiseFloor: Initialization complete');
    }

    createParticles() {
        this.particles = [];
        const particleCount = 150;

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                color: Math.random() > 0.5 ? 'cyan' : 'orange',
                alpha: Math.random() * 0.5 + 0.3,
                phase: Math.random() * Math.PI * 2
            });
        }
    }

    createGrid() {
        this.gridLines = [];
        const spacing = 40;

        // Vertical lines
        for (let x = 0; x < this.canvas.width; x += spacing) {
            this.gridLines.push({
                x1: x,
                y1: 0,
                x2: x,
                y2: this.canvas.height,
                vertical: true
            });
        }

        // Horizontal lines
        for (let y = 0; y < this.canvas.height; y += spacing) {
            this.gridLines.push({
                x1: 0,
                y1: y,
                x2: this.canvas.width,
                y2: y,
                vertical: false
            });
        }
    }

    setupMouseTracking() {
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mousePos.x = e.clientX - rect.left;
            this.mousePos.y = e.clientY - rect.top;
        });

        // Click to measure vacuum fluctuations
        this.canvas.addEventListener('click', (e) => {
            if (!this.isActive) return;

            const rect = this.canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;

            // Check if click is near any particle
            this.particles.forEach((particle, index) => {
                const dx = clickX - particle.x;
                const dy = clickY - particle.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 20) {
                    this.measureParticle(particle, index);
                }
            });
        });
    }

    measureParticle(particle, index) {
        // Visual feedback - flash the particle
        particle.measured = true;
        particle.alpha = 1;

        setTimeout(() => {
            particle.measured = false;
        }, 500);

        // Award points
        this.measurementCount++;
        const result = progressTracker.addPoints(this.moduleIndex, 1);

        // Update typewriter text with progress
        if (this.measurementCount < this.requiredMeasurements) {
            const remaining = this.requiredMeasurements - this.measurementCount;
            this.typewriterText.textContent = `Measured ${this.measurementCount}/${this.requiredMeasurements} vacuum fluctuations. Click on particles to measure them! (${remaining} more needed)`;
        }

        if (result.completed) {
            console.log('✓ Noise Floor completed! You measured quantum vacuum fluctuations. Module 1 unlocked.');
            this.typewriterText.textContent = `✓ Complete! You measured ${this.measurementCount} vacuum fluctuations. Understanding: Quantum vacuum is never truly empty.`;
        }
    }

    async start() {
        this.isActive = true;

        // Fade in intro text
        setTimeout(() => {
            this.introText.classList.add('fade-in');
            this.introText.style.opacity = '1';
        }, 200);

        // Start typewriter effect after delay
        setTimeout(() => {
            this.typewriterContainer.classList.add('fade-in');
            this.typewriterContainer.style.opacity = '1';
            this.startTypewriter();
        }, 1200);

        // Start rendering
        this.render();
    }

    startTypewriter() {
        const typeNextChar = () => {
            if (this.charIndex < this.message.length) {
                this.typewriterText.textContent += this.message[this.charIndex];
                this.charIndex++;
                setTimeout(typeNextChar, 30 + Math.random() * 30);
            } else {
                // Show instruction after educational message
                setTimeout(() => {
                    this.typewriterText.textContent = this.message + '\n\n👆 Click on the glowing particles to measure them! (0/10 measured)';
                    this.typewriterText.style.borderRight = 'none';
                }, 1000);
            }
        };

        typeNextChar();
    }

    render() {
        if (!this.isActive) return;

        // Clear canvas with dark background
        this.ctx.fillStyle = '#0a0a0a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw grid
        this.drawGrid();

        // Update and draw particles
        this.updateParticles();
        this.drawParticles();

        // Update time
        this.time += 0.016;

        // Continue animation
        this.animationFrame = requestAnimationFrame(() => this.render());
    }

    drawGrid() {
        this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
        this.ctx.lineWidth = 1;

        this.gridLines.forEach(line => {
            // Apply slight wave distortion
            const distortion = Math.sin(this.time + (line.vertical ? line.x1 : line.y1) * 0.01) * 2;

            this.ctx.beginPath();
            if (line.vertical) {
                this.ctx.moveTo(line.x1 + distortion, line.y1);
                this.ctx.lineTo(line.x2 + distortion, line.y2);
            } else {
                this.ctx.moveTo(line.x1, line.y1 + distortion);
                this.ctx.lineTo(line.x2, line.y2 + distortion);
            }
            this.ctx.stroke();
        });
    }

    updateParticles() {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Mouse influence
            const dx = this.mousePos.x - particle.x;
            const dy = this.mousePos.y - particle.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 150) {
                const force = (150 - dist) / 150;
                particle.x -= dx * force * 0.02;
                particle.y -= dy * force * 0.02;
            }

            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Pulse alpha
            particle.alpha = 0.3 + Math.sin(this.time * 2 + particle.phase) * 0.3;
        });
    }

    drawParticles() {
        this.particles.forEach(particle => {
            // Draw particle glow
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size * 4
            );

            const color = particle.color === 'cyan'
                ? `rgba(0, 255, 255, ${particle.alpha})`
                : `rgba(255, 102, 0, ${particle.alpha})`;

            gradient.addColorStop(0, color);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(
                particle.x - particle.size * 4,
                particle.y - particle.size * 4,
                particle.size * 8,
                particle.size * 8
            );

            // Draw particle core
            this.ctx.fillStyle = color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Draw connections between nearby particles
        this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
        this.ctx.lineWidth = 0.5;

        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    stop() {
        this.isActive = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }

    reset() {
        this.charIndex = 0;
        this.measurementCount = 0;
        this.typewriterText.textContent = '';
        this.introText.style.opacity = '0';
        this.typewriterContainer.style.opacity = '0';
        this.introText.classList.remove('fade-in');
        this.typewriterContainer.classList.remove('fade-in');
        this.time = 0;
        this.createParticles();
    }
}
