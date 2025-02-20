@carbonhost/cli
=================

A CLI to interact with the carbon.host platform


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@carbonhost/cli.svg)](https://npmjs.org/package/@carbonhost/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@carbonhost/cli.svg)](https://npmjs.org/package/@carbonhost/cli)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @carbonhost/cli
$ carbon COMMAND
running command...
$ carbon (--version)
@carbonhost/cli/1.0.0 darwin-arm64 node-v23.7.0
$ carbon --help [COMMAND]
USAGE
  $ carbon COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`carbon login`](#carbon-login)
* [`carbon deploy`](#carbon-deploy)
* [`carbon help [COMMAND]`](#carbon-help-command)
* [`carbon plugins`](#carbon-plugins)
* [`carbon plugins add PLUGIN`](#carbon-plugins-add-plugin)
* [`carbon plugins:inspect PLUGIN...`](#carbon-pluginsinspect-plugin)
* [`carbon plugins install PLUGIN`](#carbon-plugins-install-plugin)
* [`carbon plugins link PATH`](#carbon-plugins-link-path)
* [`carbon plugins remove [PLUGIN]`](#carbon-plugins-remove-plugin)
* [`carbon plugins reset`](#carbon-plugins-reset)
* [`carbon plugins uninstall [PLUGIN]`](#carbon-plugins-uninstall-plugin)
* [`carbon plugins unlink [PLUGIN]`](#carbon-plugins-unlink-plugin)
* [`carbon plugins update`](#carbon-plugins-update)

## `carbon login`

Login to the Carbon Host platform

```
USAGE
  $ carbon login [-p <port>]

FLAGS
  -p, --port=<value>  port to listen on for authentication callback

DESCRIPTION
  Login to the Carbon Host platform.
  
  This command will open your browser to authenticate with Carbon Host. After successful
  authentication, your API key will be saved locally for future use.

EXAMPLES
  $ carbon login
  $ carbon login --port 8000
```

## `carbon deploy`

Deploy a local file to a star

```
USAGE
  $ carbon deploy LOCAL_PATH STAR_PATH -s <star-id>

ARGUMENTS
  LOCAL_PATH   The path to the file that will be deployed
  STAR_PATH    The path on the star to deploy the files to

FLAGS
  -s, --star=<star-id>  (required) The Star ID to deploy to

DESCRIPTION
  Deploy a local file to a star.
  
  This command uploads a file from your local machine to a specified path on your star.
  You must be logged in to use this command.

EXAMPLES
  $ carbon deploy ./my-file.txt /path/on/star --star abc123
  $ carbon deploy index.html /public/index.html -s abc123
```

## `carbon help [COMMAND]`

Display help for carbon.

```
USAGE
  $ carbon help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for carbon.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.25/src/commands/help.ts)_

## `carbon plugins`

List installed plugins.

```
USAGE
  $ carbon plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ carbon plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.33/src/commands/plugins/index.ts)_

## `carbon plugins add PLUGIN`

Installs a plugin into carbon.

```
USAGE
  $ carbon plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into carbon.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the CARBON_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the CARBON_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ carbon plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ carbon plugins add myplugin

  Install a plugin from a github url.

    $ carbon plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ carbon plugins add someuser/someplugin
```

## `carbon plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ carbon plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ carbon plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.33/src/commands/plugins/inspect.ts)_

## `carbon plugins install PLUGIN`

Installs a plugin into carbon.

```
USAGE
  $ carbon plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into carbon.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the CARBON_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the CARBON_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ carbon plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ carbon plugins install myplugin

  Install a plugin from a github url.

    $ carbon plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ carbon plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.33/src/commands/plugins/install.ts)_

## `carbon plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ carbon plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ carbon plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.33/src/commands/plugins/link.ts)_

## `carbon plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ carbon plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ carbon plugins unlink
  $ carbon plugins remove

EXAMPLES
  $ carbon plugins remove myplugin
```

## `carbon plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ carbon plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.33/src/commands/plugins/reset.ts)_

## `carbon plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ carbon plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ carbon plugins unlink
  $ carbon plugins remove

EXAMPLES
  $ carbon plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.33/src/commands/plugins/uninstall.ts)_

## `carbon plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ carbon plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ carbon plugins unlink
  $ carbon plugins remove

EXAMPLES
  $ carbon plugins unlink myplugin
```

## `carbon plugins update`

Update installed plugins.

```
USAGE
  $ carbon plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.33/src/commands/plugins/update.ts)_
<!-- commandsstop -->
