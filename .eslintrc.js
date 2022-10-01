const config = require("@blitzjs/next/eslint")

delete config.overrides[0].rules["@typescript-eslint/no-floating-promises"]

module.exports = config
