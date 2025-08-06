# CLAUDE PROJECT CONTEXT - CRITICAL INFORMATION

## READ THIS FIRST - CONTEXT OVERRIDE
This file contains critical context that overrides default behavior. A previous Claude session completed extensive work on this Reboot Media project. **YOU MUST** read and understand this context before making any changes.

## PROJECT IDENTITY & POSITIONING
**Company**: Reboot Media, Inc. - Professional fractional CMO consultancy  
**NOT**: A sole proprietor or basic service provider  
**Owner**: Ian Ho - American marketing psychology expert based in Bangkok  
**LinkedIn**: https://www.linkedin.com/in/ian-ho/  
**Core Value Prop**: "Fresh Eyes Advantage" - lacks industry experience but sees opportunities others miss  

## DEPLOYMENT SYSTEM - CRITICAL KNOWLEDGE ⚠️
**NEVER USE**: `npm run build` - This command is disabled and will error  
**ALWAYS USE**: `npm run deploy:dev` for development deployment  

### Why This Matters
A previous session struggled with wrong asset paths between dev/prod environments. The build system was completely rebuilt with:
- Automated template selection (index.dev.html vs index.prod.html)  
- Asset path validation (scripts/validate-build.js)
- Build mode enforcement in vite.config.ts

### Correct Deployment Commands
```bash
npm run deploy:dev    # Deploys to dev.rebootmedia.net/reboot/
npm run deploy:prod   # Deploys to rebootmedia.net/
```

## CURRENT IMPLEMENTATION STATE

### ✅ COMPLETED (Do NOT redo these)
1. **Design System**: 8pt grid, fluid typography, 60-30-10 color rule
2. **Navigation**: Mobile sticky footer + Desktop sticky header  
3. **Hero Section**: Typewriter animation with proper line spacing
4. **Industry Experience**: "Fresh Eyes Advantage" positioning complete
5. **Case Study**: "From Struggling to Scaling" - dramatic dark redesign
6. **85% Statistics**: Combined with "Real Question" in two-column layout  
7. **Hover Effects**: Strategic placement - scale/rotate on story cards, border/shadow on pricing
8. **Dropdown Form Foundation**: Modal system with Step 1 complete

### ⏳ PENDING COMPLETION
**Primary Task**: Complete dropdown form Steps 2 & 3
- Step 1: ✅ Complete (marketing anxiety acknowledgment)
- Step 2: ⚠️ Placeholder (needs revenue qualification)  
- Step 3: ⚠️ Placeholder (needs comprehensive data collection)

**Location**: `/src/App.tsx` lines ~1422-1446
**What to do**: Copy the original multi-step form logic that was removed when we created the dropdown system

## MESSAGING & CONTENT STRATEGY

### Critical Messaging Points (DO NOT CHANGE)
1. **"Personal analysis"** NOT "AI-powered analysis" - Ian wants personal involvement emphasized
2. **"Fresh Eyes Advantage"** - turns lack of industry experience into competitive advantage
3. **Loss Aversion Focus** - "Stop Losing Revenue/Growth/etc" throughout
4. **85% statistic** - "of breakthrough results come from questioning industry standards"
5. **$500K monthly testing** - emphasizes real money spent on research

### User Journey (Established)
Hero → Problem ($200K mistake) → Solution (Fresh Eyes) → Proof (Case Study) → About → Services → CTA (Dropdown)

## TECHNICAL ARCHITECTURE

### State Management
```typescript
const [formStep, setFormStep] = useState(1);
const [showDropdownForm, setShowDropdownForm] = useState(false);  
const [formData, setFormData] = useState({ /* 11 fields */ });
```

### Key CTA Triggers
- Desktop header: "Get Started" → `setShowDropdownForm(true)`
- Mobile nav: "Start Now" → `setShowDropdownForm(true)`  
- Hero: "Show Me What's Broken" → `setShowDropdownForm(true)`

