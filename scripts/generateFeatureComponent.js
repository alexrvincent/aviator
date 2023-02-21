const minimist = require('minimist');
const fs = require('fs');

// generateFeatureComponent()

// Creates an index.js, .tsx, .test.tsx, and .scss file for a given name with some boilerplate code.

// Usage: yarn run generate-featureComponent --feature "FeatureName" --name "MyNewFeatureComponent"
// Usage (shortcut): yarn gfc --f "FeatureName" --n "MyNewFeatureComponent"
const generateFeatureComponent = (name, feature) => {
  // Attempt to generate the new FeatureComponent folder
  const filePath = './src/features';
  const featurePath = `${filePath}/${feature}`;
  const newFolderPath = `${featurePath}/${name}`;
  if (!fs.existsSync(newFolderPath)) {
    // A. Generate the feature component folder
    fs.mkdirSync(newFolderPath);

    // B. Generate the index file in the new folder
    fs.closeSync(fs.openSync(`${newFolderPath}/index.js`, 'w'));
    fs.writeFile(
      `${newFolderPath}/index.js`,
      `import ${name} from './${name}';\nimport './${name}.scss';\nexport default ${name};\n`,
      'utf-8',
      (e) => {
        if (e) {
          console.log('\x1b[31m', `❌ Error: ${e}`);
        }
      },
    );

    // C. Generate the .tsx file in the new folder
    fs.closeSync(fs.openSync(`${newFolderPath}/${name}.tsx`, 'w'));
    fs.writeFile(
      `${newFolderPath}/${name}.tsx`,
      `import React from 'react';\n\nconst ${name}: React.FC = (props) => {\n  return <div className="${name.toLowerCase()}">{props.children}</div>;\n};\n\nexport default ${name};\n`,
      'utf-8',
      (e) => {
        if (e) {
          console.log('\x1b[31m', `❌ Error: ${e}`);
        }
      },
    );

    // D. Generate the scss file in the new folder
    fs.closeSync(fs.openSync(`${newFolderPath}/${name}.scss`, 'w'));
    fs.writeFile(
      `${newFolderPath}/${name}.scss`,
      `.${name.toLowerCase()} { \n  white-space: normal;\n}`,
      'utf-8',
      (e) => {
        if (e) {
          console.log('\x1b[31m', `❌ Error: ${e}`);
        }
      },
    );

    // E. Generate the test file in the new folder
    fs.closeSync(fs.openSync(`${newFolderPath}/${name}.test.tsx`, 'w'));
    fs.writeFile(
      `${newFolderPath}/${name}.test.tsx`,
      `import React from 'react';\nimport { render, screen } from '@testing-library/react';\nimport ${name} from 'Features/${feature}/${name}';\n\ndescribe('<${name} />', () => {\n  it('should render the Component normally', () => {\n    const props = { children: ['${name}'] };\n    render(<${name} {...props} />);\n    expect(screen.getByText('${name}')).toBeInTheDocument;\n  });\n});\n`,
      'utf-8',
      (e) => {
        if (e) {
          console.log('\x1b[31m', `❌ Error: ${e}`);
        }
      },
    );

    // F. Generate a storybook story in the new folder
    fs.closeSync(fs.openSync(`${newFolderPath}/${name}.stories.tsx`, 'w'));
    fs.writeFile(
      `${newFolderPath}/${name}.stories.tsx`,
      `import { Meta } from '@storybook/react';\n\nimport ${name} from './${name}';\nimport './${name}.scss';\n\nexport default {\n  component: ${name},\n  argTypes: {\n    children: { control: 'text' },\n  },\n} as Meta;\n\nexport const Primary = {\n  args: {\n    children: 'children',\n  },\n};\n`,
      'utf-8',
      (e) => {
        if (e) {
          console.log('\x1b[31m', `❌ Error: ${e}`);
        }
      },
    );

    console.log(
      '\x1b[32m',
      `✔️  Done! Your feature component '${name}' is now available under src/features/${feature}/${name}.`,
    );
  }
  console.log('\x1b[37m', 'Finished generating feature component.');
};

// Run the script

// 1. Let the user know this script is attempting to run:
console.log('🏭 Attempting to build your feature component ...');

// 2. Specify how you would like to parse the command line arguments
const minimistOptions = {
  alias: {
    n: 'name',
    f: 'feature',
  },
};

// 3. Parse the command line arguments using minimist
// Note argv._ contains all arguments without options associated with them
const argv = minimist(process.argv.slice(2), minimistOptions);
const { name, feature } = argv;

if (feature === undefined) {
  console.log(
    '\x1b[31m',
    '❌ Error: No feature specified to add a feature component to. Check to make sure the feature exists first and pass it using --feature or -f.',
  );
} else if (name === undefined) {
  console.log(
    '\x1b[31m',
    "❌ Error: No feature component name specified. Have you tried using --name 'MyFeatureComponent'?",
  );
} else {
  if (!fs.existsSync(`./src/features/${feature}`)) {
    console.log(
      '\x1b[31m',
      `❌ Error: Feature '${feature}' doesn't exist. Make sure the feature exists before making a feature component for it!`,
    );
  } else if (fs.existsSync(`./src/features/${feature}/${name}`)) {
    console.log(
      '\x1b[31m',
      `❌ Error: Feature component '${name}' already exists under Feature ${feature}. Try a different name!`,
    );
  }
  if (fs.existsSync(`./src/features/${feature}`)) {
    generateFeatureComponent(name, feature);
  } else {
  }
}
