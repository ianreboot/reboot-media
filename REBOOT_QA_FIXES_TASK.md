# Reboot Media QA Fixes - Long Running Task

**Long Running Task ID**: REBOOT_QA_FIXES_20250911  
**Status**: INITIATED  
**Start Date**: 2025-09-11  
**Target Completion**: 2025-09-11  
**Task Type**: Bug Fixes and UI/UX Improvements
**Context Switches**: 0  

## 📊 Quick Stats
- **Items Completed**: 0/35 (0%)
- **Current Phase**: Phase 1 - Critical Sitewide Issues
- **Blockers**: None
- **Last Update**: 2025-09-11 00:55 by Claude

## 🧭 Status-Driven Navigation
- **✅ Completed**: 0 tasks
- **🔧 In Progress**: 0 tasks  
- **❌ Blocked/Missing**: 0 tasks
- **🐛 Bug Fixes**: 35 tasks

**Current Focus**: Phase 1.1 - Git backup creation
**Last Completed**: None yet

## Executive Summary
This task addresses 35+ QA issues identified across the Reboot Media website, including critical text readability problems, layout inconsistencies, and functionality issues. The most critical issue is a sitewide modal/popup with white text on white background making content completely unreadable. Issues span across Home, Contact, Marketing Psychology, Growth Plateau Solutions, Fractional CMO Guide, Privacy, and Terms pages.

## Methodology
Following LONG_RUNNING_TASK_METHODOLOGY with emphasis on:
- Parallel agent execution (up to 4 frontend-developer agents per message)
- Page-by-page approach to minimize CSS conflicts
- DRY principles and Tailwind utility classes over custom CSS
- Testing after each phase completion

## 📝 Document Update Instructions (EXECUTE DURING CONTEXT REFRESH)

### When you reach a 🧠 CONTEXT REFRESH task, complete these steps:

**ESSENTIAL UPDATES (Do these first):**
1. **Update Task Checklist**:
   - Find the task you just completed in the checklist
   - Change `[ ]` to `[x]` and add `(COMPLETED: YYYY-MM-DD HH:MM)`
   - If you encountered issues, add a note under the task

2. **Update Current State Variables**:
   - Go to "Current State Variables" section
   - Update `CURRENT_PHASE` to reflect where you are
   - Set boolean flags based on what's been completed
   - Update file locations if you created new files

3. **Update Progress Log**:
   - Go to "Progress Log" section
   - Add new entry with current date/time
   - Document: What was done, files modified, results, issues, next step

4. **Update Quick Stats** (at top of document):
   - Count completed vs total tasks for percentage
   - Update "Current Phase" 
   - Update "Last Update" with current timestamp
   - Note any new blockers

5. **Document Any Discoveries**:
   - If you found something unexpected, add to "Notes & Observations"
   - If you hit an error, add to "Error Recovery & Troubleshooting"
   - If you had to work around something, add to "Workarounds & Hacks"

### Status Markers to Use
- ✅ **COMPLETED** - Fully implemented and tested
- 🔧 **IN PROGRESS** - Currently being worked on
- ❌ **BLOCKED** - Cannot proceed due to issue
- ⏳ **PENDING** - Not yet started
- 🧪 **TESTING** - Implementation done, testing in progress

### Pre-Approved Commands (No permission needed)
```bash
# Development and testing
npm run dev
npm run build:dev
npm run deploy:dev
npm run test
npm run lint

# Git operations
git status
git diff
git add .
git commit -m "*"
git push
git checkout -b *

# File operations
cat /home/projects/reboot/**/*.tsx
cat /home/projects/reboot/**/*.css
grep -r "*" /home/projects/reboot/src/

# Process management
ps aux | grep node
pkill -f "vite"
lsof -ti:3000 | xargs kill -9

# Testing URLs
curl http://localhost:*/
curl https://dev.rebootmedia.net/reboot/*
```

## Task Checklist (UPDATE AFTER EACH STEP)

### Phase 1: Critical Sitewide Issues & Setup
- [x] 1.1 Create git backup branch (COMPLETED: 2025-09-11 00:50)
- [ ] 1.2 Fix modal/popup text color issue - replace undefined classes in LeadForm.tsx
- [ ] 🧠 CONTEXT REFRESH: Read /home/projects/reboot/REBOOT_QA_FIXES_TASK.md and execute section "📝 Document Update Instructions"
- [ ] 1.3 Test modal fix across all pages that trigger the popup
- [ ] 1.4 Deploy to dev environment for verification

### Phase 2: Home Page Fixes
- [ ] 2.1 Add drop shadow to hero heading/subheading (match "Fractional CMO Executive Services" style)
- [ ] 2.2 Adjust pricing blocks spacing - move down to prevent "MOST POPULAR" overlap
- [ ] 2.3 Reduce spacing between outer blocks and center GROWTH block
- [ ] 🧠 CONTEXT REFRESH: Read /home/projects/reboot/REBOOT_QA_FIXES_TASK.md and execute section "📝 Document Update Instructions"
- [ ] 2.4 Test home page changes in dev environment

