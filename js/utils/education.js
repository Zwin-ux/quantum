// Educational content for each module - blunt and direct

export const moduleInfo = {
    0: {
        title: "NOISE_FLOOR",
        concept: "Everything has noise. Even 'nothing' isn't empty.",
        explanation: "Quantum fields never stop fluctuating. Vacuum isn't empty—it's seething with virtual particles popping in and out of existence. This is the baseline chaos of reality.",
        interaction: "Move your cursor. Watch how you disturb the field just by observing it."
    },
    
    1: {
        title: "SUPERPOSITION",
        concept: "Things exist in multiple states until you look.",
        explanation: "A quantum bit isn't 0 OR 1. It's 0 AND 1 simultaneously. Schrödinger's cat isn't dead or alive—it's both. This isn't philosophy, it's physics.",
        interaction: "Click tiles. They flicker between states because they haven't been measured yet."
    },
    
    2: {
        title: "COLLAPSE",
        concept: "Observation destroys possibility.",
        explanation: "The moment you measure a quantum system, all possibilities collapse into one reality. You gain certainty but lose potential. Every measurement is irreversible.",
        interaction: "Click OBSERVE. Watch infinite possibilities die into a single pattern. That's your unique signal—deterministic chaos from your choices."
    },
    
    3: {
        title: "ENTANGLEMENT",
        concept: "Distance is meaningless for connected particles.",
        explanation: "Two entangled particles share one quantum state. Measure one, the other instantly 'knows'—faster than light. Einstein called it 'spooky action.' He was wrong to doubt it.",
        interaction: "Link the grids. Change one, the other mirrors it. This isn't communication—it's correlation. They're not two systems, they're one."
    },
    
    4: {
        title: "COMPUTATION_LIMIT",
        concept: "Complexity has a cost. Always.",
        explanation: "Quantum computers aren't magic. They trade space for time, certainty for probability. As systems grow, even quantum algorithms hit walls. Watch the FPS drop—that's reality pushing back.",
        interaction: "The automata evolves. Notice how it slows near edges? That's computational overhead. More complexity = more cost."
    },
    
    5: {
        title: "GALLERY",
        concept: "Your signal is unique but not alone.",
        explanation: "Every collapsed wave function creates a unique pattern. Yours exists alongside thousands of others. Each one is deterministic—same inputs, same output—but the inputs (your clicks) were yours alone.",
        interaction: "See other users' signals. Each hash is a fingerprint of their quantum choices."
    },
    
    6: {
        title: "SIGNAL_LOST",
        concept: "Information decays. Entropy wins.",
        explanation: "The universe trends toward disorder. Your signal will degrade, scatter, become noise. This isn't pessimism—it's thermodynamics. But for a moment, it existed.",
        interaction: "Your journey hash is stored. A brief defiance of entropy."
    }
};

export function getModuleInfo(index) {
    return moduleInfo[index] || null;
}
