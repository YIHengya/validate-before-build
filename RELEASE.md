# Publishing Guide

## Prerequisites

1. **npm account**: Create at https://www.npmjs.com/signup
2. **GitHub repository**: Create at https://github.com/new
3. **NPM_TOKEN**: Add to GitHub repository secrets (Settings → Secrets → Actions)

## Setup

### 1. Link GitHub Repository

```bash
git remote add origin https://github.com/YOUR_USERNAME/validate-before-build.git
git push -u origin main
```

### 2. Configure npm token

1. Create npm token: https://www.npmjs.com/settings/YOUR_USERNAME/tokens
2. Add `NPM_TOKEN` to GitHub repository secrets

## Publishing

### Option A: Manual Publish

```bash
# Bump version (patch, minor, major)
npm version patch

# Publish manually
npm publish --access public
```

### Option B: Automated via Tag (Recommended)

```bash
# Bump version and create tag
npm version patch  # or minor/major

# Push to GitHub - triggers auto-publish
git push && git push --tags
```

## Version Bumping

```bash
npm version patch   # 0.1.0 → 0.1.1
npm version minor   # 0.1.0 → 0.2.0
npm version major   # 0.1.0 → 1.0.0
```

## Verification

After publishing:

```bash
# Check npm registry
npm view vbb-cc

# Test installation
npx vbb-cc@latest
```

## First Time Publishing

```bash
# Login to npm
npm login

# Initial publish
npm publish --access public
```
