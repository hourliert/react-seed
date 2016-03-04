import warning from 'warning';
import errorTranslators from 'config/errorTranslators';

function prettyStack(stack) {
  return stack.replace(/^[^\(]+?[\n$]/gm, '')
   .replace(/^\s+at\s+/gm, '')
   .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@')
   .split('\n');
}

function translateError(httpStatus, serverError) {
  if (!httpStatus && !serverError) {
    return errorTranslators.defaultError;
  } else if (httpStatus && !serverError) {
    return errorTranslators[httpStatus];
  }

  const { errorCode, params } = serverError;
  try {
    return errorTranslators[errorCode](params);
  } catch (e) {
    return errorTranslators.defaultError;
  }
}

export class HttpError {
  constructor({
    status,
    statusText,
    url,
  }, serverError) {
    const error = new Error();
    this.date = new Date();

    this.stack = prettyStack(error.stack);

    this.message = `HttpError ${status}: ${statusText}`;
    this.status = status; // eg 401
    this.url = url; // tried url
    this.statusText = statusText; // eg Unauthorized

    try {
      this.serverError = JSON.parse(serverError);
    } catch (e) {
      warning(false, e.message);
    } finally {
      const { longError, shortError } = translateError(status, this.serverError);
      this.longError = longError;
      this.shortError = shortError;
    }
  }
}

export class FetchError {
  constructor({
    error,
    url,
  }) {
    this.stack = prettyStack(error.stack);
    this.message = error.message;
    this.url = url;
    this.date = new Date();

    const { longError, shortError } = translateError();
    this.longError = longError;
    this.shortError = shortError;
  }
}
