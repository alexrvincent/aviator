const minimist = require('minimist');
const fs = require('fs');

// generateHook()

// Creates an index.js, .ts file for a given name with some boilerplate code.

// Usage: yarn run gh --name "MyNewHook"
const generateHook = (name) => {
  // Attempt to generate the new hook folder
  const filePath = './src/hooks';
  const newFolderPath = `${filePath}/${name}`;
  if (!fs.existsSync(newFolderPath)) {
    // A. Generate the hook folder
    fs.mkdirSync(newFolderPath);

    // B. Generate the index file in the new folder
    fs.closeSync(fs.openSync(`${filePath}/${name}/index.js`, 'w'));
    fs.writeFile(
      `${filePath}/${name}/index.js`,
      `import ${name} from './${name}';\nexport default ${name};\n`,
      'utf-8',
      (e) => {
        if (e) {
          console.log('\x1b[31m', `❌ Error: ${e}`);
        }
      },
    );

    // C. Generate the .tsx file in the new folder
    fs.closeSync(fs.openSync(`${filePath}/${name}/${name}.ts`, 'w'));
    fs.writeFile(
      `${filePath}/${name}/${name}.ts`,
      `import { useState, useEffect } from 'react';\n\nfunction ${name}(): string {\n  const [myState] = useState('${name}');\n  useEffect(() => {\n    console.log('Add details here');\n  }, []);\n  return myState;\n}\n\nexport default ${name};\n`,
      'utf-8',
      (e) => {
        if (e) {
          console.log('\x1b[31m', `❌ Error: ${e}`);
        }
      },
    );

    console.log('\x1b[32m', `✔️  Done! Your hook '${name}' is now available under src/hooks/${name}.`);

    // If the folder exists, error out
  } else {
    console.log('\x1b[31m', `❌ Error: '${name}' is already a generated hook. Try a different name!`);
  }
  console.log('\x1b[37m', 'Finished generating hook.');
};

// Run the script

// 1. Let the user know this script is attempting to run:
console.log('🏭 Attempting to build your hook ...');

// 2. Specify how you would like to parse the command line arguments
const minimistOptions = {
  alias: {
    n: 'name',
  },
};

// 3. Parse the command line arguments using minimist
// Note argv._ contains all arguments without options associated with them
const argv = minimist(process.argv.slice(2), minimistOptions);
const newHookName = argv.name;

if (newHookName !== undefined) {
  generateHook(newHookName);
} else {
  console.log('\x1b[31m', "❌ Error: No hook name specified. Have you tried using --name 'HookName'?");
}