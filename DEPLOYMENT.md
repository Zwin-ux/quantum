# GitHub Pages Deployment Guide

This guide will help you enable GitHub Pages for the Quantum Signals project.

## Automatic Deployment (Recommended)

The repository is already configured with GitHub Actions for automatic deployment. Follow these steps:

### Step 1: Enable GitHub Pages with GitHub Actions

1. Go to your repository on GitHub:
   ```
   https://github.com/Zwin-ux/quantum
   ```

2. Click on **Settings** (top menu)

3. In the left sidebar, click **Pages**

4. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions**
   - You should see "Your site is ready to be published"

5. Click **Save** (if there's a save button)

6. The GitHub Actions workflow will automatically trigger and deploy your site

### Step 2: Wait for Deployment

1. Go to the **Actions** tab in your repository:
   ```
   https://github.com/Zwin-ux/quantum/actions
   ```

2. You should see a workflow run called "Deploy to GitHub Pages"

3. Wait for the workflow to complete (usually takes 1-2 minutes)
   - Green checkmark = Success
   - Red X = Failed (check the logs)

### Step 3: Access Your Site

Once deployment is complete, your site will be live at:
```
https://zwin-ux.github.io/quantum/
```

You can find the exact URL in:
- Settings → Pages → "Your site is live at..."
- Actions → Latest workflow run → deployment step

---

## Manual Deployment (Alternative)

If you prefer to deploy manually without GitHub Actions:

### Option 1: Web Interface

1. Go to repository **Settings** → **Pages**

2. Under **Build and deployment**:
   - **Source**: Deploy from a branch
   - **Branch**: `master`
   - **Folder**: `/ (root)`

3. Click **Save**

4. Wait 1-2 minutes for GitHub to build and deploy

5. Your site will be at: `https://zwin-ux.github.io/quantum/`

### Option 2: GitHub CLI (gh)

If you have the GitHub CLI installed and authenticated:

```bash
# Login to GitHub (if not already)
gh auth login

# Enable GitHub Pages
gh api repos/Zwin-ux/quantum/pages -X POST -f source[branch]=master -f source[path]=/

# Check status
gh api repos/Zwin-ux/quantum/pages
```

---

## Troubleshooting

### Site Not Loading

**Check deployment status:**
```bash
gh api repos/Zwin-ux/quantum/pages
```

Or visit: `https://github.com/Zwin-ux/quantum/settings/pages`

**Common issues:**
- Wait 1-2 minutes after enabling Pages
- Check Actions tab for workflow errors
- Ensure the master branch has the latest code
- Clear browser cache and try incognito mode

### GitHub Actions Failing

1. Go to **Actions** tab
2. Click on the failed workflow
3. Check the error logs
4. Common fixes:
   - Ensure Pages is enabled in Settings
   - Check repository permissions
   - Re-run the workflow

### 404 Errors

**If you get a 404:**
- Verify the URL is correct: `https://zwin-ux.github.io/quantum/`
- Check that Pages is enabled in Settings
- Ensure the workflow completed successfully
- Wait a few minutes and try again

### Assets Not Loading

**If JavaScript/CSS isn't loading:**
- All paths in the code are relative, so they should work
- Check browser console for errors
- Verify `.nojekyll` file exists (disables Jekyll)
- Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

---

## Updating Your Site

Every time you push to the `master` branch, GitHub Actions will automatically rebuild and redeploy your site.

```bash
# Make changes to your code
git add .
git commit -m "Update quantum experience"
git push origin master

# Watch deployment in Actions tab
# Site updates automatically in 1-2 minutes
```

---

## Custom Domain (Optional)

To use a custom domain:

1. Go to **Settings** → **Pages**
2. Under "Custom domain", enter your domain (e.g., `quantum.yourdomain.com`)
3. Add a CNAME record in your DNS settings pointing to `zwin-ux.github.io`
4. Wait for DNS propagation (can take up to 24 hours)
5. Enable "Enforce HTTPS" after DNS is configured

---

## Monitoring

**Check deployment status:**
- Actions: `https://github.com/Zwin-ux/quantum/actions`
- Pages settings: `https://github.com/Zwin-ux/quantum/settings/pages`
- Live site: `https://zwin-ux.github.io/quantum/`

**View deployment history:**
```bash
gh api repos/Zwin-ux/quantum/pages/builds
```

---

## Files Added for GitHub Pages

- `.nojekyll` - Prevents Jekyll processing (important for ES6 modules)
- `.github/workflows/deploy.yml` - GitHub Actions workflow for automatic deployment
- `DEPLOYMENT.md` - This deployment guide

All paths are relative, so the site works on both localhost and GitHub Pages without modification.

---

## Quick Start Checklist

- [x] Repository pushed to GitHub
- [x] `.nojekyll` file added
- [x] GitHub Actions workflow configured
- [ ] Go to Settings → Pages
- [ ] Set Source to "GitHub Actions"
- [ ] Wait for deployment
- [ ] Visit `https://zwin-ux.github.io/quantum/`
- [ ] Share your quantum experience!

---

**Need help?** Check the [main README](README.md) or open an issue on GitHub.
