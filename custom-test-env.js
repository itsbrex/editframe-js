const Environment = require('jest-environment-jsdom')

/**
 * A custom environment to set the TextEncoder and TextDecoder
 */
module.exports = class CustomTestEnvironment extends Environment {
  async setup() {
    await super.setup()
    if (typeof this.global.TextEncoder === 'undefined') {
      const { TextDecoder, TextEncoder } = require('util')
      this.global.TextDecoder = TextDecoder
      this.global.TextEncoder = TextEncoder
    }
  }
}
