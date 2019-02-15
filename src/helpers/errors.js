import { createError } from "apollo-errors"

const FatalError = createError("FatalError", {
  message: "Kobayashi Maru encountered 🤯 we cannot continue!"
})

export { FatalError }
