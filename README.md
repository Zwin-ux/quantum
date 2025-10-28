# Quantum Signals

[![Deploy to GitHub Pages](https://github.com/Zwin-ux/quantum/actions/workflows/deploy.yml/badge.svg)](https://github.com/Zwin-ux/quantum/actions/workflows/deploy.yml)

**When computation hits reality's edge.**

An interactive, physics-inspired micro-experience exploring the limits of knowledge and computation through quantum mechanics concepts.

🔗 **Live Demo**: [https://zwin-ux.github.io/quantum/](https://zwin-ux.github.io/quantum/)

📖 **Deployment Guide**: [DEPLOYMENT.md](DEPLOYMENT.md)

---

## Overview

Quantum Signals is a web-based interactive experience that visualizes quantum computing concepts through engaging, minimalist interfaces. Users explore six interconnected modules that demonstrate superposition, wave function collapse, quantum entanglement, and computational limits.

## Features

- **Noise Floor**: Landing scene with WebGL-powered quantum noise field
- **Superposition**: Interactive 32x32 grid demonstrating quantum state coexistence
- **Collapse**: Wave function collapse with unique signal hash generation
- **Entanglement**: Simulated quantum entanglement between two grids
- **Computation Limit**: Cellular automata showing performance degradation
- **Signal Lost**: Atmospheric outro with CRT effects

## Tech Stack

- Pure HTML5, CSS3, and vanilla JavaScript (ES6 modules)
- TailwindCSS for styling
- WebGL for visual effects
- No build tools required - fully static deployment

## Project Structure

```
quantm/
├── index.html              # Main entry point
├── styles/
│   └── custom.css          # Custom styles and CRT effects
├── js/
│   ├── main.js            # Application controller
│   ├── modules/
│   │   ├── noiseFloor.js   # Module 0: Landing scene
│   │   ├── superposition.js # Module 1: Superposition grid
│   │   ├── collapse.js      # Module 2: Wave function collapse
│   │   ├── entanglement.js  # Module 3: Entangled grids
│   │   ├── computationLimit.js # Module 4: Cellular automata
│   │   └── signalLost.js    # Module 5: Outro
│   └── utils/
│       ├── webgl.js        # WebGL utilities and shaders
│       └── hash.js         # Signal hash generation
└── README.md
```

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Zwin-ux/quantum.git
   cd quantum
   ```

2. Serve the files using any static file server:

   **Python 3:**
   ```bash
   python -m http.server 8000
   ```

   **Node.js (http-server):**
   ```bash
   npx http-server -p 8000
   ```

   **PHP:**
   ```bash
   php -S localhost:8000
   ```

   **VS Code Live Server:**
   - Install the "Live Server" extension
   - Right-click on `index.html` and select "Open with Live Server"

3. Open your browser to `http://localhost:8000`

## Navigation

- **Mouse**: Click on module names in the top navigation bar
- **Keyboard**:
  - Arrow Left/Right: Navigate between modules
  - Keys 1-6: Jump directly to a specific module
- **Touch**: Tap navigation buttons (mobile-friendly)

## Module Interactions

### Noise Floor
- Move your cursor to disturb the quantum noise field
- Watch the typewriter effect reveal the message

### Superposition
- Hover over tiles to enter superposition (flickering state)
- Click tiles to collapse them to 0 or 1

### Collapse
- Click tiles in superposition state
- Click "OBSERVE" to collapse the entire wave function
- Your unique signal hash is generated deterministically
- Click "COPY" to copy your signal hash

### Entanglement
- Click "LINK" to enable quantum entanglement
- Click tiles on the left grid
- Watch them mirror on the right grid with a delay
- Ghost user will randomly interact when linked

### Computation Limit
- Watch the cellular automata evolve
- Observe performance degradation near screen edges
- FPS counter shows the computational slowdown

### Signal Lost
- Experience the final fade-out
- Your journey's signal hash is displayed
- Click "RESTART_EXPERIENCE" to begin again

## Deployment to GitHub Pages

**The repository is already configured for automatic deployment!**

### Quick Setup (2 minutes):

1. Go to your repository: `https://github.com/Zwin-ux/quantum`
2. Click **Settings** → **Pages**
3. Under "Build and deployment", set **Source** to **GitHub Actions**
4. Wait 1-2 minutes for deployment
5. Your site will be live at: `https://zwin-ux.github.io/quantum/`

### Detailed Instructions

For complete setup instructions, troubleshooting, and advanced options, see:
**[DEPLOYMENT.md](DEPLOYMENT.md)**

The deployment guide covers:
- Automatic deployment with GitHub Actions
- Manual deployment options
- Troubleshooting common issues
- Custom domain setup
- Monitoring deployments

## Browser Compatibility

- Chrome/Edge 90+ (recommended)
- Firefox 88+
- Safari 14+
- Opera 76+

**Note**: WebGL is required. The experience will not work on browsers without WebGL support.

## Performance Notes

- The Computation Limit module intentionally slows down to demonstrate computational limits
- For best experience, use a modern GPU-enabled browser
- Mobile devices may experience reduced performance on complex modules

## Customization

### Color Scheme
Edit the CSS variables in [styles/custom.css](styles/custom.css:3-7):
```css
:root {
    --cyan: #00ffff;
    --orange: #ff6600;
    --dark: #0a0a0a;
}
```

### Grid Sizes
Modify the `gridSize` property in each module:
- Superposition: [js/modules/superposition.js](js/modules/superposition.js:6)
- Collapse: [js/modules/collapse.js](js/modules/collapse.js:14)
- Entanglement: [js/modules/entanglement.js](js/modules/entanglement.js:9)

### Cellular Automata Settings
Adjust parameters in [js/modules/computationLimit.js](js/modules/computationLimit.js:8-11):
```javascript
this.cellSize = 4;
this.cols = 160;
this.rows = 120;
```

## Credits

- Concept & Design: Quantum Signals Team
- Font: [JetBrains Mono](https://www.jetbrains.com/lp/mono/)
- Framework: Vanilla JS + TailwindCSS

## License

MIT License - feel free to fork, modify, and share!

## Troubleshooting

**WebGL not working:**
- Ensure your browser supports WebGL
- Try enabling hardware acceleration in browser settings
- Update your graphics drivers

**Modules not loading:**
- Check browser console for JavaScript errors
- Ensure you're serving files over HTTP (not file://)
- Clear browser cache and reload

**Performance issues:**
- Reduce grid sizes in module files
- Disable CRT effects in custom.css
- Try a different browser

## Future Enhancements

- [ ] Real-time multiplayer entanglement (Firebase/Supabase)
- [ ] Audio implementation (Web Audio API)
- [ ] Research mode with physics explanations
- [ ] Mobile-optimized UI
- [ ] Export journey as image/video
- [ ] Additional quantum phenomena modules

---

**Explore the edge where computation meets reality.**
