// Quantum Signals - Main Application Controller

import { NoiseFloor } from './modules/noiseFloor.js';
import { Superposition } from './modules/superposition.js';
import { Collapse } from './modules/collapse.js';
import { Entanglement } from './modules/entanglement.js';
import { ComputationLimit } from './modules/computationLimit.js';
import { Gallery } from './modules/gallery.js';
import { SignalLost } from './modules/signalLost.js';
import { InfoPanel } from './modules/infoPanel.js';
import { progressTracker } from './utils/progressTracker.js';

class QuantumSignals {
    constructor() {
        this.currentModule = 0;
        this.modules = [];
        this.moduleElements = [];
        this.navButtons = [];

        this.signalHash = '';
        this.pointsDisplay = null;
        this.infoPanel = null;
    }

    async init() {
        console.log('Initializing Quantum Signals...');

        // Initialize info panel
        this.infoPanel = new InfoPanel();
        this.infoPanel.init();

        // Initialize modules
        this.modules = [
            new NoiseFloor(),
            new Superposition(),
            new Collapse(),
            new Entanglement(),
            new ComputationLimit(),
            new Gallery(),
            new SignalLost()
        ];

        // Initialize each module
        this.modules.forEach(module => {
            if (module.init) {
                module.init();
            }
        });

        // Set up restart callback for Signal Lost
        this.modules[6].setRestartCallback(() => this.restart());

        // Get module elements
        this.moduleElements = [
            document.getElementById('module-0'),
            document.getElementById('module-1'),
            document.getElementById('module-2'),
            document.getElementById('module-3'),
            document.getElementById('module-4'),
            document.getElementById('module-5'),
            document.getElementById('module-6')
        ];

        // Get navigation buttons
        this.navButtons = Array.from(document.querySelectorAll('.nav-btn'));

        // Get points display
        this.pointsDisplay = document.getElementById('points-display');

        // Set up progress tracking
        this.setupProgressTracking();

        // Set up navigation
        this.setupNavigation();

        // Update UI with initial progress
        this.updateNavUI();

        // Start with first module
        await this.activateModule(0);
    }

    setupProgressTracking() {
        // Listen for progress changes
        progressTracker.addListener((progress) => {
            this.updateNavUI();
        });
    }

    setupNavigation() {
        // Click navigation
        this.navButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                // Check if module is unlocked
                if (progressTracker.isModuleUnlocked(index)) {
                    this.activateModule(index);
                } else {
                    console.log(`Module ${index} is locked`);
                }
            });
        });

        // Keyboard navigation (arrow keys)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                this.nextModule();
            } else if (e.key === 'ArrowLeft') {
                this.previousModule();
            } else if (e.key >= '1' && e.key <= '7') {
                const moduleIndex = parseInt(e.key) - 1;
                if (progressTracker.isModuleUnlocked(moduleIndex)) {
                    this.activateModule(moduleIndex);
                }
            } else if (e.key === 'i' || e.key === 'I') {
                // Toggle info panel for current module
                this.infoPanel.toggle(this.currentModule);
            }
        });
    }

    updateNavUI() {
        // Update points display
        const totalPoints = progressTracker.getTotalPoints();
        if (this.pointsDisplay) {
            this.pointsDisplay.textContent = `⭐ ${totalPoints} POINTS`;
        }

        // Update navigation button states with quantum indicators
        this.navButtons.forEach((btn, index) => {
            const isUnlocked = progressTracker.isModuleUnlocked(index);
            const isCompleted = progressTracker.isModuleCompleted(index);
            const originalText = btn.textContent.replace(/^[|⟩⟨∅]+ /, '');

            // Remove all state classes
            btn.classList.remove('locked', 'unlocked', 'completed');

            if (isCompleted) {
                btn.classList.add('completed');
                btn.innerHTML = `|1⟩ ${originalText}`;
            } else if (isUnlocked) {
                btn.classList.add('unlocked');
                btn.innerHTML = `⟨ψ| ${originalText}`;
            } else {
                btn.classList.add('locked');
                btn.innerHTML = `∅ ${originalText}`;
            }
        });
    }

    async activateModule(index) {
        if (index < 0 || index >= this.modules.length) return;

        // Check if module is unlocked
        if (!progressTracker.isModuleUnlocked(index)) {
            console.log(`Cannot activate locked module ${index}`);
            return;
        }

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
                if (index === 6 && this.signalHash) {
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

        // Save current module to progress tracker
        progressTracker.setCurrentModule(index);

        // Update UI
        this.updateNavUI();
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
console.log('Quantum Signals - Interactive Quantum Mechanics Learning\n\nNavigation:\n• Arrow Keys: Navigate modules\n• 1-6: Jump to specific module\n• Click navigation menu\n\nLearn quantum concepts through hands-on interaction!');