### Animation Patterns (Established)
- **Scale + Rotate**: Story cards, Fresh Eyes cards (500ms)
- **Scale Only**: Hero proof points (300ms)
- **Border + Shadow**: Pricing cards (300ms, no scale for readability)

## WHAT THE PREVIOUS SESSION ACCOMPLISHED

### Major Redesigns Completed
1. **Removed bottom contact section entirely** - now uses dropdown modal
2. **Redesigned "From Struggling to Scaling"** - from plain cards to engaging dark storytelling
3. **Combined sparse sections** - 85% stats + "Real Question" into dense two-column layout
4. **Fixed hero typography** - proper line spacing with negative margins
5. **Enhanced hover effects** - strategic placement for engagement without disruption

### Build System Overhaul
- Created bulletproof deployment system
- Added build validation
- Implemented automated template switching
- Fixed recurring path issues permanently

## DESIGN PRINCIPLES (DO NOT VIOLATE)

### From Frontend Design Methodology
1. **8pt Grid System**: All spacing in multiples of 8px
2. **Golden Ratio**: 1.618:1 proportions where applicable  
3. **Mobile-First**: Design for mobile, enhance for desktop
4. **Touch Targets**: 44px minimum for mobile buttons

### Psychology-Driven Design  
1. **Loss Aversion**: Focus on what customers are losing
2. **Social Proof**: Case studies, testimonials, statistics
3. **Authority**: Professional credentials, track record
4. **Scarcity**: Specific timelines and exclusivity

## CRITICAL FILES

### Must-Read Files
- `/home/ian/CLAUDE.md` - Universal project instructions
- `/home/ian/FRONTEND_DESIGN_METHODOLOGY.md` - Design system rules
- `SESSION_HANDOFF_DOCUMENTATION.md` - Complete implementation details

### Key Code Files  
- `/src/App.tsx` - Main component (1,450+ lines)
- `/src/index.css` - Custom theme with CSS variables
- `/vite.config.ts` - Enhanced build configuration
- `scripts/validate-build.js` - Build validation

## NEXT SESSION IMMEDIATE TASKS

### Priority 1: Complete Dropdown Form
The dropdown modal exists but Steps 2-3 are placeholders. You need to:

1. **Copy Step 2 logic** from the original contact section (revenue qualification)
2. **Copy Step 3 logic** with all form fields and gamification  
3. **Test form submission** and validation
4. **Ensure mobile responsiveness**

### How to Find Original Form Logic
The original multi-step form was removed around line 1015 in App.tsx. Look for form data structure and step logic patterns. The formData state already contains all the needed fields.

## COMMON MISTAKES TO AVOID

1. **❌ Using npm run build** - Will error, use deploy:dev instead
2. **❌ Redoing completed work** - Check the completed list above first
3. **❌ Changing established messaging** - "Personal analysis", "Fresh Eyes", etc. are final
4. **❌ Adding AI language** - Ian specifically removed "AI-powered" references  
5. **❌ Disrupting pricing cards** - Use border/shadow effects, NOT scale/rotate

## SUCCESS CRITERIA

### What Ian Values
- **Professional business appearance** (not sole proprietor)
- **Personal involvement** messaging (not automation)
- **Psychology-based** positioning and content
- **Mobile-optimized** experience
- **Reliable technical implementation**

### Current Status: ~95% Complete
The site is functionally complete except for the dropdown form Steps 2-3. Everything else has been carefully designed and implemented according to Ian's requirements.

## CONTEXT SUMMARY FOR NEXT AI

You're inheriting a nearly-complete, professionally designed marketing psychology consultancy website. The previous session solved major technical and design challenges. Your job is primarily to complete the dropdown form implementation by copying the original multi-step logic that was removed during the modal redesign.

**DO NOT** start from scratch or redo completed work. **DO** focus on finishing the form functionality to bring this project to 100% completion.

**ALWAYS** use `npm run deploy:dev` for deployment.  
**ALWAYS** read the handoff documentation before making changes.  
**ALWAYS** respect the established design patterns and messaging.

This project represents significant investment in professional design and technical architecture. Treat it with appropriate care and attention to detail.