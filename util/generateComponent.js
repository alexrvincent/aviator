var minimist = require('minimist');
var fs = require('fs');
// generateComponent()
// Creates an index.js, .tsx, .test.tsx, and .scss file for a given name with some boilerplate code.
// Usage: yarn run generate-component --name "MyNewComponent"
// Usage (shortcut): yarn gc --n "MyNewComponent"
var generateComponent = function (name) {
  // Attempt to generate the new component folder
  var filePath = './src/components';
  var newFolderPath = ''.concat(filePath, '/').concat(name);
  if (!fs.existsSync(newFolderPath)) {
    // A. Generate the component folder
    fs.mkdirSync(newFolderPath);
    // B. Generate the index file in the new folder
    fs.closeSync(fs.openSync(''.concat(filePath, '/').concat(name, '/index.js'), 'w'));
    fs.writeFile(
      ''.concat(filePath, '/').concat(name, '/index.js'),
      'import '
        .concat(name, " from './")
        .concat(name, "';\nimport './")
        .concat(name, ".scss';\nexport default ")
        .concat(name, ';\n'),
      'utf-8',
      function (e) {
        if (e) {
          console.log('\x1b[31m', '\u274C Error: '.concat(e));
        }
      },
    );
    // C. Generate the .tsx file in the new folder
    fs.closeSync(fs.openSync(''.concat(filePath, '/').concat(name, '/').concat(name, '.tsx'), 'w'));
    fs.writeFile(
      ''.concat(filePath, '/').concat(name, '/').concat(name, '.tsx'),
      "import React from 'react';\n\nconst "
        .concat(name, ': React.FC = (props) => {\n  return <div className="')
        .concat(name.toLowerCase(), '">{props.children}</div>;\n};\n\nexport default ')
        .concat(name, ';\n'),
      'utf-8',
      function (e) {
        if (e) {
          console.log('\x1b[31m', '\u274C Error: '.concat(e));
        }
      },
    );
    // D. Generate the scss file in the new folder
    fs.closeSync(fs.openSync(''.concat(filePath, '/').concat(name, '/').concat(name, '.scss'), 'w'));
    fs.writeFile(
      ''.concat(filePath, '/').concat(name, '/').concat(name, '.scss'),
      '.'.concat(name.toLowerCase(), ' { \n  white-space: normal;\n}'),
      'utf-8',
      function (e) {
        if (e) {
          console.log('\x1b[31m', '\u274C Error: '.concat(e));
        }
      },
    );
    // E. Generate the test file in the new folder
    fs.closeSync(fs.openSync(''.concat(filePath, '/').concat(name, '/').concat(name, '.test.tsx'), 'w'));
    console.log(
      '\x1b[32m',
      "\u2714\uFE0F  Done! Your component '".concat(name, "' is now available under src/components/").concat(name, '.'),
    );
    // If the folder exists, error out
  } else {
    console.log(
      '\x1b[31m',
      "\u274C Error: '".concat(name, "' is already a generated component. Try a different name!"),
    );
  }
  console.log('\x1b[37m', 'Finished generating component.');
};
// Run the script
// 1. Let the user know this script is attempting to run:
console.log('🏭 Attempting to build your component ...');
// 2. Specify how you would like to parse the command line arguments
var minimistOptions = {
  alias: {
    n: 'name',
  },
};
// 3. Parse the command line arguments using minimist
// Note argv._ contains all arguments without options associated with them
var argv = minimist(process.argv.slice(2), minimistOptions);
var newComponentName = argv.name;
if (newComponentName !== undefined) {
  generateComponent(newComponentName);
} else {
  console.log('\x1b[31m', "❌ Error: No component name specified. Have you tried using --name 'ComponentName'?");
}
