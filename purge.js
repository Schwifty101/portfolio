const fs = require('fs');
const path = require('path');

const files = [
  "components/Footer.tsx",
  "components/ui/carousel.tsx",
  "components/ui/dialog.tsx",
  "components/ui/radio-group.tsx",
  "components/ui/switch.tsx",
  "components/ui/avatar.tsx",
  "components/ui/badge.tsx",
  "components/ui/sidebar.tsx",
  "components/ui/alert.tsx",
  "components/ui/drawer.tsx",
  "components/ui/progress.tsx",
  "components/ui/scroll-area.tsx",
  "components/ui/chart.tsx",
  "components/ui/slider.tsx",
  "components/ui/alert-dialog.tsx",
  "components/ui/card.tsx"
];

files.forEach(file => {
  const filepath = path.join('/Users/sobanahmad/portfolio-project', file);
  if (fs.existsSync(filepath)) {
      let content = fs.readFileSync(filepath, 'utf8');
      content = content.replace(/rounded-full/g, 'rounded-none');
      content = content.replace(/rounded-2xl/g, 'rounded-none');
      content = content.replace(/rounded-xl/g, 'rounded-none');
      content = content.replace(/rounded-lg/g, 'rounded-none');
      content = content.replace(/bg-gray-50\b/g, 'bg-[#0a0a0a]');
      content = content.replace(/bg-gray-100\b/g, 'bg-[#0a0a0a]');
      content = content.replace(/text-green-400\b/g, 'text-[#c8f060]');
      content = content.replace(/text-green-500\b/g, 'text-[#c8f060]');
      content = content.replace(/bg-green-500\b/g, 'bg-[#c8f060]');
      content = content.replace(/backdrop-blur(-\w+)?\b/g, '');
      content = content.replace(/text-gray-900\b/g, 'text-[#f0f0ea]');
      content = content.replace(/#3b82f6/g, '#c8f060');
      // Clean up double spaces caused by empty backdrop-blur
      content = content.replace(/  +/g, ' '); 
      fs.writeFileSync(filepath, content);
  }
});
console.log('Shadcn UI classes purged.');
