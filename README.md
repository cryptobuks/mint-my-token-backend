# MintMyToken.com backend

Simple node-based backend server that receives orders from mintmytoken.com, processes the payment via Stripe, mints a new token on Ethereum's main net and then emails the token's owner.

## Setup

To run locally:

1. Clone the repo
2. Install dependencies: `yarn install` or simply `yarn`
3. Set your environment variables in `.env.development`
4. Launch the server with `yarn dev`

## Required environment variables

The following environment variables are expected:

```
NODE_ENV
FRONTEND_URL
PORT
ETHEREUM_NETWORK
ETHEREUM_ADDRESS
ETHEREUM_PRIVATE_KEY
STRIPE_SECRET
MAIL_API_KEY
MAIL_FROM_ADDRESS
COST_PER_TOKEN
MONGODB_URL
```
