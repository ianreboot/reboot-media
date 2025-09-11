# Reboot Media - Marketing Agency Website - Claude Configuration

**INHERITS**: `/home/CLAUDE.md` (All universal protocols and AI intelligence patterns apply)
**TECH STACK**: TypeScript + React + Vite + Express.js (Full-stack application)

### **⚠️ DEPLOYMENT WARNING FOR AI**
**MAKING CODE CHANGES IS NOT ENOUGH!**
- This project has **automated deployment scripts** but you must run them
- **Source code changes** do NOT automatically update the live website  
- **You MUST run deployment scripts** after ANY code change
- **Users will NOT see changes** until deployment is complete
- **Use `npm run deploy:dev` for development** deployment

### Environment Configuration:
- **Development URL**: https://dev.rebootmedia.net/reboot/
- **Production URL**: https://www.rebootmedia.net/
- **Vite base path**: `/reboot/` (development), `/` (production)
- **Asset handling**: Automated via deployment scripts


## 🚀 DEPLOYMENT PROTOCOL

**⚠️ CRITICAL PATH CONFIGURATION**
- **ALWAYS use `/home/projects/reboot/` as the source directory**
- **NEVER use `/home/ian/projects/reboot/` (outdated path)**
- **When user says "push to prod"**: Deploy from `/home/projects/reboot/`

**Automated deployment scripts** - code changes require running deployment scripts.

### Development Deployment:
```bash
npm run deploy:dev
# Handles: build → copy assets → commit → push → deploy
# Deploys to: https://dev.rebootmedia.net/reboot/
```

### Production Deployment:
```bash
npm run deploy:prod  
# Handles: build → deploy to hosting → verify
# Deploys to: https://www.rebootmedia.net/
```

### Deployment Verification:
- [ ] Deployment script completed successfully
- [ ] Target URL shows changes
- [ ] No console errors in browser
- [ ] All functionality works on live site

## 🔧 DEVELOPMENT COMMANDS

```bash
# Full-stack development (frontend + backend)
npm run dev

# Frontend only development
npm run dev:frontend

# Server development only
npm run server:dev

# Build commands
npm run build        # Production build
npm run build:dev    # Development build with dev index.html
npm run build:prod   # Production build with prod index.html

# Testing
npm run test         # Run tests
npm run test:ui      # Interactive test UI
npm run test:coverage # Coverage report
```

## 📁 PROJECT STRUCTURE

**Key Directories:**
- `/src/` - Frontend React application
- `/server/` - Express.js backend API
- `/public/` - Static assets
- `/dist/` - Development build output
- `/dist-prod/` - Production build output

**Critical Files:**
- `index.dev.html` - Development environment HTML template
- `index.prod.html` - Production environment HTML template
- `vite.config.ts` - Vite configuration for frontend builds
- `/server/` - Complete Express.js backend with its own package.json

## ⚠️ CRITICAL PROTOCOLS

### **Dual Environment Management**
- **Development**: Uses `index.dev.html` with `/reboot/` base path
- **Production**: Uses `index.prod.html` with `/` base path
- **Backend**: Express.js server runs independently with API endpoints
- **Frontend**: React SPA with Vite build system

### **Full-Stack Considerations**
- **API Integration**: Frontend communicates with Express.js backend
- **Environment Variables**: Separate `.env` configs for dev/prod
- **CORS Configuration**: Backend handles cross-origin requests
- **Security**: Helmet.js security headers and rate limiting

### **Marketing Agency Context**
- **Business Type**: Professional marketing agency serving clients
- **Production Site**: Live business website at www.rebootmedia.net
- **Client Showcase**: Portfolio, services, and contact information
- **Lead Generation**: Professional contact forms and service inquiries

---

**Authority Hierarchy**: User explicit instruction > Universal CLAUDE.md (base rules) > Project CLAUDE.md (additions only) > Default behavior

**Core Principle**: This is a REAL BUSINESS website for Reboot Media marketing agency - treat with production-level care and professionalism.