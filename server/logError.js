// eslint-disable-next-line
const logError = function (prefix, e) {
  if (e instanceof Error) {
    console.error(`${prefix}: ${e.message}`, e.stack);
  } else {
    console.error(prefix, e);
  }
};

export default logError;
