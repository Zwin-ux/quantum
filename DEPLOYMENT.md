# Deployment

## GitHub Pages

1. Settings → Pages
2. Source: **GitHub Actions**
3. Wait 1-2 min
4. Live at: `https://zwin-ux.github.io/quantum/`

## Vercel (Recommended for Backend)

Vercel deployment includes serverless API endpoints for signal storage and stats.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

**Features enabled on Vercel:**

- Signal gallery (stores user-generated patterns)
- Global statistics tracking
- Real-time signal sharing

## Troubleshooting

- Check Actions tab for errors
- Clear cache (Ctrl+Shift+R)
- Verify `.nojekyll` exists
