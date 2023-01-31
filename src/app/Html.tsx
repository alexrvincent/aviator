import React from 'react';

// @ts-ignore
const Html: React.FC = (props) => {
  // @ts-ignore
  const { assets, children, title, isDevServer = false } = props;
  if (isDevServer) {
    // Webpack Dev Server serves a real HTML file and injects scripts to enable hot reloading. So just send all
    // the good react stuff before the declaration
    return <>{children}</>;
  }
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Alex Vincent's personal living boilerplate for production-grade hybrid React apps."
        ></meta>
        <link rel="stylesheet" href={assets.css[1]} />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest"></link>
        <title>{title}</title>
      </head>
      <body>
        <div id="root">{children}</div>
        <script
          dangerouslySetInnerHTML={{
            __html: `assetManifest = ${JSON.stringify(assets)};`,
          }}
        />
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `window.__SERVER_STATE = ${serverState})`,
          }}
        /> */}
      </body>
    </html>
  );
};

export default Html;
