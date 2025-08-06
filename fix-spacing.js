import { readFile, writeFile } from 'fs/promises';

async function fixSpacing() {
  const filePath = './src/App.tsx';
  let content = await readFile(filePath, 'utf8');
  
  // Fix nav spacing and make it more prominent
  content = content.replace(
    'fixed top-8 left-1/2 transform -translate-x-1/2 z-50',
    'fixed top-4 left-1/2 transform -translate-x-1/2 z-50'
  );
  
  content = content.replace(
    'bg-stone-900/95 backdrop-blur-xl border border-stone-700/50 rounded-full px-8 py-4',
    'bg-stone-950 backdrop-blur-xl border border-stone-700/50 rounded-full px-6 py-3'
  );
  
  // Add padding to hero to avoid nav overlap
  content = content.replace(
    'relative min-h-screen flex items-center justify-center overflow-hidden">',
    'relative min-h-screen flex items-center justify-center overflow-hidden pt-20">'
  );
  
  // Reduce excessive spacing
  content = content.replace(/py-32/g, 'py-20');
  content = content.replace(/mb-20/g, 'mb-12');
  content = content.replace(/mb-12/g, 'mb-8');
  content = content.replace(/mb-8(?!\")/g, 'mb-6');
  content = content.replace(/gap-8/g, 'gap-6');
  content = content.replace(/mt-16/g, 'mt-12');
  
  // Fix text sizes
  content = content.replace(/text-6xl md:text-8xl/g, 'text-5xl md:text-7xl');
  content = content.replace(/text-5xl md:text-6xl/g, 'text-4xl md:text-5xl');
  content = content.replace(/text-xl md:text-2xl/g, 'text-lg md:text-xl');
  content = content.replace(/leading-relaxed/g, 'leading-normal');
  
  // Fix button to be a link
  content = content.replace(
    '<button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">\n              Get Results\n            </button>',
    '<a href="#contact" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg inline-block">\n              Get Results\n            </a>'
  );
  
  // Fix service card spacing
  content = content.replace(/p-10/g, 'p-8');
  content = content.replace(/p-12/g, 'p-8');
  
  // Fix mobile spacing
  content = content.replace(/px-10 py-4/g, 'px-8 py-3');
  
  await writeFile(filePath, content, 'utf8');
  console.log('Fixed spacing issues');
}

fixSpacing();