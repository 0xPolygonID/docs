const fs = require('fs');
const path = require('path');
const glob = require('glob');

const docsPath = './docs';
const staticImgPath = './static';

function checkImageExists(imagePath) {
    const fullPath = path.join(staticImgPath, imagePath);
    if (!fs.existsSync(fullPath)) {
        console.log(`Image not found: ${fullPath}`);
        return false;
    }
    return true;
}

function validateImageLinks() {
    const files = glob.sync(`${docsPath}/**/*.+(md|mdx)`);

    const markdownImageRegex = /!\[.*?\]\((.*?)\)/g;
    const htmlImageRegex = /<img.*?src=(?:\{useBaseUrl\(["'](.+?)["']\)\}|["'](.+?)["']).*?>/g;

    files.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
    
        const matches = [...content.matchAll(markdownImageRegex), ...content.matchAll(htmlImageRegex)];
        
        matches.forEach(match => {
            const imagePath = match[1] || match[2];
            checkImageExists(imagePath.replace(/^\//, ''));
        });
    });

    console.log('Image link validation complete.');
}

validateImageLinks();
