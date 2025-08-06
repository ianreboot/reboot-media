import { readFile, writeFile } from 'fs/promises';

async function fixMobile() {
  const filePath = './src/App.tsx';
  let content = await readFile(filePath, 'utf8');
  
  // Fix nav for mobile
  content = content.replace(
    'fixed top-4 left-1/2 transform -translate-x-1/2 z-50',
    'fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-auto max-w-4xl'
  );
  
  content = content.replace(
    'bg-stone-950 backdrop-blur-xl border border-stone-700/50 rounded-full px-6 py-3',
    'bg-stone-950 backdrop-blur-xl border border-stone-700/50 rounded-full px-4 sm:px-6 py-2 sm:py-3'
  );
  
  content = content.replace(
    '<div className="flex items-center space-x-8">',
    '<div className="flex items-center justify-between sm:space-x-8">'
  );
  
  // Hide REBOOT text on mobile
  content = content.replace(
    '<div className="text-xl font-black text-white tracking-wider">REBOOT</div>',
    '<div className="text-lg sm:text-xl font-black text-white tracking-wider hidden sm:block">REBOOT</div>'
  );
  
  // Fix mobile font sizes
  content = content.replace(
    'text-5xl md:text-7xl',
    'text-4xl sm:text-5xl md:text-7xl'
  );
  
  content = content.replace(
    'text-4xl md:text-5xl',
    'text-3xl sm:text-4xl md:text-5xl'
  );
  
  content = content.replace(
    'text-lg md:text-xl',
    'text-base sm:text-lg md:text-xl'
  );
  
  // Fix mobile buttons
  content = content.replace(
    /px-8 py-3 rounded-lg font-bold text-lg/g,
    'px-6 sm:px-8 py-3 rounded-lg font-bold text-base sm:text-lg'
  );
  
  // Add width for mobile buttons
  content = content.replace(
    'font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">',
    'font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl w-full sm:w-auto">'
  );
  
  content = content.replace(
    'font-bold text-base sm:text-lg transition-all duration-300">',
    'font-bold text-base sm:text-lg transition-all duration-300 w-full sm:w-auto">'
  );
  
  // Fix section padding for mobile
  content = content.replace(/py-20/g, 'py-12 sm:py-20');
  content = content.replace(/mb-8/g, 'mb-6 sm:mb-8');
  content = content.replace(/gap-6/g, 'gap-4 sm:gap-6');
  content = content.replace(/mt-12/g, 'mt-8 sm:mt-12');
  
  // Fix mobile navigation menu
  content = content.replace(
    '<a href="#contact" className="bg-orange-500',
    '<a href="#contact" className="bg-orange-500 text-sm sm:text-base'
  );
  
  // Fix padding for content
  content = content.replace(/p-8/g, 'p-6 sm:p-8');
  
  await writeFile(filePath, content, 'utf8');
  console.log('Fixed mobile responsive issues');
}

fixMobile();