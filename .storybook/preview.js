import { themes } from '@storybook/theming';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark, appBg: 'rgb(49, 47, 47)' },
    // Override the default light theme
    light: { ...themes.normal, appBg: 'white' },
  },
};

export const decorators = [
  (Story) => (
    <div style={{ backgroundColor: 'rgb(49, 47, 47)', width: '80vw', height: '80vh' }}>
      <Story />
    </div>
  ),
];
