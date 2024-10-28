import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { commands } from "@/commands/index.ts";

const cli = yargs(hideBin(process.argv));

// Register all commands
commands.forEach(
  ({
    command,
    builder,
    handler,
    desc,
  }: {
    command: string;
    builder?: any;
    handler: any;
    desc: string;
  }) => {
    cli.command(command, desc, builder || (() => {}), handler);
  },
);

cli
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Enable verbose logging",
  })
  .demandCommand(1, "You need to specify a command")
  .scriptName("carbon")
  .parse()
