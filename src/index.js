import main from "./app"
import logger from "./helpers/logging"

try {
  if (!process.env.MONGODB_URL) {
    throw new Error("Missing ENV variable MONGODB_URL")
  } else if (!process.env.ETHEREUM_NETWORK) {
    throw new Error("Missing ENV variable ETHEREUM_NETWORK")
  } else if (!process.env.ETHEREUM_PRIVATE_KEY) {
    throw new Error("Missing ENV variable ETHEREUM_PRIVATE_KEY")
  }
  main()
} catch (error) {
  logger.error("Main threw ... So I guess this is it 💔")
  logger.error(error)
  logger.on("finish", function(info) {
    process.exit()
  })
  logger.end()
}

// TODO: Catch and process SIGTERMs
