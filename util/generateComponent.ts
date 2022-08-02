const minimist = require('minimist');
const fs = require('fs');

// generateComponent()
const generateComponent = (name: string) => {
  // Attempt to generate the new component folder
  const filePath = './src/components';
  const newFolderPath = `${filePath}/${name}`;
  if (!fs.existsSync(newFolderPath)) {
    // A. Generate the component folder
    fs.mkdirSync(newFolderPath);

    // B. Generate the index file in the new folder
    fs.closeSync(fs.openSync(`${filePath}/${name}/index.js`, 'w'));
    fs.writeFile(
      `${filePath}/${name}/index.js`,
      `import ${name} from './${name}';\nimport './${name}.scss';\nexport default ${name};\n`,
      'utf-8',
      (e) => {
        if (e) {
          console.log('\x1b[31m', `❌ Error: ${e}`);
        }
      },
    );

    // C. Generate the .tsx file in the new folder
    fs.closeSync(fs.openSync(`${filePath}/${name}/${name}.tsx`, 'w'));
    fs.writeFile(
      `${filePath}/${name}/${name}.tsx`,
      `import React from 'react';\n\nconst ${name}: React.FC = (props) => {\n  return <div className="${name.toLowerCase()}">{props.children}</div>;\n};\n\nexport default ${name};\n`,
      'utf-8',
      (e) => {
        if (e) {
          console.log('\x1b[31m', `❌ Error: ${e}`);
        }
      },
    );

    // D. Generate the scss file in the new folder
    fs.closeSync(fs.openSync(`${filePath}/${name}/${name}.scss`, 'w'));
    fs.writeFile(
      `${filePath}/${name}/${name}.scss`,
      `.${name.toLowerCase()} { \n  white-space: normal;\n}`,
      'utf-8',
      (e) => {
        if (e) {
          console.log('\x1b[31m', `❌ Error: ${e}`);
        }
      },
    );

    // E. Generate the test file in the new folder
    fs.closeSync(fs.openSync(`${filePath}/${name}/${name}.test.tsx`, 'w'));

    console.log('\x1b[32m', `✔️  Done! Your component '${name}' is now available under src/components/${name}.`);

    // If the folder exists, error out
  } else {
    console.log('\x1b[31m', `❌ Error: '${name}' is already a generated component. Try a different name!`);
  }
  console.log('\x1b[37m', 'Finished generating component.');
};

// Run the script

// 1. Let the user know this script is attempting to run:
console.log('🏭 Attempting to build your component ...');

// 2. Specify how you would like to parse the command line arguments
const minimistOptions = {
  alias: {
    n: 'name',
  },
};

// 3. Parse the command line arguments using minimist
// Note argv._ contains all arguments without options associated with them
const argv = minimist(process.argv.slice(2), minimistOptions);
const newComponentName = argv.name;

if (newComponentName !== undefined) {
  generateComponent(newComponentName);
} else {
  console.log('\x1b[31m', "❌ Error: No component name specified. Have you tried using --name 'ComponentName'?");
}
