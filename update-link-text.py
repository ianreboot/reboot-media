#!/usr/bin/env python3
"""
Update generic link text to psychology-driven, SEO-optimized anchor text
"""

import re
import os

# Define replacements for each page
replacements = {
    'TransitionStrategies.tsx': [
        ('Choose Your Marketing Model', 'Escape Your 82% Reactive Switch Trap'),
        ('Compare vs Agency & In-House', 'Stop 6-Month Transition Loss')
    ],
    'FractionalCMOVsInHouse.tsx': [
        ('Calculate Your 2.5x Hidden Costs', 'Avoid $180K Hidden Team Costs'),
        ('Compare vs Full-Time & Consultant', 'See Why 43% Teams Quit')
    ],
    'FractionalCMOVsConsultant.tsx': [
        ('Compare vs Agency & In-House', 'Escape 87% Implementation Failure')
    ],
    'FractionalCMOVsFullTime.tsx': [
        ('See Why Full-Time Costs $436K/Year', 'Reveal True $436K/Year Cost'),
        ('Compare vs Full-Time & Consultant', 'Avoid 71% Status Hiring Trap')
    ],
    'FractionalCMOVsAgency.tsx': [
        ('Compare vs Full-Time & Consultant', 'Who Owns Failed Results?')
    ]
}

# Process each file
for filename, link_updates in replacements.items():
    filepath = f'/home/ian/projects/reboot/src/pages/{filename}'
    
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            content = f.read()
        
        # Apply replacements
        for old_text, new_text in link_updates:
            # Match the pattern in Link components
            pattern = f'>{re.escape(old_text)}</Link>'
            replacement = f'>{new_text}</Link>'
            content = re.sub(pattern, replacement, content)
        
        # Write back
        with open(filepath, 'w') as f:
            f.write(content)
        
        print(f"✅ Updated {filename}")
    else:
        print(f"⚠️ File not found: {filename}")

print("\n🎯 Link text optimization complete!")