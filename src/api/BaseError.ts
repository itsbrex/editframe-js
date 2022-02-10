import { CustomError } from 'ts-custom-error'

class BaseError extends CustomError {
  timestamp: Date = new Date()

  constructor(message: string) {
    super(message)
    this.message = `[editframe.js] ${message}`
  }
}

export default BaseError
