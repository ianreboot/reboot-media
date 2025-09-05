# Reboot Media - Marketing Agency Website

**Tech Stack**: TypeScript + React + Vite + Express.js  
**Production URL**: https://www.rebootmedia.net/  
**Development URL**: https://dev.rebootmedia.net/reboot/

## Quick Start

### Local Development
```bash
# Install dependencies
npm install

# Start development server (frontend + backend)
npm run dev

# Or start frontend only
npm run dev:frontend
```


## Development Commands

### Building
```bash
# Development build (uses /reboot/ base path)
npm run build:dev

# Production build (uses / base path)  
npm run build:prod
```

### Testing & Quality
```bash
# Run tests
npm run test

# Lint code
npm run lint

# Accessibility validation
npm run accessibility:validate
```

### Server Development
```bash
# Start backend server only
npm run server:dev

# Build backend for production
npm run server:build:prod
```

## Project Structure

```
/reboot/
├── src/                 # Frontend React application
│   ├── components/      # React components
│   ├── pages/          # Page components  
│   └── styles/         # TailwindCSS styles
├── server/             # Express.js backend
│   ├── routes/         # API routes
│   └── middleware/     # Express middleware
├── scripts/            # Deployment and utility scripts
├── public/            # Static assets
└── dist/              # Built frontend assets (auto-generated)
```


## Environment Configuration

### Development (index.dev.html)
- Base path: `/reboot/`
- Development asset references
- Dev environment detection scripts

### Production (index.prod.html)
- Base path: `/`
- Production asset optimizations
- Security headers and CSP

## Features

- **Frontend**: React SPA with TypeScript and Vite
- **Backend**: Express.js API with security middleware
- **Styling**: TailwindCSS with custom design system  
- **Performance**: Optimized for Core Web Vitals
- **Accessibility**: WCAG 2.1 AA compliance
- **SEO**: Comprehensive meta tags and structured data

## Content Strategy

Reboot Media specializes in:
- Fractional CMO services for growing businesses
- Marketing psychology insights and implementation
- Business growth strategies and revenue optimization
- Educational content on customer acquisition psychology



## License

© 2025 Reboot Media, Inc. All rights reserved worldwide.