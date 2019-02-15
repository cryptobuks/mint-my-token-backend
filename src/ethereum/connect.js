import { Wallet, ethers } from "ethers"

const { ETHEREUM_PRIVATE_KEY, ETHEREUM_NETWORK } = process.env

export const provider = ethers.getDefaultProvider(ETHEREUM_NETWORK)
export const wallet = new Wallet(ETHEREUM_PRIVATE_KEY, provider)
