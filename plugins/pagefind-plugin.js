const path = require('path');
const { execSync } = require('child_process');

module.exports = function(context, options) {
  return {
    name: 'pagefind-plugin',
    async postBuild({ siteDir, routesPaths, outDir }) {
      try {
        console.log('Building Pagefind index...');
        
        execSync(`npx pagefind --site "${outDir}" --output-path "${outDir}/pagefind"`, {
          stdio: 'inherit',
          cwd: siteDir,
        });
        
        console.log('Pagefind index built successfully!');
      } catch (error) {
        console.error('Error building Pagefind index:', error);
        throw error;
      }
    },
  };
};
