// @ts-nocheck
import React from 'react';
import { Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import Link from './Link';
import './Link.scss';

export default {
  component: Link,
  argTypes: {
    to: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} as Meta;

export const Primary = {
  args: {
    to: '/home',
    children: 'To Home',
  },
};
