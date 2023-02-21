# aviator 👨🏻‍✈️

Alex Vincent's personal living boilerplate for production-grade hybrid React apps.

# Current Tech Stack:

1. Development

   - Package Manager: Yarn
   - Development Language: TypeScript
   - Front-End Framework: React
   - Server-Side Framework: Express
   - Routing: React Router (DOM)
   - CSS Framework: SASS
   - CSS Tooling: Normalize.css, Custom fonts / Font Faces
   - Manifest: Optimized Mobile Icons

2. Linting & Formatting

   - Linter(s): ESLint (using typescript-eslint rules)
   - Formatter: Prettier

3. Testing

   - Test Runner: Jest

4. CI / CD Tooling

   - Version Control: Git
   - Git Hooks: Husky
   - Bundler: Webpack (Dev/Prod Client Builds, Dev/Prod Server Builds)
   - Transpiler: Babel
   - Custom Tooling (Auto-generated components, routes, unit-tests)

5. Custom Tooling

   - Webpack Code Splitting by npm library, custom modules, routes
   - Performance Budgeting (Time Based, Quantity Based, Rules Based)

# TO-DOs (In Order):

1. Add Figma / Storybook Support (npx storybook@next automigrate for full migration)
2. Add an API library (React Query)
3. Add an automated testing framework support (Cypress / Playwright)
4. Set up NGINX
5. Set up Dockerfile
6. Manually deploy to Heroku
7. Automate deployments using CircleCI

# TO-DOs to Come Back To

1. Add Timed Based (web core vitals), Rules Based (Lighthouse) performance budgets. Lighthouse node CLI doesn't work on localhost
   so we'll need to find a way to test it when we can get environments up. Ideally I would like some kind of yarn command
   I could run to get a Lighthouse report, but that doesn't exist right now. We'll also be doing Performance Budgeting through
   Lighthouse as well when this works.

2. Critical CSS rendering (the process of putting above the fold css in the head as a static style tag) seems to be
   an optimization that requires a bit of maintenance (aka there isn't any clearly nice tooling that doesn't come with lots of
   overhead). The advice is to implement it only when it becomes an issue.

3. Fix @ts-ignores
