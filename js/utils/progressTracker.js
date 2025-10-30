// Progress Tracker - Manages points, progression, and localStorage

export class ProgressTracker {
    constructor() {
        this.storageKey = 'quantumSignals_progress';
        this.progress = this.loadProgress();
        this.listeners = [];
    }

    // Default progress structure
    getDefaultProgress() {
        return {
            version: '1.0',
            modules: {
                0: { points: 0, completed: false, unlocked: true, bestScore: 0, requiredPoints: 10 },
                1: { points: 0, completed: false, unlocked: false, bestScore: 0, requiredPoints: 30 },
                2: { points: 0, completed: false, unlocked: false, bestScore: 0, requiredPoints: 30 },
                3: { points: 0, completed: false, unlocked: false, bestScore: 0, requiredPoints: 35 },
                4: { points: 0, completed: false, unlocked: false, bestScore: 0, requiredPoints: 20 },
                5: { points: 0, completed: false, unlocked: false, bestScore: 0, requiredPoints: 0 },
                6: { points: 0, completed: false, unlocked: false, bestScore: 0, requiredPoints: 0 }
            },
            totalPoints: 0,
            currentModule: 0,
            completedJourney: false,
            lastUpdated: new Date().toISOString()
        };
    }

    // Load progress from localStorage
    loadProgress() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                const progress = JSON.parse(saved);
                console.log('Progress loaded from localStorage:', progress);
                return progress;
            }
        } catch (error) {
            console.error('Error loading progress:', error);
        }
        console.log('No saved progress found, using defaults');
        return this.getDefaultProgress();
    }

    // Save progress to localStorage
    saveProgress() {
        try {
            this.progress.lastUpdated = new Date().toISOString();
            localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
            console.log('Progress saved to localStorage');
            this.notifyListeners();
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    }

    // Add event listener for progress changes
    addListener(callback) {
        this.listeners.push(callback);
    }

    // Notify all listeners of progress change
    notifyListeners() {
        this.listeners.forEach(callback => callback(this.progress));
    }

    // Add points to a module
    addPoints(moduleIndex, points) {
        if (points <= 0) return;

        const module = this.progress.modules[moduleIndex];
        if (!module) return;

        module.points += points;

        // Update best score
        if (module.points > module.bestScore) {
            module.bestScore = module.points;
        }

        // Update total points
        this.updateTotalPoints();

        // Check for module completion
        this.checkModuleCompletion(moduleIndex);

        this.saveProgress();

        console.log(`Module ${moduleIndex}: +${points} points (total: ${module.points}/${module.requiredPoints})`);

        return {
            modulePoints: module.points,
            totalPoints: this.progress.totalPoints,
            completed: module.completed
        };
    }

    // Check if module has met completion criteria
    checkModuleCompletion(moduleIndex) {
        const module = this.progress.modules[moduleIndex];

        if (!module.completed && module.points >= module.requiredPoints) {
            module.completed = true;
            this.unlockNextModule(moduleIndex);
            console.log(`Module ${moduleIndex} completed!`);
            return true;
        }

        return false;
    }

    // Unlock the next module
    unlockNextModule(currentModuleIndex) {
        const nextModuleIndex = parseInt(currentModuleIndex) + 1;
        const nextModule = this.progress.modules[nextModuleIndex];

        if (nextModule && !nextModule.unlocked) {
            nextModule.unlocked = true;
            console.log(`Module ${nextModuleIndex} unlocked!`);

            // Check if journey is complete (Module 5 unlocked)
            if (nextModuleIndex === 5) {
                this.progress.completedJourney = true;
            }
        }
    }

    // Update total points across all modules
    updateTotalPoints() {
        this.progress.totalPoints = Object.values(this.progress.modules)
            .reduce((sum, module) => sum + module.points, 0);
    }

    // Get module progress
    getModuleProgress(moduleIndex) {
        return this.progress.modules[moduleIndex];
    }

    // Check if module is unlocked
    isModuleUnlocked(moduleIndex) {
        return this.progress.modules[moduleIndex]?.unlocked || false;
    }

    // Check if module is completed
    isModuleCompleted(moduleIndex) {
        return this.progress.modules[moduleIndex]?.completed || false;
    }

    // Get total points
    getTotalPoints() {
        return this.progress.totalPoints;
    }

    // Get current module
    getCurrentModule() {
        return this.progress.currentModule;
    }

    // Set current module
    setCurrentModule(moduleIndex) {
        this.progress.currentModule = moduleIndex;
        this.saveProgress();
    }

    // Reset specific module
    resetModule(moduleIndex) {
        const module = this.progress.modules[moduleIndex];
        if (module) {
            module.points = 0;
            module.completed = false;
            // Keep bestScore and unlocked status
            this.updateTotalPoints();
            this.saveProgress();
            console.log(`Module ${moduleIndex} reset`);
        }
    }

    // Reset all progress
    resetAllProgress() {
        this.progress = this.getDefaultProgress();
        this.saveProgress();
        console.log('All progress reset');
        return this.progress;
    }

    // Reset best scores but keep unlocks
    resetBestScores() {
        Object.values(this.progress.modules).forEach(module => {
            module.bestScore = 0;
        });
        this.saveProgress();
        console.log('Best scores reset');
    }

    // Get progress summary
    getProgressSummary() {
        const unlockedCount = Object.values(this.progress.modules)
            .filter(m => m.unlocked).length;
        const completedCount = Object.values(this.progress.modules)
            .filter(m => m.completed).length;

        return {
            totalPoints: this.progress.totalPoints,
            unlockedModules: unlockedCount,
            completedModules: completedCount,
            totalModules: 7,
            completedJourney: this.progress.completedJourney,
            currentModule: this.progress.currentModule
        };
    }

    // Export progress as JSON (for debugging/sharing)
    exportProgress() {
        return JSON.stringify(this.progress, null, 2);
    }

    // Import progress from JSON
    importProgress(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            this.progress = imported;
            this.saveProgress();
            console.log('Progress imported successfully');
            return true;
        } catch (error) {
            console.error('Error importing progress:', error);
            return false;
        }
    }
}

// Singleton instance
export const progressTracker = new ProgressTracker();
