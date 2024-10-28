import yargs from "yargs"
import {hideBin} from "yargs/helpers"

yargs(hideBin(process.argv)).command(
  "deploy <source> <target>",
  "Deploys a local file to your star",
  (yargs) => {
    return yargs
      .positional("source", {
        description: "The source file on the local file system",
        type: "string",
      })
      .positional("target", {
        description: "The target file on the server",
        type: "string",
      });
  }, (argv) => {
    console.log(argv.source, argv.target);
  })
  .command(
    "list",
    "List your deployed stars",
    (argv) => {
      console.log("list");
    }
  )

  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Enable verbose logging",
  })
  // show help if no command is provided
  .demandCommand(1, "You need to specify a command")
  .parse()
