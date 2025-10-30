# Module Flow & Logic Analysis

## Current Module Progression

### Module 0: NOISE_FLOOR ✅
**Status**: Entry point (always unlocked)
**Required Points**: 10
**How to earn**: 1 point/second for watching

**Logic Check**:
- ✅ Auto-awards points passively
- ✅ Typewriter effect works
- ✅ Canvas animation runs smoothly
- ⚠️ **ISSUE**: No clear indication to move to next module

**Suggested Improvement**:
```javascript
// After 10 points, show hint to press arrow key or click next module
if (points >= 10 && !hintShown) {
    showHint("Module unlocked! Press → or click SUPERPOSITION");
}
```

---

### Module 1: SUPERPOSITION ✅
**Required Points**: 50
**How to earn**: 1 point/click, speed bonus (10 tiles in <30s = +10)

**Logic Check**:
- ✅ Hover shows superposition (flickering)
- ✅ Click collapses to 0 or 1
- ✅ Points track correctly
- ✅ Speed bonus works
- ⚠️ **ISSUE**: 50 points = 50 clicks feels grindy

**Suggested Improvement**:
```javascript
// Reduce required points to 30
// OR increase points per click to 2
// OR add pattern bonus (5+ tiles in a row = +5)
```

---

### Module 2: COLLAPSE ✅
**Required Points**: 30
**How to earn**: 1 point/interaction, 20 points for OBSERVE, bonus for 15+ interactions

**Logic Check**:
- ✅ Tiles flicker in superposition
- ✅ OBSERVE button works
- ✅ Hash generation works
- ✅ Stores to backend
- ✅ Good point balance (can complete in ~15-20 interactions)
- ✅ **BEST BALANCED MODULE**

**No changes needed** - this module has perfect pacing.

---

### Module 3: ENTANGLEMENT ✅
**Required Points**: 40
**How to earn**: 1 point/click, 5 for linking, 15 bonus for 30s+ linked

**Logic Check**:
- ✅ LINK button works
- ✅ Grids mirror correctly
- ✅ Ghost user interactions work
- ✅ Time-based bonus works
- ⚠️ **ISSUE**: Ghost user is cool but not explained well

**Suggested Improvement**:
```javascript
// Add visual indicator when ghost user acts
// Show "REMOTE_INTERACTION" flash when ghost clicks
```

---

### Module 4: COMPUTATION_LIMIT ✅
**Required Points**: 20
**How to earn**: 1 point/3 seconds, 10 bonus at 80% complexity

**Logic Check**:
- ✅ Cellular automata runs
- ✅ FPS degradation visible
- ✅ Edge cells show orange (glitchy)
- ✅ Complexity increases over time
- ✅ Visual feedback is excellent
- ⚠️ **ISSUE**: Passive module - just watch for 60 seconds

**Suggested Improvement**:
```javascript
// Add click interaction: "Click to seed new patterns"
// Each click adds random cells and gives +2 points
// Makes it more engaging than just watching
```

---

### Module 5: GALLERY ✅
**Required Points**: 0 (always accessible after Module 4)
**How to earn**: N/A (viewing only)

**Logic Check**:
- ✅ Fetches signals from API
- ✅ Displays mini-grids
- ✅ Shows timestamps
- ✅ Refresh button works
- ⚠️ **ISSUE**: Module index is wrong (should be 5, not 6)

**Critical Fix Needed**:
```javascript
// signalLost.js has moduleIndex: 5
// But it's actually module 6 in the array
// Gallery should be module 5
```

---

### Module 6: SIGNAL_LOST ✅
**Required Points**: N/A (finale)
**How to earn**: 100 bonus points for completion

**Logic Check**:
- ✅ Shows final hash
- ✅ Scanlines effect
- ✅ Restart button works
- ✅ Journey completion bonus
- ✅ Perfect ending

**No changes needed** - good finale.

---

## Critical Issues Found

