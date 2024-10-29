import type {Arguments} from 'yargs';
import type {DeployArgs} from '@/types';
import { getCarbonClient } from '../services/carbon';

export const deploy = 'deploy <source> <target> [post-deploy-command]';

export const deployBuilder = (yargs: any) => {
  return yargs
    .positional("source", {
      description: "The source file on the local file system",
      type: "string",
    })
    .positional("target", {
      description: "The target file on the server",
      type: "string",
    })
    .positional("post-deploy-command", {
      description: "A command to run after the deployment",
      type: "string",
    });
};

export const deployHandler = async (argv: Arguments<DeployArgs>) => {
  const { source, target, verbose } = argv;
  if (verbose) console.log(`Deploying ${source} to ${target}...`);

  // Add your deployment logic here
  console.log(source, target);

  const localFile = Bun.file(source);
  if (!await localFile.exists()) {
    console.error(`File ${source} does not exist`);
    return;
  }

  const carbon = getCarbonClient();
  const star = await carbon.getStar(argv.star!);

  await star.uploadFile(localFile, target);

  if (argv.postDeployCommand) {
    await star.executeCommand(argv.postDeployCommand);
  }

  console.log(`File ${source} deployed to ${target}`);
};