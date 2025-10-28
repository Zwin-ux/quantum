// Quantum Signals - Main Application Controller

import { NoiseFloor } from './modules/noiseFloor.js';
import { Superposition } from './modules/superposition.js';
import { Collapse } from './modules/collapse.js';
import { Entanglement } from './modules/entanglement.js';
import { ComputationLimit } from './modules/computationLimit.js';
import { SignalLost } from './modules/signalLost.js';

class QuantumSignals {
    constructor() {
        this.currentModule = 0;
        this.modules = [];
        this.moduleElements = [];
        this.navButtons = [];

        this.signalHash = '';
    }

    async init() {
        console.log('Initializing Quantum Signals...');

        // Initialize modules
        this.modules = [
            new NoiseFloor(),
            new Superposition(),
            new Collapse(),
            new Entanglement(),
            new ComputationLimit(),
            new SignalLost()
        ];

        // Initialize each module
        this.modules.forEach(module => {
            if (module.init) {
                module.init();
            }
        });

        // Set up restart callback for Signal Lost
        this.modules[5].setRestartCallback(() => this.restart());

        // Get module elements
        this.moduleElements = [
            document.getElementById('module-0'),
            document.getElementById('module-1'),
            document.getElementById('module-2'),
            document.getElementById('module-3'),
            document.getElementById('module-4'),
            document.getElementById('module-5')
        ];

        // Get navigation buttons
        this.navButtons = Array.from(document.querySelectorAll('.nav-btn'));

        // Set up navigation
        this.setupNavigation();

        // Start with first module
        await this.activateModule(0);
    }

    setupNavigation() {
        // Click navigation
        this.navButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                this.activateModule(index);
            });
        });

        // Keyboard navigation (arrow keys)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                this.nextModule();
            } else if (e.key === 'ArrowLeft') {
                this.previousModule();
            } else if (e.key >= '1' && e.key <= '6') {
                const moduleIndex = parseInt(e.key) - 1;
                this.activateModule(moduleIndex);
            }
        });
    }

    async activateModule(index) {
        if (index < 0 || index >= this.modules.length) return;

        // Stop current module
        if (this.modules[this.currentModule]) {
            if (this.modules[this.currentModule].stop) {
                this.modules[this.currentModule].stop();
            }
        }

        // Hide all modules
        this.moduleElements.forEach(el => {
            el.classList.remove('active');
            el.classList.add('hidden');
        });

        // Update navigation
        this.navButtons.forEach(btn => btn.classList.remove('active'));

        // Show new module
        this.currentModule = index;
        this.moduleElements[index].classList.remove('hidden');

        // Wait for transition
        await new Promise(resolve => setTimeout(resolve, 100));

        this.moduleElements[index].classList.add('active');
        this.navButtons[index].classList.add('active');

        // Start new module
        if (this.modules[index]) {
            if (this.modules[index].start) {
                // Pass signal hash to Signal Lost module
                if (index === 5 && this.signalHash) {
                    await this.modules[index].start(this.signalHash);
                } else {
                    await this.modules[index].start();
                }
            }
        }

        // Store signal hash from Collapse module
        if (index === 2 && this.modules[2].getSignalHash) {
            // Update signal hash when leaving Collapse module
            setTimeout(() => {
                const hash = this.modules[2].getSignalHash();
                if (hash) {
                    this.signalHash = hash;
                }
            }, 500);
        }
    }

    nextModule() {
        const nextIndex = (this.currentModule + 1) % this.modules.length;
        this.activateModule(nextIndex);
    }

    previousModule() {
        const prevIndex = (this.currentModule - 1 + this.modules.length) % this.modules.length;
        this.activateModule(prevIndex);
    }

    restart() {
        // Reset all modules
        this.modules.forEach(module => {
            if (module.reset) {
                module.reset();
            }
        });

        // Clear signal hash
        this.signalHash = '';

        // Go back to first module
        this.activateModule(0);
    }
}

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const app = new QuantumSignals();
        app.init();
    });
} else {
    const app = new QuantumSignals();
    app.init();
}

// Prevent default context menu for cleaner experience
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Log to console
console.log(`
    ╔═══════════════════════════════════════╗
    ║   QUANTUM SIGNALS                     ║
    ║   When computation hits reality's edge║
    ╚═══════════════════════════════════════╝

    Navigation:
    - Arrow Keys: Navigate modules
    - 1-6: Jump to specific module
    - Click navigation menu
`);
