import morgan from "morgan"
import packageJson from "../package.json"
import logger from "./helpers/logging"
import createServer from "./graphql/create-server"
import { connectToMongoDB } from "./helpers/db"

const { NODE_ENV, FRONTEND_URL, PORT, VERSION, COMMIT_BRANCH, COMMIT_SHA } = process.env

const main = () => {
  connectToMongoDB()
  const server = createServer()

  server.express.use(
    morgan("combined", {
      stream: {
        write: function(message) {
          logger.debug(message)
        }
      }
    })
  )

  server.express.get("/get-runtime-config", (req, res) => {
    const version = {
      NODE_ENV,
      FRONTEND_URL,
      PORT,
      VERSION: packageJson.version,
      COMMIT_BRANCH,
      COMMIT_SHA
    }
    res.send(JSON.stringify(version))
  })

  server.start(
    {
      port: PORT,
      endpoint: "/",
      playground: false,
      cors: {
        origin: FRONTEND_URL
      }
    },
    result => logger.info(`🚀 GraphQL Server initialised on port ${result.port}!`)
  )
}

export default main
