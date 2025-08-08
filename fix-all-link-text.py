#!/usr/bin/env python3
"""
Fix ALL generic link text across Growth Plateau and other pages
"""

import re
import os

# Define replacements for Growth Plateau sub-pages
growth_plateau_pages = [
    'RevenueCeilingBreakthrough.tsx',
    'CustomerAcquisitionStall.tsx', 
    'MarketExpansionBarriers.tsx',
    'OperationalScalingCrisis.tsx',
    'TeamGrowthBottlenecks.tsx',
    'ProductMarketFitErosion.tsx',
    'CompetitivePressurePlateau.tsx'
]

# Update "See All Plateau Types" in all Growth Plateau sub-pages
for page in growth_plateau_pages:
    filepath = f'/home/ian/projects/reboot/src/pages/{page}'
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            content = f.read()
        
        # Replace generic "See All Plateau Types"
        content = content.replace(
            '>See All Plateau Types</Link>',
            '>Escape Your 67% Plateau Prison</Link>'
        )
        
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"✅ Updated {page}")

# Fix the main Growth Plateau page - need to update each link individually
growth_plateau_main = '/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx'
if os.path.exists(growth_plateau_main):
    with open(growth_plateau_main, 'r') as f:
        lines = f.readlines()
    
    # Map plateau titles to psychology-driven CTAs
    plateau_ctas = {
        'Revenue Ceiling Breakthrough': 'Break Your $1M Glass Ceiling →',
        'Customer Acquisition Stall': 'Fix Your $8K CAC Disaster →',
        'Market Expansion Barriers': 'Escape Geographic Revenue Trap →',
        'Operational Scaling Crisis': 'Stop 47% Margin Evaporation →',
        'Team Growth Bottlenecks': 'Fix Your 67% Hiring Failure →',
        'Product-Market Fit Erosion': 'Recapture Lost 40% Retention →',
        'Competitive Pressure Plateau': 'Beat Price War Death Spiral →'
    }
    
    # Simple replacement - change the generic text
    content = ''.join(lines)
    content = content.replace(
        'See 5-7 Real Examples →',
        'Discover Your Breakthrough →'
    )
    
    with open(growth_plateau_main, 'w') as f:
        f.write(content)
    print(f"✅ Updated GrowthPlateauSolutions.tsx")

# Also check for any remaining generic CTAs in related resource sections
related_fixes = {
    'GrowthPlateauSolutions.tsx': [
        ('Learn the fundamentals', 'Master $47K/Month Psychology'),
        ('Find your solution', 'Get Your CMO vs Agency Answer')
    ]
}

for page, fixes in related_fixes.items():
    filepath = f'/home/ian/projects/reboot/src/pages/{page}'
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            content = f.read()
        
        for old_text, new_text in fixes:
            content = content.replace(old_text, new_text)
        
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"✅ Enhanced CTAs in {page}")

print("\n🎯 All link text optimization complete!")