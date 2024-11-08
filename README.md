# Carbon CLI

[![License](https://img.shields.io/badge/license-GNU%20AGPL-blue)](LICENSE)
[![TypeScript](https://img.shields.io/badge/types-TypeScript-blue)](https://www.typescriptlang.org/)
[![Build](https://img.shields.io/github/actions/workflow/status/carbon-host/carbon-cli/publish.yml)](https://github.com/carbon-host/carbon-cli/actions)
[![npm](https://img.shields.io/npm/v/@carbonhost/cli)](https://www.npmjs.com/package/@carbonhost/cli)

The **Carbon CLI** provides a powerful command-line interface for managing your Minecraft server hosting on the Carbon Host platform. Built with TypeScript, it offers commands for deploying files, watching for changes, and managing your deployed stars seamlessly.

## Installation

The installation steps are currently not public due to the state of Carbon Host. Once Carbon Host is released to the public, these will be revealed.

## Usage

Run the `carbon` command followed by the desired subcommand:

```bash
carbon <command>
```

### Commands

- `carbon deploy <source> <target> [post-deploy-command]`  Deploys a local file to your star.
- `carbon watch <source> <target> [post-deploy-command]`  Watches a local file and deploys it to your star.
- `carbon ls`  Lists your deployed stars.
- `carbon set-key <apiKey>`  Sets your API key.

### Options

- `--help`     Show help                                             [boolean]
- `--version`  Show version number                                   [boolean]
- `-v, --verbose`  Enable verbose logging                              [boolean]
- `--star`     The ID of the star to use                             [string]

You need to specify a command.

## Documentation

For more detailed documentation, visit the [Documentation](https://carbon.host/docs/cli) page.

## Support

If you encounter issues or have questions, please open an issue on our [GitHub Issues page](https://github.com/carbon-host/carbon-cli/issues) or join our [Discord server](https://discord.gg/carbon).

## License

This project is licensed under the [GNU AGPL License](LICENSE).
