const { withBlitz } = require("@blitzjs/next")
const withPWA = require("next-pwa")

const config = {}

module.exports = withBlitz(
  withPWA({
    ...config,
    pwa: {
      dest: "public",
    },
  })
)
