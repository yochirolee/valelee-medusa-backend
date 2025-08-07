const { createServer } = require('@medusajs/framework/server')

const port = process.env.PORT || 9000
const host = process.env.HOST || '0.0.0.0'

async function startServer() {
  try {
    const app = await createServer()
    
    app.listen(port, host, () => {
      console.log(`🚀 Medusa server ready at http://${host}:${port}`)
      console.log(`📊 Admin: http://${host}:${port}/admin`)
      console.log(`🛍️ Store: http://${host}:${port}/store`)
    })
  } catch (error) {
    console.error('Failed to start Medusa server:', error)
    process.exit(1)
  }
}

startServer()
