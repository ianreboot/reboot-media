# Reboot Media, Inc. - Company Website

**INHERITS**: `/home/ian/CLAUDE.md` (All universal protocols apply)
**TECH STACK**: React/TypeScript/Vite/Tailwind
**BUSINESS**: Fractional CMO services at https://www.rebootmedia.net/
**COMPANY**: Reboot Media, Inc., Irvine CA (Ian Ho, LinkedIn: /in/ian-ho/)

## 🚀 DEPLOYMENT COMMANDS (MANDATORY - ALWAYS USE THESE)

**STOP** - Never use git push for deployment. Use these commands:
- **Deploy to Dev**: `npm run deploy:dev` → Report: "✅ Deployed to https://dev.rebootmedia.net/reboot/"
- **Deploy to Prod**: `npm run deploy:prod` → Report: "✅ Deployed to https://www.rebootmedia.net/"

**Critical Notes**:
- **Development**: Builds and pushes to GitHub automatically
- **Production**: Builds, then requires manual upload of dist/ folder
- **See**: `DEPLOYMENT.md` for full details and troubleshooting

**Before marking ANY task complete**: Did you run the appropriate deploy command?

## ⚠️ ACTIVE ISSUES

- **Forms don't send emails** - Currently only console.log, no email integration
- **Geographic targeting missing** - Site is US-focused but PRD requires Asian market focus

## Project Overview

Professional website for Reboot Media's fractional CMO services targeting Asian companies ($500K-$1.5M revenue) seeking American marketing expertise. Bangkok-based advantage for regional focus with US expertise perception. Foundation complete with React/TypeScript/Tailwind setup, dark/light mode, glassmorphism design.

**Core Positioning**: "American Marketing Psychology Expertise That Actually Converts - Without the US Price Tag"
**Target Markets**: Singapore, Thailand, Malaysia, Indonesia, Philippines (primary); US SMBs (secondary)
**Service Tiers**: Psychology Audit ($5K-$8K) → Growth Strategy ($8K-$12K) → Fractional CMO ($12K-$18K)

## Current Status
- ✅ Foundation complete (React/TS/Tailwind setup)
- ✅ Core page structure and navigation built
- ✅ Professional design with modern aesthetics
- 🔄 PRD development in progress
- ⏳ G Suite integrations pending (calendar + forms)
- ⏳ Content strategy and messaging pending

## Important Guidelines
- Do NOT reference existing rebootmedia.net content (fresh approach required)
- Professional company positioning (NOT sole proprietor)
- Follow PRD for Asian market positioning and messaging

## Technical Patterns

### Form System Architecture
- **3-Step Qualification**: Psychology questions → Revenue stage → Business details
- **Validation**: Real-time with visual feedback, progressive disclosure
- **Current State**: Logs to console only - NO email integration yet
- **Debug Protocol**: Apply SCOPE ISOLATION GATE from org CLAUDE.md for form issues

### Psychology-Driven UX
- **Typewriter Effect**: Loss aversion headlines with progressive slowdown
- **Social Proof**: Specific numbers ($3M+, 20+ companies, $2B+ managed)
- **Risk Reversal**: "Every month you wait costs $47,000" positioning

### Technical Implementation
- **Responsive**: Swiper.js for mobile pricing, fluid typography with clamp()
- **Performance**: Code splitting, ~65KB gzipped bundle
- **SEO Ready**: Structured data, meta tags, canonical URLs implemented
- **Logo**: Text-based "REBOOT MEDIA" with orange accent (no image logo)

## Inherited Protocol References (from org CLAUDE.md)
- **Time Limits**: 15 min → try different, 3 attempts → abandon, 60 min → strategic rollback
- **File Search**: Working dir → project root → `/home/ian/user-input/` → `/home/ian/` → then ask
- **Questions**: Never ask "how" - use tools to discover technical details
- **Scope Gate**: Single issue → local fix, Multiple issues → WIDE search

## Completion Checklist

Before marking complete:
- [ ] Feature works as specified
- [ ] Tested in target environment
- [ ] **Deployed using `npm run deploy:dev` or `npm run deploy:prod`**
- [ ] Verified deployment URL in browser
- [ ] No console errors
- [ ] Responsive design verified

## Project Resources
- **PRD**: See `PRD_FRACTIONAL_CMO.md` for complete positioning, personas, and content strategy
- **Roadmap**: See `PROJECT_ROADMAP.md` for next steps and design principles
- **Deployment**: See `DEPLOYMENT.md` for deployment details