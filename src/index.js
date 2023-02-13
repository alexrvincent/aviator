import React from 'react';
// @ts-ignore
import { hydrateRoot, createRoot } from 'react-dom/client';
import { App } from 'Core/index';
import 'Core/index.scss';

// @ts-ignore
if (module && module.hot) {
  createRoot(document.getElementById('root')).render(
    // @ts-ignore
    <App assets={{}} isServer={false} isDevServer={true} />,
  );
} else {
  hydrateRoot(
    document,
    // @ts-ignore
    <App
      // @ts-ignore
      assets={window.assetManifest}
      title={document.title}
      isServer={false}
      isDevServer={false}
    />,
  );
}
