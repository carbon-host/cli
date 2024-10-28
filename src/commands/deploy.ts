import type {Arguments} from 'yargs';
import type {DeployArgs} from '@/types';
import { getCarbonClient } from '../services/carbon';

export const deploy = 'deploy <source> <target>';

export const deployBuilder = (yargs: any) => {
  return yargs
    .positional("source", {
      description: "The source file on the local file system",
      type: "string",
    })
    .positional("target", {
      description: "The target file on the server",
      type: "string",
    });
};

export const deployHandler = async (argv: Arguments<DeployArgs>) => {
  const { source, target, verbose } = argv;
  if (verbose) console.log(`Deploying ${source} to ${target}...`);

  // Add your deployment logic here
  console.log(source, target);
};