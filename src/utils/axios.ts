// @ts-nocheck
import wait from './wait';

const axiosSchema = {
  // `data` is the response that was provided by the server
  data: {},

  // `status` is the HTTP status code from the server response
  status: 200,

  // `statusText` is the HTTP status message from the server response
  // As of HTTP/2 status text is blank or unsupported.
  // (HTTP/2 RFC: https://www.rfc-editor.org/rfc/rfc7540#section-8.1.2.4)
  statusText: 'OK',

  // `headers` the HTTP headers that the server responded with
  // All header names are lower cased and can be accessed using the bracket notation.
  // Example: `response.headers['content-type']`
  headers: {},

  // `config` is the config that was provided to `axios` for the request
  config: {},

  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance in the browser
  request: {},
};

const responseCodes = {
  200: {
    statusText: 'OK',
    message: '',
  },
  301: {
    statusText: 'Permanent Redirect',
    message: 'Request failed with status code 301',
  },
  302: {
    statusText: 'Temporary Redirect',
    message: 'Request failed with status code 302',
  },
  400: {
    statusText: 'Bad Request',
    message: 'Request failed with status code 400',
  },
  404: {
    statusText: 'Not Found',
    message: 'Request failed with status code 404',
  },
  410: {
    statusText: 'Gone',
    message: 'Request failed with status code 410',
  },
  500: {
    statusText: 'Internal Service Error',
    message: 'Request failed with status code 500',
  },
  503: {
    statusText: 'Service Unavailable',
    message: 'Request failed with status code 503',
  },
  default: {
    statusText: 'OK',
    message: '',
  },
};

// Future Alex! mockAxiosResponse is not throwing the errors that regular axios is! Fix this please :)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const mockAxiosResponse = async ({ waitTime = 500, data = {}, status = 200 }) => {
  await wait(waitTime);

  const response = {
    ...axiosSchema,
    status,
    ...(responseCodes[status] ? responseCodes[status] : responseCodes.default),
  };

  if (200 <= status && status <= 299) {
    return Promise.resolve(data);
  } else {
    return Promise.reject(response);
  }
};

export { mockAxiosResponse };