### 1. **Module Index Mismatch** 🔴
```javascript
// signalLost.js line 16
this.moduleIndex = 5; // WRONG - should be 6

// Gallery module has no moduleIndex set
// Should be: this.moduleIndex = 5;
```

### 2. **Progress Tracker Config** 🔴
```javascript
// progressTracker.js only has modules 0-5 defined
// But we have 7 modules (0-6)
// Need to add module 6 config
modules: {
    0: { ... },
    1: { ... },
    2: { ... },
    3: { ... },
    4: { ... },
    5: { points: 0, completed: false, unlocked: false, requiredPoints: 0 }, // Gallery
    6: { points: 0, completed: false, unlocked: false, requiredPoints: 0 }  // Signal Lost
}
```

### 3. **Superposition Grind** 🟡
- 50 points = 50 clicks is tedious
- Reduce to 30 or increase point value

### 4. **No Transition Hints** 🟡
- Users don't know when they can move to next module
- Add visual "UNLOCKED" notification

---

## Recommended Point Rebalancing

| Module | Current | Suggested | Reason |
|--------|---------|-----------|--------|
| 0: Noise Floor | 10 | 10 | ✅ Good |
| 1: Superposition | 50 | 30 | Too grindy |
| 2: Collapse | 30 | 30 | ✅ Perfect |
| 3: Entanglement | 40 | 35 | Slightly high |
| 4: Computation | 20 | 20 | ✅ Good |
| 5: Gallery | 0 | 0 | ✅ Viewing only |
| 6: Signal Lost | 0 | 0 | ✅ Finale |

---

## User Flow Improvements

### Add Module Unlock Notifications
```javascript
// When module unlocks, show toast notification
function showUnlockNotification(moduleName) {
    const toast = document.createElement('div');
    toast.className = 'unlock-toast';
    toast.innerHTML = `
        <span class="text-quantum-orange">⟨ψ|</span>
        ${moduleName} UNLOCKED
        <span class="text-xs opacity-50">Press → or click nav</span>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
```

### Add Progress Indicator
```javascript
// Show progress bar for current module
<div class="module-progress">
    <div class="progress-bar" style="width: ${percentage}%"></div>
    <span>${currentPoints}/${requiredPoints}</span>
</div>
```

### Add Auto-Advance Option
```javascript
// After module completion, auto-advance after 3 seconds
// With countdown: "Next module in 3... 2... 1..."
// User can press any key to skip countdown
```

---

## Educational Content Check

All modules now have info panels (Press I) with:
- ✅ Clear concept explanation
- ✅ Natural language (not dramatic)
- ✅ Practical interaction guide
- ✅ Good analogies (spinning coin, TV static)

---

## Backend Integration Check

- ✅ API endpoints created (`/api/signals`, `/api/stats`)
- ✅ Collapse module stores signals
- ✅ Gallery displays signals
- ✅ Stats tracking works
- ⚠️ In-memory storage (resets on deploy)

**Future**: Upgrade to Vercel KV or Postgres for persistence

---

## Performance Check

- ✅ Canvas animations smooth
- ✅ Grid interactions responsive
- ✅ No memory leaks (intervals cleared)
- ✅ Mobile-friendly (responsive grids)
- ⚠️ Computation module intentionally slows (feature, not bug)

---

## Accessibility Check

- ✅ Keyboard navigation (arrows, 1-7, I)
- ✅ Visual feedback on all interactions
- ⚠️ No screen reader support (quantum visuals are inherently visual)
- ⚠️ No color-blind mode (cyan/orange may be hard to distinguish)

---

## Next Steps Priority

1. **FIX MODULE INDICES** (Critical)
2. **ADD UNLOCK NOTIFICATIONS** (High)
3. **REBALANCE SUPERPOSITION POINTS** (Medium)
4. **ADD PROGRESS BARS** (Medium)
5. **IMPROVE COMPUTATION INTERACTION** (Low)
