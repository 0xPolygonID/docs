const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "../");
const staticDir = path.join(__dirname, "../static");
const docsDir = path.join(__dirname, "../docs");
const srcDir = path.join(__dirname, "../src");

function readFiles(directory, fileList = []) {
  const files = fs.readdirSync(directory);
  files.forEach((file) => {
    const filePath = path.join(directory, file);
    if (!fs.statSync(filePath).isDirectory()) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

function readFilesRecursively(directory, fileList = []) {
  const files = fs.readdirSync(directory);
  files.forEach((file) => {
    const filePath = path.join(directory, file);
    if (fs.statSync(filePath).isDirectory()) {
      readFilesRecursively(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

function isImageUsedInFile(imagePath, fileContent) {
  return fileContent.includes(path.basename(imagePath));
}

function removeFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error removing file: ${filePath}`, err);
      return;
    }
    console.log(`Removed: ${filePath}`);
  });
}

function findUnusedImages(remove = false) {
  const allImages = readFilesRecursively(staticDir).filter((file) =>
    file.match(/\.(jpg|jpeg|png|gif|svg|mp4)$/)
  );
  const root = readFiles(rootDir).filter((file) => file.match(/\.(md|js)$/));
  const allDocs = readFilesRecursively(docsDir).filter((file) => file.match(/\.(md|mdx)$/));
  const allSrc = readFilesRecursively(srcDir).filter((file) => file.match(/\.(js|css|scss)$/));

  let unusedImages = [...allImages];

  [...root, ...allDocs, ...allSrc].forEach((doc) => {
    const content = fs.readFileSync(doc, "utf8");
    allImages.forEach((image) => {
      if (isImageUsedInFile(image, content)) {
        unusedImages = unusedImages.filter((unusedImage) => unusedImage !== image);
      }
    });
  });

  console.dir(unusedImages, { maxArrayLength: null });
  console.log(unusedImages.length, "unused images found");

  if (remove) {
    unusedImages.forEach((imagePath) => {
      removeFile(imagePath);
    });
  }
}

findUnusedImages(false);
