import stripe from "../helpers/stripe"
import { models } from "../helpers/db"
import mintToken from "../ethereum/mint-token"
import { mailer, makeCustomerOrderEmail, makeAdminOrderEmail } from "../helpers/mail"
import logger from "../helpers/logging"
import helmet from "../helpers/helmet"

const Mutation = {
  payForToken: async (parent, { stripeId, token }, context, info) => {
    logger.info(`Starting pay for token mutation`)
    const charge = await stripe.charges.create({
      amount: process.env.COST_PER_TOKEN,
      currency: "GBP",
      source: stripeId
    })

    const { email, name } = token
    delete token.terms
    delete token.email
    const order = await new models.Order({
      email,
      token: { ...token },
      stripeId: charge.id,
      terms: Date.now()
    }).save()

    const { _id } = order
    await mailer.sendMail({
      from: process.env.MAIL_FROM_ADDRESS,
      to: email,
      subject: `The ${name} token has launched 🚀`,
      html: makeCustomerOrderEmail(_id)
    })

    await mailer.sendMail({
      from: process.env.MAIL_FROM_ADDRESS,
      to: process.env.MAIL_FROM_ADDRESS,
      subject: `MM⛏️ Order Incoming`,
      html: makeAdminOrderEmail(_id)
    })

    await mintToken(_id, token)

    return {
      message: order.id,
      success: true
    }
  }
}

const Query = {
  order: async (parent, { id: _id }, context, info) => {
    const order = await models.Order.findOne({ _id })
    if (!order) return null
    return order.toCustomer()
  },
  recentOrders: async (parent, args, context, info) => {
    const orders = await models.Order.find({}, null, { sort: { createdAt: -1 } }).limit(5)
    const filtered = orders.map(order => order.toTicker())
    return filtered
  }
}

// wrap each resolver in HOCs (as required)
const mutationKeys = Object.keys(Mutation)
mutationKeys.forEach(key => (Mutation[key] = helmet(Mutation[key])))

const queryKeys = Object.keys(Query)
queryKeys.forEach(key => (Query[key] = helmet(Query[key])))

export { Mutation, Query }
