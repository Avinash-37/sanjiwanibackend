/**
 * File    :Logger.js
 * Author  :Vaibhav D.Shinde
 */


const { createLogger, format, transports } = require('winston');
const path = require('path');




const Logger = createLogger({
  // change level if in dev environment versus production
  level:'debug',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: 'debug',
      format: format.combine(
        format.colorize(),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
      )
    }),
    new transports.File({filename:path.resolve(__dirname,"server.log")})
  ]
});

module.exports = Logger;