import {Args, Command, Flags} from '@oclif/core'
import fs from 'node:fs'
import { createServer } from 'node:http'
import os from 'node:os'
import path from 'node:path'

export default class Login extends Command {
  static override description = 'Login to the Carbon Host API'
  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]
  static override flags = {
    port: Flags.string({char: 'p', description: 'port to listen on'}),
  } 

  public async run(): Promise<void> {
    const {flags} = await this.parse(Login)

    // Generate a random key for authentication
    const randomKey = `${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
    
    const server = createServer((req, res) => {
      if (req.url?.startsWith('/v1/login')) {
        const url = new URL(req.url!, 'http://localhost')
        const key = url.searchParams.get('key')

        if (key !== randomKey) {
          res.writeHead(400)
          res.end('Invalid authentication key')
          return
        }

        const decodedKey = decodeURIComponent(key)
        fs.writeFileSync(path.join(os.homedir(), '.carbon'), `API_KEY=${decodedKey}`)

        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(`
          <html>
            <head>
              <title>Carbon CLI Authentication</title>
              <script>
                window.close()
              </script>
            </head>
            <body style="font-family: system-ui; max-width: 600px; margin: 40px auto; padding: 20px;">
              <p>You can now close this window and return to your terminal.</p>
            </body>
          </html>
        `)
        
        this.log('\n✅ Authentication successful! You can now use the Carbon CLI.\n')
        process.exit(0)
      }

      res.writeHead(404)
      res.end('Not found')
    })

    // Try the specified port first, then fall back to finding an open port
    const tryPort = async (port: number): Promise<number> => {
      try {
        await new Promise((resolve, reject) => {
          server.once('error', reject)
          server.listen(port, () => resolve(port))
        })
        return port
      } catch {
        if (flags.port) {
          throw new Error(`Port ${port} is already in use. Please specify a different port.`)
        }

        return tryPort(port + 1)
      }
    }

    const startingPort = flags.port ? Number.parseInt(flags.port, 10) : 3000
    const port = await tryPort(startingPort)

    this.log('\n🔐 Carbon CLI Authentication')
    this.log('\nOpening your browser to complete authentication...')
    this.log(`\n💡 If your browser doesn't open automatically, visit this URL:\n`)
    this.log(`   http://localhost:${port}/v1/login?key=${randomKey}\n`)

    // Try to open the browser
    try {
      const open = await import('open')
      await open.default(`http://localhost:${port}/v1/login?key=${randomKey}`)
    } catch {
      // Silent fail if we can't open the browser
    }
  }
}
