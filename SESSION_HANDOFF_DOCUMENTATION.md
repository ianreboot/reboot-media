# Reboot Media Project - Session Handoff Documentation

## PROJECT OVERVIEW
**Company**: Reboot Media, Inc. (Professional business, NOT sole proprietor)  
**Owner**: Ian Ho (https://www.linkedin.com/in/ian-ho/)  
**Service**: Fractional CMO with marketing psychology expertise  
**Target Market**: Companies $500K-$10M+ revenue seeking growth breakthroughs  
**Unique Value**: "Fresh Eyes Advantage" - questioning industry standards with proven psychology  

## TECHNICAL SETUP
**Framework**: React + TypeScript + Vite  
**Styling**: Tailwind CSS with custom theme (8pt grid system)  
**Deployment**: 
- **Dev**: https://dev.rebootmedia.net/reboot/ (uses `/reboot/` base path)
- **Prod**: https://rebootmedia.net/ (uses `/` base path)
- **Build System**: `npm run build:dev` / `npm run build:prod` (NEVER use `npm run build`)

## CRITICAL BUILD SYSTEM KNOWLEDGE
⚠️ **PERMANENT FIX IMPLEMENTED**: The build system has been completely overhauled to prevent path errors.

### Build Commands (MANDATORY)
```bash
# Development deployment
npm run deploy:dev

# Production deployment  
npm run deploy:prod

# Manual building (if needed)
npm run build:dev    # For dev.rebootmedia.net/reboot/
npm run build:prod   # For rebootmedia.net/

# DEPRECATED - Will show error and exit
npm run build        # ❌ NEVER USE
```

### File Structure
- `index.dev.html` → Template for development (uses /reboot/ paths)
- `index.prod.html` → Template for production (uses / paths)  
- `scripts/validate-build.js` → Validates correct asset paths after build
- `vite.config.ts` → Enhanced with logging and validation

### Deployment Process
1. Build scripts automatically copy correct HTML template
2. Vite builds with correct base path based on mode
3. Validation script verifies asset paths
4. Deploy script handles GitHub push

## CURRENT IMPLEMENTATION STATUS

### ✅ COMPLETED FEATURES

#### 1. **Typography & Design System**
- **8pt Grid System**: Consistent spacing using multiples of 8px
- **Fluid Typography**: `clamp()` functions for responsive text scaling
- **60-30-10 Color Rule**: Stone (60%), Blue (30%), Orange (10% - CTA only)
- **Golden Ratio**: 1.618:1 proportions for visual harmony
- **Line Heights**: 1.2 (headlines), 1.3 (forms), 1.4 (body), 1.6 (explanatory)

#### 2. **Navigation System**
- **Desktop**: Fixed header with sticky behavior on scroll
- **Mobile**: Top brand bar + sticky bottom navigation (per Frontend Design Methodology)
- **Responsive Breakpoints**: Mobile-first approach with `md:` breakpoints

#### 3. **Hero Section**
- **Typewriter Animation**: Cycles through loss aversion words (Revenue, Growth, etc.)
- **Progressive Slowdown**: Animation gets slower over time to reduce distraction
- **Fixed Line Spacing**: Hero text properly spaced using negative margins
- **Proof Points**: 3 cards with hover scale effects (30X Growth, Stop Bleeding, Sleep Better)

#### 4. **Industry Experience Section** 
- **"Fresh Eyes Advantage"**: Reframes lack of industry experience as positive
- **Problem-Solution-Proof Structure**: 3-step logical flow
- **Visual Cards**: Hover effects with scale and slight rotation
- **85% + Real Question**: Combined into engaging two-column layout

#### 5. **Case Study Section - "From Struggling to Scaling"**
- **Completely Redesigned**: Dark storytelling card with glassmorphism
- **Before/After**: $100K → $3M+ with real client quotes
- **Psychology Breakthrough**: Explains loss aversion discovery
- **Visual Interest**: Rotating arrow, background patterns, color-coded sections

#### 6. **About Section**
- **Story Cards**: Battle-Tested Results, Global Reach, Proven Industries
- **Hover Effects**: Scale + rotate animations for engagement
- **LinkedIn Verification**: Professional credibility link

#### 7. **Services/Pricing**
- **3 Tiers**: Marketing Psychology Audit, Growth Strategy, Fractional CMO
- **Hover Effects**: Enhanced borders and shadows (NOT disruptive scale/rotate)
- **Value Positioning**: Clear savings messaging and guarantees

#### 8. **Dropdown Lead Form System** 🎯
- **Modal Design**: Professional overlay with backdrop blur
- **Trigger Points**: All CTAs (header, mobile nav, hero button) open dropdown
- **Step 1 Complete**: Marketing anxiety acknowledgment with 4 challenge options
- **Steps 2-3**: Placeholder "Coming Soon" messages
- **Responsive**: Works on all screen sizes with proper scrolling

### ⏳ PENDING COMPLETION

#### **Dropdown Form Steps 2 & 3**
**Location**: `/src/App.tsx` lines ~1422-1446  
**Current State**: Placeholder messages  
**Needed**: Copy full form logic from original contact section that was removed

**Step 2 Requirements**:
- Revenue qualification: $500K-$1M, $1M-$3M, $3M-$10M, $10M+
- Progress indicators
- Back navigation

**Step 3 Requirements**:
- Comprehensive data collection for AI workflow
- Required fields: name, company, email, website, specificIssue, timeline
- Optional fields: industry, teamSize, currentMarketing
- Gamification: progress bar, completion counter, encouragement
- Submit functionality with validation

## ANIMATION & INTERACTION PATTERNS

### **Hover Effects Applied**
1. **Scale + Rotate**: About story cards, Fresh Eyes cards
2. **Scale Only**: Hero proof points, Fresh Eyes advantage cards  
3. **Border + Shadow**: Pricing cards (no scale to maintain readability)
4. **Button Transforms**: All CTAs have `hover:scale-105`

### **Animation Timing**
- **Fast**: 300ms for buttons and small elements
- **Medium**: 500ms for card scale/rotate effects
- **Consistent**: All transitions use same duration classes

## CONTENT STRATEGY DECISIONS

### **Messaging Approach**
- **Loss Aversion Focus**: "Stop Losing [Revenue/Growth/etc]" in hero
- **Fresh Eyes Positioning**: Industry inexperience as competitive advantage
- **Psychology Authority**: 85% statistic, $500K monthly testing, 7 industries
- **Social Proof**: Norton Software case study, client testimonials
- **Personal Involvement**: Removed "AI-powered" language, emphasizes Ian's direct work

### **User Journey**
1. **Hero**: Captures attention with loss aversion + typewriter animation
2. **Problem**: Establishes marketing frustration ($200K mistake)
3. **Solution**: Fresh eyes advantage explanation
4. **Proof**: Case study + statistics
5. **About**: Personal credibility and story
6. **Services**: Clear pricing and value proposition
7. **CTA**: Dropdown form for lead capture

## FORM STATE MANAGEMENT

### **Current State Variables**
```typescript
const [formStep, setFormStep] = useState(1);
const [showDropdownForm, setShowDropdownForm] = useState(false);
const [formData, setFormData] = useState({
  email: '', challenge: '', revenue: '', name: '', company: '',
  timeline: '', website: '', specificIssue: '', industry: '',
  teamSize: '', currentMarketing: ''
});
```

### **CTA Conversion Points**
- Desktop header: "Get Started" button
- Mobile navigation: "Start Now" button  
- Hero section: "Show Me What's Broken in My Marketing" button
- All trigger: `setShowDropdownForm(true)`

## CRITICAL DESIGN PRINCIPLES

### **From Frontend Design Methodology**
1. **8pt Grid**: All spacing uses multiples of 8px
2. **Mobile-First**: Design for mobile, enhance for desktop
3. **Touch Targets**: Minimum 44px for mobile interactions
4. **Golden Ratio**: 1.618:1 proportions where applicable
5. **Z/F Scan Pattern**: Content flows naturally for eye movement

### **Psychology-Driven Design**
1. **Loss Aversion**: "Stop Losing" messaging throughout
2. **Social Proof**: Testimonials, case studies, statistics
3. **Scarcity**: Specific timelines and exclusivity
4. **Authority**: Professional credentials, track record
5. **Reciprocity**: Free analysis creates obligation

## COMMON ISSUES & SOLUTIONS

### **Build Path Problems** ✅ SOLVED
- **Problem**: Wrong asset paths between dev/prod
- **Solution**: Automated build system with validation
- **Never**: Use `npm run build` - will error and exit

### **TypeScript Issues**
- **Textarea rows**: Use `rows={3}` not `rows="3"`
- **Form field typing**: Use `field as keyof typeof formData` for dynamic access

### **Responsive Breakpoints**
- **Mobile**: Default (up to 767px)
- **Tablet**: `md:` prefix (768px+)  
- **Desktop**: `lg:` prefix (1024px+)
- **Large**: `xl:` prefix (1280px+)

## NEXT SESSION PRIORITIES

### **High Priority**
1. **Complete Dropdown Form Steps 2 & 3**
   - Copy logic from removed contact section
   - Ensure all fields and validation work
   - Test form submission flow

2. **Form Integration Testing**
   - Test on mobile and desktop
   - Verify all trigger points work
   - Check form state persistence

### **Medium Priority** 
1. **G Suite Calendar Integration** (future feature)
2. **G Suite Contact Forms Integration** (future feature)
3. **Performance Optimization** (if needed)

### **Low Priority**
1. **Additional Content Sections** (if requested)
2. **Advanced Analytics** (future)

## FILE LOCATIONS

### **Key Files**
- **Main Component**: `/src/App.tsx` (1,450+ lines)
- **Styles**: `/src/index.css` (custom theme variables)
- **Build Config**: `/vite.config.ts` (enhanced with validation)
- **Validation**: `/scripts/validate-build.js` (build checker)
- **Templates**: `/index.dev.html`, `/index.prod.html`

### **Assets**
- **Logo/Icon**: `/reboot-media.avif`
- **Fonts**: Google Fonts (Figtree family)

## DEPLOYMENT COMMANDS REFERENCE

```bash
# Quick development deployment
npm run deploy:dev

# Check current git status  
git status

# Manual build if needed
npm run build:dev
node scripts/validate-build.js

# View build validation results
cat dist/index.html | grep assets

# Check live site
curl -s https://dev.rebootmedia.net/reboot/ | head -20
```

## SUCCESS METRICS ACHIEVED

1. ✅ **Professional Business Positioning**: No longer looks like sole proprietor
2. ✅ **Fresh Eyes Advantage**: Successfully reframed industry experience objection
3. ✅ **Engaging Visual Design**: Removed "AI-generated" look with custom styling
4. ✅ **Mobile-Optimized**: Sticky footer navigation per design methodology
5. ✅ **Conversion-Focused**: Clear user journey with psychology-driven messaging
6. ✅ **Technical Excellence**: Bulletproof build system with validation
7. ✅ **Personal Branding**: Emphasizes Ian's direct involvement vs AI automation

## CONTEXT FOR NEXT AI

This project represents a complete transformation from a basic landing page to a sophisticated marketing psychology consultancy website. The client (Ian) values:

- **Professional appearance** over flashy design
- **Personal involvement** messaging vs automation
- **Psychology-based** positioning and content
- **Mobile-first** approach with Desktop enhancement  
- **Conversion optimization** through proven principles
- **Technical reliability** with robust build systems

The current dropdown form system needs completion but the foundation is solid. Focus on finishing the form steps 2-3 by copying the comprehensive logic from the original contact section that was removed during this redesign.

**Most Important**: Always use `npm run deploy:dev` - the build system is now bulletproof but only if you use the correct commands.