### Phase 3: Contact Page Fixes
- [ ] 3.1 Fix "Looking for Marketing Help?" description text readability
- [ ] 3.2 Fix "Response Time" block text readability
- [ ] 3.3 Fix "Free Marketing Analysis" block text readability
- [ ] 🧠 CONTEXT REFRESH: Read /home/projects/reboot/REBOOT_QA_FIXES_TASK.md and execute section "📝 Document Update Instructions"
- [ ] 3.4 Fix contact form functionality issue
- [ ] 3.5 Test contact page in dev environment

### Phase 4: Marketing Psychology Pages Fixes
- [ ] 4.1 Update "What Unaware Customers Actually Say" section layout to match Solution-Aware page
- [ ] 4.2 Apply same layout changes to all Marketing Psychology subpages (except Product-Aware)
- [ ] 🧠 CONTEXT REFRESH: Read /home/projects/reboot/REBOOT_QA_FIXES_TASK.md and execute section "📝 Document Update Instructions"
- [ ] 4.3 Fix unreadable text in blocks (imgs 10-14) - ensure consistency across all pages
- [ ] 4.4 Test all Marketing Psychology pages

### Phase 5: Growth Plateau Solutions Fixes
- [ ] 5.1 Fix unreadable text in main page blocks - change to black text
- [ ] 5.2 Fix "Related Growth Plateau Solutions" blocks - change text to white
- [ ] 🧠 CONTEXT REFRESH: Read /home/projects/reboot/REBOOT_QA_FIXES_TASK.md and execute section "📝 Document Update Instructions"
- [ ] 5.3 Standardize block designs for consistency (Solution/Why This Works blocks)
- [ ] 5.4 Apply color pattern (Red/Yellow/Orange/Green/Blue) to all subpage blocks
- [ ] 5.5 Add thin grey outline to speech/thought bubble icons
- [ ] 🧠 CONTEXT REFRESH: Read /home/projects/reboot/REBOOT_QA_FIXES_TASK.md and execute section "📝 Document Update Instructions"
- [ ] 5.6 Test all Growth Plateau Solutions pages

### Phase 6: Fractional CMO Guide Fixes (Part 1)
- [ ] 6.1 Fix main heading center alignment and box backgrounds
- [ ] 6.2 Change grey halves to off-black in 7 blocks for better readability
- [ ] 6.3 Fix "Stop Making the $47,000 Mistake" title - black text, no shadow
- [ ] 🧠 CONTEXT REFRESH: Read /home/projects/reboot/REBOOT_QA_FIXES_TASK.md and execute section "📝 Document Update Instructions"
- [ ] 6.4 Standardize gradient order across all subpages
- [ ] 6.5 Fix "Related Transition Resources" text to white

### Phase 7: Fractional CMO Guide Fixes (Part 2)
- [ ] 7.1 Fix unreadable text in comparison sections across all subpages
- [ ] 7.2 Make CTA buttons more visible on dark backgrounds
- [ ] 🧠 CONTEXT REFRESH: Read /home/projects/reboot/REBOOT_QA_FIXES_TASK.md and execute section "📝 Document Update Instructions"
- [ ] 7.3 Fix specific readability issues in vs-full-time-cmo page
- [ ] 7.4 Fix 6 unreadable blocks in when-to-choose-each page
- [ ] 7.5 Remove white backgrounds causing readability issues

### Phase 8: Fractional CMO Guide Fixes (Part 3)
- [ ] 8.1 Fix color mismatches in cost-roi-analysis page
- [ ] 8.2 Standardize "The 'We Need Execution Help' Trap" section formatting
- [ ] 🧠 CONTEXT REFRESH: Read /home/projects/reboot/REBOOT_QA_FIXES_TASK.md and execute section "📝 Document Update Instructions"
- [ ] 8.3 Apply consistent block design with colored stripes and off-white backgrounds
- [ ] 8.4 Test all Fractional CMO pages

### Phase 9: Privacy & Terms Pages Fixes
- [ ] 9.1 Fix unreadable "Effective Date" text
- [ ] 9.2 Fix unreadable company address text
- [ ] 9.3 Make "contact form" link clearly visible as hyperlink
- [ ] 🧠 CONTEXT REFRESH: Read /home/projects/reboot/REBOOT_QA_FIXES_TASK.md and execute section "📝 Document Update Instructions"
- [ ] 9.4 Remove unnecessary white blocks causing readability issues
- [ ] 9.5 Fix "Unlock Growth Now" button functionality on Privacy/Terms pages

### Phase 10: Final Validation & Deployment
- [ ] 10.1 Run comprehensive test of all fixes in dev environment
- [ ] 10.2 Create detailed test report with screenshots
- [ ] 🧠 CONTEXT REFRESH: Read /home/projects/reboot/REBOOT_QA_FIXES_TASK.md and execute section "📝 Document Update Instructions"
- [ ] 10.3 Deploy to production if approved
- [ ] 10.4 Final verification on production site

