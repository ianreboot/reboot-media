#!/bin/bash

echo "🧪 COMPREHENSIVE PRODUCTION SITE VERIFICATION"
echo "=============================================="

# Test 1: Basic connectivity and content
echo ""
echo "1️⃣  BASIC CONNECTIVITY TEST:"
echo "----------------------------"
response=$(curl -k -s -w "HTTP_CODE:%{http_code}\nTIME_TOTAL:%{time_total}\nSIZE_DOWNLOAD:%{size_download}\n" "https://www.rebootmedia.net/")
if [[ $response == *"HTTP_CODE:200"* ]]; then
    echo "✅ Site responds with HTTP 200"
    echo "$response" | grep -E "(TIME_TOTAL|SIZE_DOWNLOAD)"
else
    echo "❌ Site connectivity issue"
    echo "$response" | head -5
fi

# Test 2: Content verification
echo ""
echo "2️⃣  CONTENT VERIFICATION:"
echo "-------------------------"
content=$(curl -k -s "https://www.rebootmedia.net/")
title=$(echo "$content" | grep -o '<title>[^<]*</title>' | sed 's/<[^>]*>//g')
echo "Title: $title"

if [[ $title == *"Fractional CMO"* && $title == *"Reboot Media"* ]]; then
    echo "✅ Correct Reboot Media content"
else
    echo "❌ Wrong content or title missing"
fi

# Check for SyncUp contamination
syncup_count=$(echo "$content" | grep -ci "syncup\|time zone\|world clock")
echo "SyncUp contamination count: $syncup_count"
if [ $syncup_count -eq 0 ]; then
    echo "✅ No SyncUp contamination"
else
    echo "❌ SyncUp content detected"
fi

# Test 3: JavaScript asset loading
echo ""
echo "3️⃣  JAVASCRIPT ASSET VERIFICATION:"
echo "----------------------------------"
js_asset=$(echo "$content" | grep -o 'src="/assets/index\.prod-[^"]*\.js"' | head -1)
echo "Main JS asset: $js_asset"

if [[ $js_asset == *"C0JYlHiF"* ]]; then
    echo "✅ Correct optimized asset hash detected"
else
    echo "❌ Unexpected asset hash"
fi

# Test 4: Check for jsxDEV in the actual served JavaScript
echo ""
echo "4️⃣  JSX DEVELOPMENT FUNCTION CHECK:"
echo "-----------------------------------"
if [[ $js_asset ]]; then
    asset_url="https://www.rebootmedia.net${js_asset//\"/}"
    asset_url=${asset_url//src=/}
    echo "Testing asset: $asset_url"
    
    js_content=$(curl -k -s "$asset_url" | head -c 10000)  # First 10KB
    jsxdev_count=$(echo "$js_content" | grep -o "jsxDEV" | wc -l)
    
    echo "jsxDEV occurrences in first 10KB: $jsxdev_count"
    if [ $jsxdev_count -eq 0 ]; then
        echo "✅ No jsxDEV functions found - production build correct"
    else
        echo "❌ jsxDEV still present - build issue persists"
    fi
else
    echo "❌ Could not find JavaScript asset to test"
fi

# Test 5: React root element
echo ""
echo "5️⃣  REACT APPLICATION STRUCTURE:"
echo "--------------------------------"
if echo "$content" | grep -q '<div id="root"></div>'; then
    echo "✅ React root element present"
else
    echo "❌ React root element missing"
fi

# Test 6: Essential meta tags
echo ""
echo "6️⃣  ESSENTIAL META TAGS:"
echo "------------------------"
if echo "$content" | grep -q 'meta name="description"'; then
    echo "✅ Meta description present"
else
    echo "❌ Meta description missing"
fi

if echo "$content" | grep -q 'property="og:title"'; then
    echo "✅ Open Graph tags present"
else
    echo "❌ Open Graph tags missing"
fi

# Test 7: CSS loading
echo ""
echo "7️⃣  CSS ASSET VERIFICATION:"
echo "---------------------------"
css_assets=$(echo "$content" | grep -o 'href="/assets/[^"]*\.css"' | wc -l)
echo "CSS assets found: $css_assets"
if [ $css_assets -gt 0 ]; then
    echo "✅ CSS assets present"
else
    echo "❌ No CSS assets found"
fi

# Final summary
echo ""
echo "🎯 FINAL ASSESSMENT:"
echo "===================="
echo "Site URL: https://www.rebootmedia.net/"
echo "Content Check: $([ "$title" == *"Reboot Media"* ] && echo "✅ PASS" || echo "❌ FAIL")"
echo "Asset Check: $([ "$js_asset" == *"C0JYlHiF"* ] && echo "✅ PASS" || echo "❌ FAIL")"
echo "JSX Error Fix: $([ $jsxdev_count -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL")"
echo "Contamination: $([ $syncup_count -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL")"

if [[ "$title" == *"Reboot Media"* ]] && [[ $jsxdev_count -eq 0 ]] && [ $syncup_count -eq 0 ]; then
    echo ""
    echo "🎉 PRODUCTION SITE VERIFICATION: SUCCESS"
    echo "   The site is working correctly!"
else
    echo ""
    echo "❌ PRODUCTION SITE VERIFICATION: ISSUES DETECTED"
    echo "   Further investigation needed!"
fi