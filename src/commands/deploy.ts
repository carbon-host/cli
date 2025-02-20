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
    starPath: Args.string({description: 'The path on the server to deploy the files to'}),
  }
  static override description = 'Deploy a local file to a star'
  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]
  static override flags = {
    star: Flags.string({char: 's', description: 'The Star ID to deploy to'}),
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

    if (!args.starPath) {
      this.error('No star path provided, please provide a star path with the second argument')
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

    spinner.text = 'Reading local file'
    // Read the local file
    const file = new File(
      [fs.readFileSync(args.localPath)],
      path.basename(args.localPath)
    )

    // Upload file
    spinner.text = `Uploading ${path.basename(args.localPath)} to ${args.starPath}`
    const directory = path.dirname(args.starPath)
    const upload = await star.files.uploadFile(directory, file)

    spinner.succeed(`Successfully uploaded ${path.basename(args.localPath)}`)
    this.log(`✨ File deployed to ${args.starPath}`)
  }
}
