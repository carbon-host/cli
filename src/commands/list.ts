import type {Arguments} from 'yargs';
import type {CommandArgs} from '@/types';
import chalk from 'chalk';
import Table from 'cli-table3';
import prettyBytes from "pretty-bytes";
import {getCarbonClient} from "@/services/carbon.ts";
import type { StarResources, StarStatus } from '@carbonhost/typescript';

export const list = "ls";

export const listHandler = async (argv: Arguments<CommandArgs>) => {
  const { verbose } = argv;
  if (verbose) console.log(chalk.blue("Fetching stars..."));

  const carbon = getCarbonClient();
  const stars = await carbon.getStars();

  const table = new Table({
    head: [
      chalk.bold("Name"),
      chalk.bold("Type"),
      chalk.bold("Version"),
      chalk.bold("Storage"),
      chalk.bold("Memory"),
      chalk.bold("CPU (%)"),
      chalk.bold("Status"),
      chalk.bold("Domain"),
      chalk.bold("Created At"),
    ],
    colWidths: [20, 10, 10, 10, 10, 10, 15, 25, 25],
  });

  for (const star of stars) {
    table.push([
      chalk.green(star.name),
      chalk.cyan(star.config.type),
      chalk.magenta(star.config.version),
      chalk.blueBright(
        prettyBytes(star.resources.storage),
      ),
      chalk.blueBright(
        prettyBytes(star.resources.memory),
      ),
      chalk.blueBright(star.resources.vCPU.toString()),
      chalk.yellow(await star.getResources().then((status: StarResources) => status.currentState)),
      chalk.cyan(star.subdomain.url ?? star.ip),
      chalk.gray(new Date(star.createdAt).toLocaleString()),
    ]);
  }

  console.log(table.toString());
};
