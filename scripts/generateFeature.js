const minimist = require('minimist');
const fs = require('fs');

// generateFeature()

// Creates an index.js, .tsx, .test.tsx, and .scss file for a given name with some boilerplate code.

// Usage: yarn run generate-feature --name "MyNewFeature"
// Usage (shortcut): yarn gf --n "MyNewFeature"
const generateFeature = (name, component) => {
  // Attempt to generate the new Feature folder
  const filePath = './src/features';
  const newFolderPath = `${filePath}/${name}`;

  if (!fs.existsSync(newFolderPath)) {
    // A. Generate the Feature folder
    fs.mkdirSync(newFolderPath);

    // B. Optional - Generate a basic feature component
    if (component) {
      const newFolderComponentPath = `${filePath}/${name}/${component}`;
      // B1. Generate the Feature Component Folder
      fs.mkdirSync(newFolderComponentPath);

      // B. Generate the index file in the new folder
      fs.closeSync(fs.openSync(`${filePath}/${name}/${component}/index.js`, 'w'));
      fs.writeFile(
        `${filePath}/${name}/${component}/index.js`,
        `import ${component} from './${component}';\nimport './${component}.scss';\nexport default ${component};\n`,
        'utf-8',
        (e) => {
          if (e) {
            console.log('\x1b[31m', `❌ Error: ${e}`);
          }
        },
      );

      // C. Generate the .tsx file in the new folder
      fs.closeSync(fs.openSync(`${filePath}/${name}/${component}/${component}.tsx`, 'w'));
      fs.writeFile(
        `${filePath}/${name}/${component}/${component}.tsx`,
        `import React from 'react';\n\nconst ${component}: React.FC = (props) => {\n  return <div className="${component.toLowerCase()}">{props.children}</div>;\n};\n\nexport default ${component};\n`,
        'utf-8',
        (e) => {
          if (e) {
            console.log('\x1b[31m', `❌ Error: ${e}`);
          }
        },
      );

      // D. Generate the scss file in the new folder
      fs.closeSync(fs.openSync(`${filePath}/${name}/${component}/${component}.scss`, 'w'));
      fs.writeFile(
        `${filePath}/${name}/${component}/${component}.scss`,
        `.${component.toLowerCase()} { \n  white-space: normal;\n}`,
        'utf-8',
        (e) => {
          if (e) {
            console.log('\x1b[31m', `❌ Error: ${e}`);
          }
        },
      );

      // E. Generate the test file in the new folder
      fs.closeSync(fs.openSync(`${filePath}/${name}/${component}/${component}.test.tsx`, 'w'));
      fs.writeFile(
        `${filePath}/${name}/${component}/${component}.test.tsx`,
        `import React from 'react';\nimport { render, screen } from '@testing-library/react';\nimport ${component} from 'Features/${name}/${component}';\n\ndescribe('<${component} />', () => {\n  it('should render the Feature normally', () => {\n    const props = { children: ['${component}'] };\n    render(<${component} {...props} />);\n    expect(screen.getByText('${component}')).toBeInTheDocument;\n  });\n});\n`,
        'utf-8',
        (e) => {
          if (e) {
            console.log('\x1b[31m', `❌ Error: ${e}`);
          }
        },
      );

      // F. Generate a storybook story in the new folder
      fs.closeSync(fs.openSync(`${filePath}/${name}/${component}/${component}.stories.tsx`, 'w'));
      fs.writeFile(
        `${filePath}/${name}/${component}/${component}.stories.tsx`,
        `import { Meta } from '@storybook/react';\n\nimport ${component} from './${component}';\nimport './${component}.scss';\n\nexport default {\n  component: ${component},\n  argTypes: {\n    children: { control: 'text' },\n  },\n} as Meta;\n\nexport const Primary = {\n  args: {\n    children: 'children',\n  },\n};\n`,
        'utf-8',
        (e) => {
          if (e) {
            console.log('\x1b[31m', `❌ Error: ${e}`);
          }
        },
      );

      console.log(
        '\x1b[32m',
        `✔️  Done! Your Feature Component '${component}' is now available under src/Features/${name}/${component}.`,
      );
    }

    console.log('\x1b[32m', `✔️  Done! Your Feature '${name}' is now available under src/Features/${name}.`);

    // If the folder exists, error out
  } else {
    console.log('\x1b[31m', `❌ Error: '${name}' is already a Feature. Try a different name!`);
  }
  console.log('\x1b[37m', 'Finished generating Feature.');
};

// Run the script

// 1. Let the user know this script is attempting to run:
console.log('🏭 Attempting to build your Feature ...');

// 2. Specify how you would like to parse the command line arguments
const minimistOptions = {
  alias: {
    n: 'name',
    c: 'component',
  },
};

// 3. Parse the command line arguments using minimist
// Note argv._ contains all arguments without options associated with them
const argv = minimist(process.argv.slice(2), minimistOptions);
const { name, component } = argv;

if (name !== undefined) {
  generateFeature(name, component);
} else {
  console.log('\x1b[31m', "❌ Error: No Feature name specified. Have you tried using --name 'FeatureName'?");
}
