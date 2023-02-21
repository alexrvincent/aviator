import { Meta } from '@storybook/react';

import PlaceholderText from './PlaceholderText';
import './PlaceholderText.scss';

export default {
  component: PlaceholderText,
  argTypes: {
    children: { control: 'text' },
  },
} as Meta;

export const Primary = {
  args: {
    children: 'Text To Placehold For',
  },
};
