// Module 0: Noise Floor - Landing Scene

import { WebGLRenderer, defaultVertexShader, noiseFragmentShader } from '../utils/webgl.js';

export class NoiseFloor {
    constructor() {
        this.canvas = document.getElementById('noise-canvas');
        this.introText = document.getElementById('intro-text');
        this.typewriterContainer = document.getElementById('typewriter-container');
        this.typewriterText = document.getElementById('typewriter-text');

        this.message = "All information has a cost. Let's measure it.";
        this.charIndex = 0;
        this.isActive = false;

        this.renderer = null;
        this.program = null;
        this.animationFrame = null;
    }

    init() {
        console.log('NoiseFloor: Initializing...');

        // Set canvas size to match viewport
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Initialize WebGL
        this.renderer = new WebGLRenderer(this.canvas);
        if (!this.renderer || !this.renderer.gl) {
            console.error('Failed to initialize WebGL');
            return;
        }

        console.log('NoiseFloor: WebGL initialized');

        // Create shader program
        this.program = this.renderer.createProgram(defaultVertexShader, noiseFragmentShader);
        if (!this.program) {
            console.error('Failed to create shader program');
            return;
        }

        console.log('NoiseFloor: Shader program created');

        // Set up quad
        this.renderer.setupQuad();

        // Get uniform locations
        this.uniforms = {
            time: this.renderer.gl.getUniformLocation(this.program, 'u_time'),
            resolution: this.renderer.gl.getUniformLocation(this.program, 'u_resolution'),
            mouse: this.renderer.gl.getUniformLocation(this.program, 'u_mouse')
        };

        // Get attribute location
        this.positionLocation = this.renderer.gl.getAttribLocation(this.program, 'position');

        // Set up mouse tracking
        this.setupMouseTracking();

        // Set up resize handler
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.renderer.resize();
        });

        // Resize canvas
        this.renderer.resize();

        console.log('NoiseFloor: Initialization complete');
    }

    setupMouseTracking() {
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.renderer.mousePos.x = e.clientX / rect.width;
            this.renderer.mousePos.y = 1.0 - (e.clientY / rect.height);
        });
    }

    async start() {
        this.isActive = true;

        // Fade in intro text
        setTimeout(() => {
            this.introText.classList.add('fade-in');
            this.introText.style.opacity = '1';
        }, 500);

        // Start typewriter effect after delay
        setTimeout(() => {
            this.typewriterContainer.classList.add('fade-in');
            this.typewriterContainer.style.opacity = '1';
            this.startTypewriter();
        }, 3000);

        // Start rendering
        this.render();
    }

    startTypewriter() {
        const typeNextChar = () => {
            if (this.charIndex < this.message.length) {
                this.typewriterText.textContent += this.message[this.charIndex];
                this.charIndex++;
                setTimeout(typeNextChar, 50 + Math.random() * 50);
            } else {
                // Remove cursor after typing completes
                setTimeout(() => {
                    this.typewriterText.style.borderRight = 'none';
                }, 1000);
            }
        };

        typeNextChar();
    }

    render() {
        if (!this.isActive) return;

        const gl = this.renderer.gl;

        // Resize if needed
        this.renderer.resize();

        // Clear
        this.renderer.clear(0.04, 0.04, 0.04, 1);

        // Use program
        gl.useProgram(this.program);

        // Set uniforms
        gl.uniform1f(this.uniforms.time, this.renderer.time);
        gl.uniform2f(this.uniforms.resolution, this.canvas.width, this.canvas.height);
        gl.uniform2f(this.uniforms.mouse, this.renderer.mousePos.x, this.renderer.mousePos.y);

        // Bind buffer and draw
        gl.bindBuffer(gl.ARRAY_BUFFER, this.renderer.buffers.quad);
        gl.enableVertexAttribArray(this.positionLocation);
        gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 6);

        // Update time
        this.renderer.time += 0.016; // ~60fps

        // Continue animation
        this.animationFrame = requestAnimationFrame(() => this.render());
    }

    stop() {
        this.isActive = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }

    reset() {
        this.charIndex = 0;
        this.typewriterText.textContent = '';
        this.introText.style.opacity = '0';
        this.typewriterContainer.style.opacity = '0';
        this.introText.classList.remove('fade-in');
        this.typewriterContainer.classList.remove('fade-in');
        this.renderer.time = 0;
    }
}
