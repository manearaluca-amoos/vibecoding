#!/bin/bash

# Image Optimization Script for Amoos.ro
# This script optimizes images to reduce file sizes dramatically

echo "🖼️  Starting image optimization..."
echo "Current image sizes:"
ls -lh images/

# Create optimized directory
mkdir -p images/optimized

echo ""
echo "🔧 Starting optimization process..."

# Check if WebP tools are available
if command -v cwebp &> /dev/null; then
    echo "✅ WebP tools found - creating WebP versions..."
    
    # Convert to WebP with high quality (80% - good balance)
    cwebp -q 80 images/amoos-cursor-ai.png -o images/optimized/amoos-cursor-ai.webp
    cwebp -q 85 images/amoos-gold-bg-transparent.png -o images/optimized/amoos-gold-bg-transparent.webp
    cwebp -q 85 images/amoos-gold-COMPLET-bg-transparent.png -o images/optimized/amoos-gold-COMPLET-bg-transparent.webp
    
    echo "✅ WebP conversion completed!"
else
    echo "⚠️  WebP tools not found. Install with:"
    echo "   macOS: brew install webp"
    echo "   Ubuntu: sudo apt install webp"
fi

# PNG optimization using built-in tools
echo ""
echo "🗜️  Optimizing PNG files..."

# Check if ImageMagick is available
if command -v magick &> /dev/null || command -v convert &> /dev/null; then
    echo "✅ ImageMagick found - optimizing PNGs..."
    
    # Use ImageMagick to compress PNGs
    magick images/amoos-cursor-ai.png -strip -quality 85 -define png:compression-level=9 images/optimized/amoos-cursor-ai-optimized.png 2>/dev/null || \
    convert images/amoos-cursor-ai.png -strip -quality 85 -define png:compression-level=9 images/optimized/amoos-cursor-ai-optimized.png
    
    magick images/amoos-gold-bg-transparent.png -strip -quality 90 -define png:compression-level=9 images/optimized/amoos-gold-bg-transparent-optimized.png 2>/dev/null || \
    convert images/amoos-gold-bg-transparent.png -strip -quality 90 -define png:compression-level=9 images/optimized/amoos-gold-bg-transparent-optimized.png
    
    magick images/amoos-gold-COMPLET-bg-transparent.png -strip -quality 90 -define png:compression-level=9 images/optimized/amoos-gold-COMPLET-bg-transparent-optimized.png 2>/dev/null || \
    convert images/amoos-gold-COMPLET-bg-transparent.png -strip -quality 90 -define png:compression-level=9 images/optimized/amoos-gold-COMPLET-bg-transparent-optimized.png
    
    echo "✅ PNG optimization completed!"
else
    echo "⚠️  ImageMagick not found. Install with:"
    echo "   macOS: brew install imagemagick"
    echo "   Ubuntu: sudo apt install imagemagick"
fi

echo ""
echo "📊 Optimization Results:"
echo "=========================="

# Original sizes
echo "Original sizes:"
echo "$(ls -lh images/*.png | awk '{print $9, $5}')"

echo ""
echo "Optimized sizes:"
if [ -d "images/optimized" ]; then
    echo "$(ls -lh images/optimized/* 2>/dev/null | awk '{print $9, $5}' | sed 's|images/optimized/||g')"
fi

echo ""
echo "🎯 To use optimized images in your HTML:"
echo "Replace image src attributes with the optimized versions"
echo "Use WebP format with PNG fallback for maximum compression"

echo ""
echo "📝 Example HTML for responsive images:"
cat << 'EOF'
<picture>
  <source srcset="images/optimized/amoos-cursor-ai.webp" type="image/webp">
  <img src="images/optimized/amoos-cursor-ai-optimized.png" 
       alt="Amoos Cursor AI" 
       loading="lazy"
       width="800" 
       height="600">
</picture>
EOF

echo ""
echo "✅ Image optimization completed!"
echo "💡 Tip: Use the WebP images for modern browsers and PNG as fallback" 