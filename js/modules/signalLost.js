// Module 5: Signal Lost - Outro Scene

export class SignalLost {
    constructor() {
        this.finalMessage = document.getElementById('final-message');
        this.finalHash = document.getElementById('final-hash');
        this.scanlines = document.getElementById('scanlines');
        this.restartBtn = document.getElementById('restart-btn');

        this.isActive = false;
        this.onRestartCallback = null;
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.restartBtn.addEventListener('click', () => {
            if (this.onRestartCallback) {
                this.onRestartCallback();
            }
        });
    }

    async start(signalHash = 'Signal-#000000') {
        this.isActive = true;

        // Set the final hash
        this.finalHash.textContent = signalHash;

        // Fade in message
        setTimeout(() => {
            this.finalMessage.style.opacity = '1';
            this.finalMessage.classList.add('fade-in');
        }, 500);

        // Activate scanlines effect
        setTimeout(() => {
            this.scanlines.style.opacity = '0.3';
        }, 2000);
    }

    stop() {
        this.isActive = false;
    }

    reset() {
        this.finalMessage.style.opacity = '0';
        this.finalMessage.classList.remove('fade-in');
        this.scanlines.style.opacity = '0';
        this.finalHash.textContent = 'Signal-#000000';
    }

    setRestartCallback(callback) {
        this.onRestartCallback = callback;
    }
}
