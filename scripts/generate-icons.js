const fs = require('fs');
const path = require('path');

// SVG template for the icon
const createSVG = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#gradient)"/>
  <text x="${size / 2}" y="${size * 0.62}" font-family="Arial, sans-serif" font-size="${size * 0.4}" font-weight="bold" fill="white" text-anchor="middle">
    M
  </text>
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0A1628;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1E3A5F;stop-opacity:1" />
    </linearGradient>
  </defs>
</svg>
`;

// Generate SVG files
const sizes = [192, 384, 512];
sizes.forEach(size => {
  const svg = createSVG(size);
  const filename = path.join(__dirname, '..', 'public', `icon-${size}x${size}.svg`);
  fs.writeFileSync(filename, svg.trim());
  console.log(`Generated ${filename}`);
});

console.log('Icon generation complete! Use an online converter to create PNG versions if needed.');