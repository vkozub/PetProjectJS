const winston = require('winston');

const apiFormat = winston.format.printf(({ message, label, timestamp }) => {
    return `${timestamp} ${label}: ${message}`;
  });

const apiClientLogger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.label({ label: 'API client' }),
        winston.format.timestamp(),
        apiFormat
    ),
    transports: [new winston.transports.Console()]
});

const endpointLogger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [new winston.transports.Console()]
});

module.exports = { apiClientLogger, endpointLogger };

// for axios it is better to use 'axios-logger' or 'got' package as API client (using hooks to intercept requests and responses)
// also it is possible to use 'tslog' as external logger