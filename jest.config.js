module.exports = {
  globals: {
    'ts-jest': {
      // Tell ts-jest about our typescript config.
      // You can specify a path to your tsconfig.json file,
      // but since we're compiling specifically for node here,
      // this works too.
      tsconfig: {
        target: 'es2019',
      },
    },
  },
  // Transforms tell jest how to process our non-javascript files.
  // Here we're using babel for .js and .jsx files, and ts-jest for
  // .ts and .tsx files.  You *can* just use babel-jest for both, if
  // you already have babel set up to compile typescript files.
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    // If you're using babel for both:
    // "^.+\\.[jt]sx?$": "babel-jest",
  },
  // In webpack projects, we often allow importing things like css files or jpg
  // files, and let a webpack loader plugin take care of loading these resources.
  // In a unit test, though, we're running in node.js which doesn't know how
  // to import these, so this tells jest what to do for these.
  moduleNameMapper: {
    // Resolve .css and similar files to identity-obj-proxy instead.
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    // Resolve .jpg and similar files to /src/test/fileMock.js
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/src/test/fileMock.js`,
    // Resolve Components/.. pathings to the correct ./src/components.. files
    'App/(.*)$': '<rootDir>/src/app/$1',
    'Core/(.*)$': '<rootDir>/src/core/$1',
    'Components/(.*)$': '<rootDir>/src/components/$1',
    'Contexts/(.*)$': '<rootDir>/src/contexts/$1',
    'Routes/(.*)$': '<rootDir>/src/routes/$1',
    'Hooks/(.*)$': '<rootDir>/src/hooks/$1',
    'util/index': '<rootDir>/src/util/index.js',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\](?!react-children-utilities).+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  // Tells Jest what folders to ignore for tests
  testPathIgnorePatterns: [`node_modules`, `\\.cache`],
  testURL: `http://localhost`,
  testEnvironment: 'jsdom',
};
