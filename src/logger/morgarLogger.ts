import morgan from "morgan";
import logger from "./logger";

const morganFormat =
  ":method :url :status :res[content-length] - :response-time ms";
morgan.token("level", (req, res) => {
  const status = res.statusCode;
  if (status >= 500) return "error";
  if (status >= 400) return "warn";
  return "info";
});

const morganMiddleware = morgan(
  (tokens, req, res) => {
    const logObject = {
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: tokens.status(req, res),
      contentLength: tokens.res(req, res, "content-length"),
      responseTime: tokens["response-time"](req, res),
      level: tokens.level(req, res) || "info",
    };

    logger.log(logObject.level as string, logObject);

    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  },
  {
    stream: {
      // This is just to satisfy Morgan's interface. The actual logging is done above.
      write: (message: string) => {
        // Do nothing here, as we've already logged in the custom format function
      },
    },
  }
);

export default morganMiddleware;
