# Quantum Signals

[![Deploy to GitHub Pages](https://github.com/Zwin-ux/quantum/actions/workflows/deploy.yml/badge.svg)](https://github.com/Zwin-ux/quantum/actions/workflows/deploy.yml)

Interactive quantum computing visualization.

🔗 [Live Demo](https://zwin-ux.github.io/quantum/)

## Modules

- **Noise Floor**: Quantum noise field
- **Superposition**: 32x32 interactive grid
- **Collapse**: Wave function collapse + hash generation
- **Entanglement**: Dual-grid sync
- **Computation Limit**: Cellular automata
- **Gallery**: View signals from other users (live)
- **Signal Lost**: Outro

## Stack

Vanilla JS (ES6) + TailwindCSS + Canvas 2D + Vercel Serverless Functions

## Project Structure

```text
quantm/
├── index.html              # Main entry point
├── api/                    # Vercel serverless functions
│   ├── signals.js          # Signal storage endpoint
│   └── stats.js            # Global stats endpoint
├── js/
│   ├── main.js             # Application controller
│   ├── modules/            # Interactive modules
│   │   ├── gallery.js      # Module 5: Signal gallery
│   │   └── ...             # Other modules
│   └── utils/
│       └── api.js          # Backend API client
└── styles/
    └── custom.css          # Custom styles
```

## Dev

```bash
git clone https://github.com/Zwin-ux/quantum.git
cd quantum

# Local (static only)
python -m http.server 8000

# With backend (Vercel)
npm install -g vercel
vercel dev
```

## Controls

- Click nav buttons or use arrow keys (1-7)

## Deploy

Settings → Pages → Source: **GitHub Actions**

See [DEPLOYMENT.md](DEPLOYMENT.md) for details.

## License

MIT