## Current State Variables (UPDATE THESE)

```yaml
CURRENT_PHASE: "Phase 1 - Critical Sitewide Issues & Setup"
GIT_BACKUP_COMPLETE: true
MODAL_FIX_COMPLETE: false
HOME_PAGE_FIXES_COMPLETE: false
CONTACT_PAGE_FIXES_COMPLETE: false
MARKETING_PSYCHOLOGY_FIXES_COMPLETE: false
GROWTH_PLATEAU_FIXES_COMPLETE: false
FRACTIONAL_CMO_FIXES_COMPLETE: false
PRIVACY_TERMS_FIXES_COMPLETE: false
DEV_DEPLOYMENT_COMPLETE: false
PRODUCTION_DEPLOYMENT_COMPLETE: false

BLOCKER_ENCOUNTERED: false
BLOCKER_DESCRIPTION: ""

# File Locations (Update when modified)
LEADFORM_COMPONENT: "/home/projects/reboot/src/components/LeadForm.tsx"
ACCESSIBILITY_CSS: "/home/projects/reboot/src/styles/accessibility-utilities.css"
CONTACT_PAGE: "/home/projects/reboot/src/pages/Contact.tsx"
HOME_PAGE: "/home/projects/reboot/src/pages/Home.tsx"
```

## Implementation Details

### Critical Context
**Key Information**:
- Most critical issue: Modal/popup has white text on white background (sitewide)
- CSS classes `replace-text-slate-900` and `replace-text-slate-700` are undefined
- Need to follow DRY principles and use Tailwind utilities over custom CSS
- Testing via `npm run dev` and `npm run deploy:dev`
- Dev URL: https://dev.rebootmedia.net/reboot/
- Production URL: https://www.rebootmedia.net/

**Things That Must Not Change**:
- Core functionality of forms and navigation
- Existing working features
- Production deployment process

**Success Criteria**:
- All text is readable with proper contrast
- No overlapping elements
- Consistent design patterns across similar sections
- Forms function properly
- All fixes work across different browsers

### Agent Execution Strategy
- Use frontend-developer agents for implementation
- Group tasks by page to minimize CSS conflicts
- Execute up to 4 agents in parallel per message
- Each agent handles complete fix for their assigned area
- Test after each phase before proceeding

## Error Recovery & Troubleshooting

### Common Issues and Solutions

**If CSS conflicts occur**:
1. Check for !important declarations
2. Review specificity hierarchy
3. Consolidate to Tailwind utilities
4. Test in isolation first

**If text still unreadable after fix**:
1. Check parent container styles
2. Look for inherited styles
3. Verify no inline styles override
4. Use browser dev tools to debug

### Rollback Procedure
If something goes critically wrong:
1. `git checkout qa-fixes-backup-20250911-005054`
2. Preserve any successful fixes in separate files
3. Report specific failure points

## Progress Log

### 2025-09-11 00:55 - Initialization
- Task document created
- Initial structure established
- Git backup branch created: qa-fixes-backup-20250911-005054
- Analyzed all QA issues from /home/user-input/reboot-qa/
- Identified 35+ specific fixes needed
- Discovered root cause of modal issue: undefined CSS classes

### [Date/Time] - [UPDATE WITH EACH ACTION]
- **AI**: [AI identifier if available]
- **Action**: [What was done]
- **Files**: [Files created/modified]
- **Result**: [Outcome]
- **Issues**: [Any problems encountered]
- **Next Step**: [What should be done next]

## Results Tracking

### Expected vs Actual Results
```markdown
| Task | Expected | Actual | Status | Notes |
|------|----------|--------|--------|-------|
| Git backup | Branch created | qa-fixes-backup-20250911-005054 created | ✅ | Ready for fixes |
| Modal text fix | Black text visible | [Pending] | ⏳ | Root cause identified |
```

## Notes & Observations

### Hard-Fought Knowledge

#### CSS Class Discovery - 2025-09-11 00:55
**Problem**: Modal text unreadable (white on white)
**Investigation**: Found `replace-text-slate-900` and `replace-text-slate-700` classes in LeadForm.tsx
**Actual Finding**: These classes are not defined in any CSS file
**Solution**: Need to replace with standard Tailwind classes
**Key Insight**: Custom CSS classes without definitions cause text to default to inherit/transparent

### Patterns Discovered
- Multiple pages using undefined `replace-text-*` classes
- Accessibility utilities CSS exists but doesn't define needed classes
- Conflicting CSS has been an issue in past fixes

## References

- Methodology: This document follows LONG_RUNNING_TASK_METHODOLOGY
- Related Docs: /home/CLAUDE.md, /home/projects/reboot/CLAUDE.md
- QA Issues Source: /home/user-input/reboot-qa/reboot media qa v5.txt
- External Resources: Dev site - https://dev.rebootmedia.net/reboot/