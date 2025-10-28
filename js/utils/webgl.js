// WebGL Utility Functions

export class WebGLRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

        if (!this.gl) {
            console.error('WebGL not supported');
            return null;
        }

        this.programs = {};
        this.buffers = {};
        this.mousePos = { x: 0.5, y: 0.5 };
        this.time = 0;
    }

    // Compile shader
    compileShader(source, type) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('Shader compilation error:', this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    // Create shader program
    createProgram(vertexSource, fragmentSource) {
        const vertexShader = this.compileShader(vertexSource, this.gl.VERTEX_SHADER);
        const fragmentShader = this.compileShader(fragmentSource, this.gl.FRAGMENT_SHADER);

        if (!vertexShader || !fragmentShader) {
            return null;
        }

        const program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);

        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            console.error('Program linking error:', this.gl.getProgramInfoLog(program));
            return null;
        }

        return program;
    }

    // Create buffer
    createBuffer(data) {
        const buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
        return buffer;
    }

    // Set up full-screen quad
    setupQuad() {
        const vertices = [
            -1, -1,
             1, -1,
            -1,  1,
            -1,  1,
             1, -1,
             1,  1
        ];
        this.buffers.quad = this.createBuffer(vertices);
    }

    // Resize canvas
    resize() {
        const displayWidth = this.canvas.clientWidth;
        const displayHeight = this.canvas.clientHeight;

        if (this.canvas.width !== displayWidth || this.canvas.height !== displayHeight) {
            this.canvas.width = displayWidth;
            this.canvas.height = displayHeight;
            this.gl.viewport(0, 0, displayWidth, displayHeight);
        }
    }

    // Clear screen
    clear(r = 0, g = 0, b = 0, a = 1) {
        this.gl.clearColor(r, g, b, a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
}

// Noise function for shader (Simplex-like)
export const noiseShaderFunctions = `
    // Hash function for noise
    float hash(vec2 p) {
        p = 50.0 * fract(p * 0.3183099 + vec2(0.71, 0.113));
        return -1.0 + 2.0 * fract(p.x * p.y * (p.x + p.y));
    }

    // Noise function
    float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);

        return mix(
            mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
            mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
            u.y
        );
    }

    // Fractal Brownian Motion
    float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;

        for(int i = 0; i < 5; i++) {
            value += amplitude * noise(p * frequency);
            frequency *= 2.0;
            amplitude *= 0.5;
        }

        return value;
    }
`;

// Vertex shader for full-screen quad
export const defaultVertexShader = `
    attribute vec2 position;
    varying vec2 vUv;

    void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
    }
`;

// Fragment shader for quantum noise
export const noiseFragmentShader = `
    precision mediump float;

    varying vec2 vUv;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;

    ${noiseShaderFunctions}

    void main() {
        vec2 uv = vUv;
        vec2 st = gl_FragCoord.xy / u_resolution;

        // Calculate distance from mouse
        float dist = distance(st, u_mouse);

        // Create noise field
        float n = fbm(st * 5.0 + u_time * 0.1);

        // Mouse distortion
        float influence = smoothstep(0.3, 0.0, dist);
        vec2 distortion = vec2(
            fbm(st * 3.0 + u_time * 0.2),
            fbm(st * 3.0 + u_time * 0.2 + 100.0)
        ) * influence * 0.1;

        // Sample noise with distortion
        float noise_value = fbm((st + distortion) * 8.0 + u_time * 0.05);

        // Create particle effect
        float particles = smoothstep(0.6, 0.8, noise_value);

        // Color mixing (cyan and orange)
        vec3 cyan = vec3(0.0, 1.0, 1.0);
        vec3 orange = vec3(1.0, 0.4, 0.0);
        vec3 color = mix(cyan, orange, noise_value * 0.5 + 0.5);

        // Final color with particles
        color *= particles * 0.3;

        // Add subtle grid
        float grid = max(
            smoothstep(0.98, 1.0, fract(st.x * 20.0)),
            smoothstep(0.98, 1.0, fract(st.y * 20.0))
        );
        color += cyan * grid * 0.1;

        gl_FragColor = vec4(color, particles * 0.5);
    }
`;
