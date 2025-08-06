# Deployment Guide - Reboot Media Website

## Quick Deploy Commands

### Development Environment
```bash
npm run deploy:dev
# Automatically builds, copies files to root, and pushes to GitHub
# Site: https://dev.rebootmedia.net/reboot/
```

### Production Environment  
```bash
npm run deploy:prod
# Builds for production - upload dist/ folder to production server
# Site: https://www.rebootmedia.net/
```

## File Structure After Build

The `dist/` folder contains:
```
dist/
├── index.html          # Main HTML file
├── reboot-media.avif   # Logo file
├── vite.svg           # Default Vite icon
└── assets/
    ├── index-[hash].css  # Compiled CSS
    ├── index-[hash].js   # Main application JS
    └── vendor-[hash].js  # React/vendor JS
```

## Important Notes

1. **Deployment Differences**
   - **Dev**: Files are copied to root directory and served from GitHub repository
   - **Prod**: Deploy the contents of `dist/` folder to production server

2. **Path Configuration**
   - Dev build uses `/reboot/` base path for https://dev.rebootmedia.net/reboot/
   - Prod build uses `/` base path for https://www.rebootmedia.net/

3. **Dev Server Behavior**
   - Dev server (dev.rebootmedia.net) serves directly from GitHub repository root
   - This is why `npm run deploy:dev` copies built files to root and commits them
   - Do NOT manually copy source files - use the deployment script

3. **Server Configuration**
   - Make sure server serves `index.html` for SPA routing
   - Configure proper MIME types for `.avif` files
   - Enable gzip compression for better performance

## Troubleshooting

### Issue: 404 errors for assets
**Cause**: Wrong files deployed or incorrect server path configuration
**Solution**: 
1. Ensure you deployed the `dist/` folder contents, not root files
2. Check that base paths match server directory structure

### Issue: MIME type errors
**Cause**: Server doesn't recognize the file types
**Solution**: Configure server to serve proper MIME types:
- `.js` files: `application/javascript`
- `.css` files: `text/css`
- `.avif` files: `image/avif`

### Issue: Logo not loading
**Cause**: AVIF format not supported or path issues
**Solution**: 
1. Ensure server supports AVIF MIME type
2. Check that logo file is in the correct location
3. Verify base paths are correctly configured

## Build Verification

After building, verify these files exist in `dist/`:
- ✅ `index.html` (contains script tags pointing to `/reboot/assets/` for dev or `/assets/` for prod)
- ✅ `reboot-media.avif` (logo file)
- ✅ `assets/index-[hash].css` (compiled styles)
- ✅ `assets/index-[hash].js` (application code)
- ✅ `assets/vendor-[hash].js` (React and dependencies)

## Performance Notes

Current build sizes:
- **Total bundle**: ~210KB (~65KB gzipped)
- **CSS**: ~6KB (~1.7KB gzipped)  
- **Main JS**: ~198KB (~60KB gzipped)
- **Vendor JS**: ~12KB (~4KB gzipped)

Optimized for fast loading with:
- Code splitting (vendor vs app code)
- CSS extraction
- Asset optimization
- Gzip compression