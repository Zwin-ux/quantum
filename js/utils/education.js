// Educational content for each module - blunt and direct

export const moduleInfo = {
    0: {
        title: "NOISE_FLOOR",
        concept: "Even empty space has energy fluctuations",
        explanation: "At the quantum level, there's no such thing as true emptiness. What looks like a vacuum is actually filled with tiny energy fluctuations happening constantly. Think of it like static on an old TV—there's always background noise, even when nothing's happening.",
        interaction: "Move your cursor around and watch how the particles react. You're seeing how observation affects quantum fields in real-time."
    },
    
    1: {
        title: "SUPERPOSITION",
        concept: "Quantum particles can be in multiple states at once",
        explanation: "Before you measure it, a quantum bit exists in all possible states simultaneously. It's like a coin spinning in the air—it's neither heads nor tails until it lands. The tiles here are flickering because they're in that in-between state.",
        interaction: "Click on tiles to see them flicker. They're showing you what superposition looks like—existing as both 0 and 1 until you force them to pick one."
    },
    
    2: {
        title: "COLLAPSE",
        concept: "Measuring a quantum system forces it to choose one state",
        explanation: "When you observe or measure something quantum, it stops being in multiple states and picks just one. You get a definite answer, but you lose all the other possibilities that could have been. It's a one-way process—once it collapses, you can't undo it.",
        interaction: "Hit OBSERVE to collapse all the tiles at once. The pattern you get is unique to your interactions—same clicks would give the same pattern, but your specific sequence of clicks is yours alone."
    },
    
    3: {
        title: "ENTANGLEMENT",
        concept: "Two particles can be connected no matter how far apart",
        explanation: "When particles are entangled, they share a quantum state. If you measure one, you instantly know something about the other, even if they're on opposite sides of the universe. It's not that they're sending signals to each other—they're genuinely connected as a single system.",
        interaction: "Click LINK to entangle the two grids. When you change a tile on the left, the right grid mirrors it. They're acting as one system, not two separate ones communicating."
    },
    
    4: {
        title: "COMPUTATION_LIMIT",
        concept: "Even quantum computers have limits",
        explanation: "Quantum computers are powerful, but they're not infinitely fast. As problems get more complex, they slow down just like regular computers. The difference is what kind of problems they're good at solving. You can't escape the fundamental cost of computation.",
        interaction: "Watch the cellular automata evolve. See how the frame rate drops as it gets more complex? That's the computational cost becoming visible. More calculations = more processing time."
    },
    
    5: {
        title: "GALLERY",
        concept: "Every quantum measurement creates a unique outcome",
        explanation: "When you collapsed your wave function, you created a specific pattern based on your interactions. Everyone who uses this creates their own unique pattern. If you made the exact same clicks in the same order, you'd get the same result—but your particular sequence is uniquely yours.",
        interaction: "Browse through other people's collapsed patterns. Each one represents someone else's journey through the quantum states. Every hash is like a fingerprint of their choices."
    },
    
    6: {
        title: "SIGNAL_LOST",
        concept: "Information naturally degrades over time",
        explanation: "The second law of thermodynamics says that disorder always increases. Your signal, like everything else, will eventually scatter and become indistinguishable from background noise. It's not sad—it's just how the universe works. But right now, in this moment, it exists.",
        interaction: "Your journey is complete. The hash you see is a record of your path through the quantum states—a small piece of order in an increasingly chaotic universe."
    }
};

export function getModuleInfo(index) {
    return moduleInfo[index] || null;
}
