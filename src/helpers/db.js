import mongoose from "mongoose"
import logger from "./logging"

const { MONGODB_URL } = process.env
const { Schema } = mongoose

export const connectToMongoDB = () =>
  mongoose
    .connect(
      MONGODB_URL,
      {
        keepAlive: true,
        bufferCommands: true,
        useNewUrlParser: true
      }
    )
    .then(
      () => logger.info(`🚀 Mongodb connected to ${MONGODB_URL}`),
      error => {
        logger.error(`🤯 Mongodb failed to initialise: ${error}`)
      }
    )
    .catch(logger.error)

var orderSchema = new Schema(
  {
    email: { type: String, required: true },
    terms: { type: Date, default: Date.now() },
    stripeId: { type: String, required: true },
    token: {
      name: { type: String, required: true },
      symbol: { type: String, required: true },
      supply: { type: Number, required: true },
      decimals: { type: Number, required: true },
      walletAddress: { type: String, required: true },
      transactionId: { type: String, default: "Pending" },
      contractAddress: { type: String, default: "Pending" },
      meta: { type: String, default: "" }
    }
  },
  { timestamps: true }
)
orderSchema.method("toCustomer", function() {
  const { _id, terms, stripeId, token } = this.toObject()
  return {
    id: _id.toString(),
    stripeId,
    terms: terms.toString(),
    token
  }
})
orderSchema.method("toTicker", function() {
  const {
    token: { name, symbol, contractAddress },
    createdAt
  } = this.toObject()

  return {
    name,
    symbol,
    contractAddress,
    createdAt
  }
})

const Order = mongoose.model("Order", orderSchema)

export const models = { Order }
