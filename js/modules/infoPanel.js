// Info Panel Module - Educational overlay

import { getModuleInfo } from '../utils/education.js';

export class InfoPanel {
    constructor() {
        this.panel = null;
        this.isVisible = false;
        this.currentModule = 0;
    }

    init() {
        this.createPanel();
        this.setupEventListeners();
    }

    createPanel() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'info-panel';
        overlay.className = 'info-panel hidden';
        overlay.innerHTML = `
            <div class="info-content">
                <div class="info-header">
                    <span id="info-title" class="text-quantum-orange tracking-widest"></span>
                    <button id="info-close" class="text-xs opacity-50 hover:opacity-100">[ X ]</button>
                </div>
                <div class="info-body">
                    <div class="info-section">
                        <p class="text-xs opacity-50 mb-1">CONCEPT:</p>
                        <p id="info-concept" class="text-sm mb-4"></p>
                    </div>
                    <div class="info-section">
                        <p class="text-xs opacity-50 mb-1">EXPLANATION:</p>
                        <p id="info-explanation" class="text-sm mb-4 leading-relaxed"></p>
                    </div>
                    <div class="info-section">
                        <p class="text-xs opacity-50 mb-1">INTERACTION:</p>
                        <p id="info-interaction" class="text-sm opacity-70"></p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        this.panel = overlay;
    }

    setupEventListeners() {
        const closeBtn = document.getElementById('info-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hide());
        }

        // Close on overlay click
        this.panel.addEventListener('click', (e) => {
            if (e.target === this.panel) {
                this.hide();
            }
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isVisible) {
                this.hide();
            }
        });
    }

    show(moduleIndex) {
        const info = getModuleInfo(moduleIndex);
        if (!info) return;

        this.currentModule = moduleIndex;

        // Update content
        document.getElementById('info-title').textContent = info.title;
        document.getElementById('info-concept').textContent = info.concept;
        document.getElementById('info-explanation').textContent = info.explanation;
        document.getElementById('info-interaction').textContent = info.interaction;

        // Show panel
        this.panel.classList.remove('hidden');
        setTimeout(() => {
            this.panel.classList.add('visible');
        }, 10);

        this.isVisible = true;
    }

    hide() {
        this.panel.classList.remove('visible');
        setTimeout(() => {
            this.panel.classList.add('hidden');
        }, 300);

        this.isVisible = false;
    }

    toggle(moduleIndex) {
        if (this.isVisible && this.currentModule === moduleIndex) {
            this.hide();
        } else {
            this.show(moduleIndex);
        }
    }
}
