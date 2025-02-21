import { Carbon } from '@carbonhost/typescript'
import {Args, Command, Flags} from '@oclif/core'
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import ora from 'ora'

// carbon deploy localPath serverPath --star <starId>
export default class Deploy extends Command {
  static override args = {
    localPath: Args.string({description: 'The path to the file that will be deployed'}),
    starDirectory: Args.string({description: 'The directory on the server to deploy the file to'}),
  }
  static override description = 'Deploy a local file to a star'
  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]
  static override flags = {
    star: Flags.string({char: 's', description: 'The Star ID to deploy to'}),
    watch: Flags.boolean({char: 'w', description: 'Watch for changes and auto-deploy'}),
    postDeploy: Flags.string({char: 'p', description: 'A command to run after the file is deployed'}),
    restart: Flags.boolean({char: 'r', description: 'Restart the server after the file is deployed'}),
  }

  private async uploadFile(star: any, localPath: string, starDirectory: string, spinner: any) {
    try {
      spinner.text = 'Reading local file'
      const file = new File(
        [fs.readFileSync(localPath)],
        path.basename(localPath)
      )

      spinner.text = `Uploading ${path.basename(localPath)} to ${starDirectory}`
      await star.files.uploadFile(starDirectory, file)

      spinner.succeed(`Successfully uploaded ${path.basename(localPath)}`)
      this.log(`✨ File deployed to ${starDirectory}`)
    } catch (error) {
      spinner.fail(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Deploy)

    if (!flags.star) {
      this.error('No Star ID provided, please provide a Star ID with the --star flag')
      return
    }

    if (!args.localPath) {
      this.error('No local path provided, please provide a local path with the first argument')
      return
    }

    if (!args.starDirectory) {
      this.error('No star directory provided, please provide a star directory with the second argument')
      return
    }

    // get key from ~/.carbon with `TOKEN=`
    const key = fs.readFileSync(path.join(os.homedir(), '.carbon'), 'utf8').split('=')[1]
    const carbonClient = new Carbon({ apiKey: key })

    const spinner = ora('Connecting to star').start()

    const star = await carbonClient.getStar(flags.star)
    if (!star) {
      spinner.fail('Star not found')
      this.error('Please check the Star ID and try again')
      return
    }

    // Do initial upload
    await this.uploadFile(star, args.localPath, args.starDirectory, spinner)

    // If watch flag is set, continue watching for changes
    if (flags.watch) {
      this.log('\n👀 Watching for changes...')
      
      let debounceTimer: NodeJS.Timeout
      fs.watch(args.localPath, (eventType) => {
        // Clear existing timer
        clearTimeout(debounceTimer)
        
        // Set new timer to debounce rapid changes
        debounceTimer = setTimeout(async () => {
          if (eventType === 'change') {
            const newSpinner = ora('File changed, uploading...').start()
            await this.uploadFile(star, args.localPath!, args.starDirectory!, newSpinner)

            if (flags.postDeploy) {
              this.log(`\n🔄 Running post-deploy command: ${flags.postDeploy}`)
              await star.executeCommand(flags.postDeploy)
            }

            if (flags.restart) {
              this.log('\n🔄 Restarting server')
              await star.setPower('restart')
            }
          }
        }, 100) // Debounce for 100ms
      })

      // Keep process alive
      process.stdin.resume()

      // Handle interrupts gracefully
      process.on('SIGINT', () => {
        this.log('\n\n🛑 Stopping file watch')
        process.exit(0)
      })
    }
  }
}
