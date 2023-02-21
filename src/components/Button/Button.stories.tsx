// @ts-nocheck
import { Meta } from '@storybook/react';

import Button from './Button';
import './Button.scss';

export default {
  component: Button,
  argTypes: {
    text: { control: 'text' },
    className: { control: { type: 'select', options: ['btn-grad', 'btn-outline'] } },
  },
  parameters: {
    backgrounds: {
      values: [
        { name: 'red', value: '#f00' },
        { name: 'green', value: '#0f0' },
        { name: 'blue', value: '#00f' },
      ],
    },
  },
} as Meta;

export const Primary = {
  args: {
    text: 'Button',
    className: 'btn-grad',
  },
};

export const Secondary = {
  args: {
    text: 'Button',
    className: 'btn-outline',
  },
};
