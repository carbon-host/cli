# Carbon CLI

The Carbon CLI (`@carbonhost/cli`) provides a command-line interface for managing your Carbon deployments and resources.

[![Version](https://img.shields.io/npm/v/@carbonhost/cli.svg)](https://npmjs.org/package/@carbonhost/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@carbonhost/cli.svg)](https://npmjs.org/package/@carbonhost/cli)

## Installation

**npm:**
```bash
npm install -g @carbonhost/cli
```

**yarn:**
```bash
yarn global add @carbonhost/cli
```

**pnpm:**
```bash
pnpm add -g @carbonhost/cli
```

**bun:**
```bash
bun add -g @carbonhost/cli
```

## Command Reference

### Authentication

```bash
# Login to Carbon CLI
carbon login
```

The login command opens your browser to authenticate with Carbon. It will display a verification code that you should verify matches in the browser. After successful authentication, your API key will be saved locally.

Options:
- `--port, -p`: Specify a custom port for the local authentication server (optional)

### List Stars

```bash
# List all your stars
carbon list
# or
carbon ls
```

The list command displays all your stars in a table format with key information.

Options:
- `--format, -f`: Output format (table, json) (default: table)
- `--columns, -c`: Only show specified columns (comma-separated) (default: id,name,type,status,ram,cpu)
- `--sort, -s`: Property to sort by (default: name)

Examples:
```bash
# List all stars in table format
carbon ls

# Show only name and status columns
carbon ls --columns name,status

# Sort by creation date
carbon ls --sort created

# Output as JSON
carbon ls --format json
```

### File Deployment

```bash
# Deploy a file to a star
carbon deploy <localPath> <starDirectory> --star <starId> [--watch]
```

The deploy command uploads a local file to a specified directory on your star (server).

Arguments:
- `localPath`: Path to the local file you want to deploy
- `starDirectory`: Target directory on the star where the file should be uploaded
- `--star, -s`: The ID of the star to deploy to
- `--watch, -w`: Watch for local file changes and auto-deploy (optional)
- `--postDeploy, -p`: Command to run after deployment (optional)
- `--restart, -r`: Restart the server after deployment (optional)

Examples:
```bash
# Deploy a single file
carbon deploy ./presets/paper-global.yml /config --star abc123

# Deploy and watch for changes
carbon deploy ./build/libs/PluginPortal.jar /plugins --star abc123 --watch

# Deploy with post-deploy command
carbon deploy ./plugins/MyPlugin.jar /plugins --star abc123 --postDeploy "reload confirm"

# Deploy and restart server
carbon deploy ./server.properties /config --star abc123 --restart
```

> **Note**: When using the watch flag, the CLI will monitor the specified file for changes and automatically upload new versions when detected. This is particularly useful during development.

### Help

```bash
# Get general help
carbon help

# Get help for a specific command
carbon help <command>
```

The help command provides detailed information about available commands and their usage.
