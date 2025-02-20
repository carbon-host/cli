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
* [`carbon hello PERSON`](#carbon-hello-person)
* [`carbon hello world`](#carbon-hello-world)
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

## `carbon hello PERSON`

Say hello

```
USAGE
  $ carbon hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ carbon hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/carbon-host/cli/blob/v1.0.0/src/commands/hello/index.ts)_

## `carbon hello world`

Say hello world

```
USAGE
  $ carbon hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ carbon hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/carbon-host/cli/blob/v1.0.0/src/commands/hello/world.ts)_

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
