import { FatalError } from "./errors"

const helmet = resolver => async (...args) => {
  try {
    return await resolver(...args)
  } catch (error) {
    throw new FatalError({ data: { reason: error.message } })
  }
}

export default helmet
