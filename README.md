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
@carbonhost/cli/1.1.0 darwin-arm64 node-v23.7.0
$ carbon --help [COMMAND]
USAGE
  $ carbon COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`carbon deploy [LOCALPATH] [STARDIRECTORY]`](#carbon-deploy-localpath-stardirectory)
* [`carbon help [COMMAND]`](#carbon-help-command)
* [`carbon login`](#carbon-login)

## `carbon deploy [LOCALPATH] [STARDIRECTORY]`

Deploy a local file to a star

```
USAGE
  $ carbon deploy [LOCALPATH] [STARDIRECTORY] [-s <value>] [-w]

ARGUMENTS
  LOCALPATH      The path to the file that will be deployed
  STARDIRECTORY  The directory on the server to deploy the file to

FLAGS
  -s, --star=<value>  The Star ID to deploy to
  -w, --watch         Watch for changes and auto-deploy

DESCRIPTION
  Deploy a local file to a star

EXAMPLES
  $ carbon deploy
```

_See code: [src/commands/deploy.ts](https://github.com/carbon-host/cli/blob/v1.1.0/src/commands/deploy.ts)_

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

## `carbon login`

Login to the Carbon Host API

```
USAGE
  $ carbon login [-p <value>]

FLAGS
  -p, --port=<value>  port to listen on

DESCRIPTION
  Login to the Carbon Host API

EXAMPLES
  $ carbon login
```

_See code: [src/commands/login.ts](https://github.com/carbon-host/cli/blob/v1.1.0/src/commands/login.ts)_
<!-- commandsstop -->
