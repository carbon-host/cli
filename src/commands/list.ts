import type { Arguments } from 'yargs';
import type { CommandArgs } from '@/types';
import chalk from 'chalk';
import { getCarbonClient } from '../services/carbon';
import Table from 'cli-table3';

export const list = 'ls';

export const listHandler = async (argv: Arguments<CommandArgs>) => {
  const { verbose } = argv;
  if (verbose) console.log(chalk.blue('Fetching stars...'));

  const carbon = getCarbonClient();
  const stars = await carbon.getStars();

  // Initialize a new table with headers
  const table = new Table({
    head: [
      chalk.bold('Name'),
      chalk.bold('Type'),
      chalk.bold('Version'),
      chalk.bold('Storage (GB)'),
      chalk.bold('Memory (MB)'),
      chalk.bold('CPU (%)'),
      chalk.bold('Domain'),
      chalk.bold('Created At'),
    ],
    colWidths: [20, 15, 15, 15, 15, 10, 30, 25],
  });

  // Add each star's information to the table
  stars.forEach(star => {
    table.push([
      chalk.green(star.starName),
      chalk.cyan(star.starType),
      chalk.magenta(star.starVersion),
      chalk.blueBright(star.storageLimit.toString()),
      chalk.blueBright(star.memoryLimit.toString()),
      chalk.blueBright(star.cpuLimit.toString()),
      chalk.cyan(star.getDomain()),
      chalk.gray(new Date(star.createdAt).toLocaleString()),
    ]);
  });

  // Display the table
  console.log(table.toString());
};
