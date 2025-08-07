const { start } = require('@medusajs/framework')

const port = process.env.PORT || 9000
const host = process.env.HOST || '0.0.0.0'

start({
  express: {
    config: {
      port,
      host,
    },
  },
})
