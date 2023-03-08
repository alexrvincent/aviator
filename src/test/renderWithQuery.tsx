/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// @ts-nocheck
import React from 'react';
import { render as rtlRender, RenderOptions, queries } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

const render = (ui: React.ReactElement, renderOptions?: Omit<RenderOptions<typeof queries>, 'queries'>) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        retry: false,
      },
    },
  });

  const Wrapper: React.FC = ({ children }) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export { render };
