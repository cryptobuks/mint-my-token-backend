import { ContractFactory } from "ethers"
import { wallet } from "./connect"
import logger from "../helpers/logging"
import { models } from "../helpers/db"
import { abi, bytecode } from "./generic-token"

const mintToken = async (_id, token) => {
  try {
    const { name, symbol, supply, decimals, meta, walletAddress } = token
    logger.info("Minting new token ...", name)
    const factory = new ContractFactory(abi, bytecode, wallet)
    const contract = await factory.deploy(name, symbol, supply, decimals, meta, walletAddress)
    await updateOrderWithTransactionId(_id, contract.deployTransaction.hash)

    contract
      .deployed()
      .then(contract => updateOrderWithContractAddress(_id, contract))
      .catch(error => logger.error("Error deploying the contract ... send flare!", error))
  } catch (error) {
    logger.error("Oh dear")
    logger.error(error)
  }
}

const updateOrderWithContractAddress = async (_id, contract) => {
  const result = await models.Order.findOneAndUpdate(
    { _id },
    { $set: { "token.contractAddress": contract.address } }
  )
  if (!result) throw new Error(`Error updating orderId ${_id} with contract.address ${contract}`)
  else logger.info("Updated model with contract address")
}

const updateOrderWithTransactionId = async (_id, transactionId) => {
  const result = await models.Order.findOneAndUpdate(
    { _id },
    { $set: { "token.transactionId": transactionId } }
  )
  if (!result) throw new Error(`Error updating orderId ${_id} with transactionId ${transactionId}`)
  else logger.info(`Updated orderId ${_id} with transactionId ${transactionId}`)
}

export default mintToken
