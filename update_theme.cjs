const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.css') && !file.includes('global.css')) { 
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Swap gold with red for most UI elements
  content = content.replace(/var\(--gold\)/g, 'var(--red)');
  content = content.replace(/var\(--gold-light\)/g, 'var(--red-light)');
  content = content.replace(/var\(--gold-dark\)/g, 'var(--red-dark)');
  content = content.replace(/var\(--gold-subtle\)/g, 'var(--red-subtle)');
  
  // Specific overrides: keep stars gold
  if (file.includes('Reviews.module.css')) {
    content = content.replace(/color: var\(--red\); \/\* stars \*\//g, 'color: var(--gold);');
    // Let's just fix Reviews stars specifically
    content = content.replace(/\.stars \{\n  color: var\(--red\);/g, '.stars {\n  color: var(--gold);');
  }
  
  fs.writeFileSync(file, content, 'utf8');
});

console.log('Replaced gold with red in CSS modules.');
