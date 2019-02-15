import winston from "winston"

const { NODE_ENV } = process.env
let level = "info"
if (NODE_ENV === "development") {
  level === "debug"
}

const logger = winston.createLogger({
  level,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    winston.format.printf(
      info =>
        `${info.timestamp} ${info.level}: ${info.message}` +
        (info.splat !== undefined ? `${info.splat}` : " ")
    )
  ),
  transports: [
    new winston.transports.Console({
      timestamp: true,
      exitOnError: false
    }),
    new winston.transports.File({
      filename: "backend.log",
      handleExceptions: true
    })
  ],
  exitOnError: false
})

logger.info("🚀 Logging initialised!")

export default logger
