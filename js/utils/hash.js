// Hash generation utilities

// Simple hash function
function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
}

// Seeded random number generator
class SeededRandom {
    constructor(seed) {
        this.seed = seed;
    }

    next() {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }

    nextInt(min, max) {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }
}

// Generate signal hash
export function generateSignalHash(seed = null) {
    // Use provided seed or create one from timestamp + random data
    const seedValue = seed || `${Date.now()}_${Math.random()}`;
    const hash = hashString(seedValue);

    // Convert to hex string (6 characters)
    const hexHash = (hash % 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0');

    return `Signal-#${hexHash}`;
}

// Generate deterministic pattern from seed
export function generatePattern(seed, size) {
    const rng = new SeededRandom(hashString(seed));
    const pattern = [];

    for (let i = 0; i < size * size; i++) {
        pattern.push(rng.next() > 0.5 ? 1 : 0);
    }

    return pattern;
}

// Create interaction seed from user data
export function createInteractionSeed(interactions = []) {
    const baseData = [
        Date.now(),
        navigator.userAgent.length,
        window.screen.width,
        window.screen.height,
        ...interactions
    ].join('_');

    return baseData;
}

export { SeededRandom };
