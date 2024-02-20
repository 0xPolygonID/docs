const fs = require("fs");
const path = require("path");
const glob = require("glob");

const docsPath = "./docs";
const staticImgPath = "./static";

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
  let allImagePaths = [];

  files.forEach((file) => {
    const content = fs.readFileSync(file, "utf8");

    const markdownImageRegex = /!\[.*?\]\((.*?)\)/g;
    const htmlImageRegex =
      /<img.*?\s+src\s*=\s*(?:\{useBaseUrl\(["'](.+?)["']\)\}|["'](.+?)["']).*?>/g;

    const markdownMatches = [...content.matchAll(markdownImageRegex)].map((match) => match[1]);
    const htmlMatches = [...content.matchAll(htmlImageRegex)].map((match) => match[1] || match[2]);

    allImagePaths = allImagePaths.concat(markdownMatches, htmlMatches);
  });

  // Deduplicate paths
  const uniqueImagePaths = [...new Set(allImagePaths)];

  uniqueImagePaths.forEach(checkImageExists);

  console.log("Image link validation complete.");
}

validateImageLinks();
