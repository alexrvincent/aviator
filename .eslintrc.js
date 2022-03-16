module.exports = {
  "parser": "@typescript-eslint/parser", // Specifies the ESLint parser
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2020, // Allows for the parsing of modern ECMAScript features
    "sourceType": "module" // Allows for the use of imports
  },
  "settings": {
    "react": {
      version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  },
  "extends": [
    "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "plugin:prettier/recommended" // Uses eslint-config-prettier to disable ESLint rules from a variety of default lint rules that would conflict with prettier
  ],
  "plugins": [
    "@typescript-eslint",
    "prettier"
  ],
  "rules": {
    "prettier/prettier": "error",
    "@typescript-eslint/no-var-requires": "off", // TypeScript eslinter wants require/import paths to be static, but we're using it dynamically in our build config
    "react/prop-types": "off"                   // We use TypeScript (with a linter that enforces Prop declarations) so we don't need built-in prop-types!
  }
}

/**
 * Code lifecycle    
 * 
 * *In prod*  |      *At deployment time*       | *At commit time* |                           *During development and on every file save*                      |
 *  [AWS]         [Webpack, babel-loader, tsc]    [Git/Husky/Yarn]                  [ESLint, Prettier, @typescript-eslint-plugin, eslint-plugin-react]        
 *                                           
 * deployed <- bundled <- minified <- compiled <- fixed/committed <- formatted <- linted <- parsed <- your raw code you type into your development environment
 * 
 */