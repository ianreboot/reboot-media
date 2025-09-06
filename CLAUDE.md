# Reboot Media - Marketing Agency Website - Claude Configuration

**INHERITS**: `/home/CLAUDE.md` (All universal protocols and AI intelligence patterns apply)
**TECH STACK**: TypeScript + React + Vite + Express.js (Full-stack application)

### 🚨 **SERVER ENVIRONMENT REMINDER**
**You are running ON dev.rebootmedia.net server**
- **DEV Access URL**: https://dev.rebootmedia.net/reboot/ (ONLY way to test during development)
- **DEV Vite base path**: `/reboot/` (matches dev server subpath)
- **DEV Asset paths**: All `/reboot/` prefixes are CORRECT for development
- **PRODUCTION**: Uses root domain www.rebootmedia.net (base path `/`)
- **NO localhost exists** - never reference localhost URLs

### 🚨 **CRITICAL PATH REQUIREMENT - NEVER REMOVE /reboot/ PREFIXES**
**ALL development assets MUST use `/reboot/` prefix:**
- ✅ CORRECT: `src="/reboot/src/main.tsx"` (development)
- ❌ WRONG: `src="/src/main.tsx"` (will 404 on dev server)
- ✅ CORRECT: `href="/reboot/favicon.ico"` (development)
- ❌ WRONG: `href="/favicon.ico"` (will 404 on dev server)
- ✅ CORRECT: `<link rel="stylesheet" href="/reboot/assets/index.css">`
- ❌ WRONG: `<link rel="stylesheet" href="/assets/index.css">`

**Why this matters:**
- Dev server serves from subpath: `https://dev.rebootmedia.net/reboot/`
- Removing `/reboot/` prefix breaks ALL asset loading in development
- "Clean" index.html does NOT mean removing required prefixes
- Build failures are usually vite config issues, NOT path prefix issues
- Both `index.dev.html` and `index.html` MUST maintain these prefixes for dev environment

## 🚀 DEPLOYMENT PROTOCOL

**Development Environment** (https://dev.rebootmedia.net/reboot/):
```bash
npm run build:dev
npm run deploy:dev
```

**Production Environment** (https://www.rebootmedia.net/):
```bash
npm run build:prod
npm run deploy:prod
```

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

**Authority Hierarchy**: User explicit instruction > Project CLAUDE.md > Universal /home/CLAUDE.md > Default behavior

**Core Principle**: This is a REAL BUSINESS website for Reboot Media marketing agency - treat with production-level care and professionalism.