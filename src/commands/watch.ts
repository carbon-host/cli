import type {Arguments} from "yargs";
import type {DeployArgs} from "@/types";
import {getCarbonClient} from "../services/carbon";
import chalk from "chalk";
import {watch} from "node:fs";
import {debounce} from "lodash";

export const watchCmd = "watch <source> <target> [post-deploy-command]";

export const watchBuilder = (yargs: any) => {
  return yargs
    .positional("source", {
      description: "The source file on the local file system to watch",
      type: "string",
    })
    .positional("target", {
      description: "The target file on the server",
      type: "string",
    })
    .positional("post-deploy-command", {
      description: "A command to run after each deployment",
      type: "string",
    });
};

export const watchHandler = async (argv: Arguments<DeployArgs>) => {
  const { source, target, verbose } = argv;

  const carbon = getCarbonClient();
  const star = await carbon.getStar(argv.star!);

  console.log(chalk.blue(`👀 Starting watch of ${source}`));
  await deployFile();

  const debouncedDeploy = debounce(deployFile, 300);
  watch(source, (eventType, filename) => {
    if (eventType === "change") {
      debouncedDeploy();
    }
  });

  async function deployFile() {
    const timestamp = new Date().toLocaleTimeString();
    console.log(
      chalk.yellow(`🔄 ${timestamp} - Change detected, deploying...`),
    );

    try {
      const updatedFile = Bun.file(source);
      await star.uploadFile(updatedFile, target);

      if (argv.postDeployCommand) {
        await star.executeCommand(argv.postDeployCommand);
      }

      console.log(
        chalk.green(
          `✅ ${timestamp} - Successfully deployed ${source} to ${target}`,
        ),
      );

      if (verbose) {
        console.log(chalk.gray(`   Source: ${source}`));
        console.log(chalk.gray(`   Target: ${target}`));
        if (argv.postDeployCommand) {
          console.log(chalk.gray(`   Executed: ${argv.postDeployCommand}`));
        }
      }
    } catch (error) {
      console.error(chalk.red(`❌ ${timestamp} - Deploy failed:`), error);
    }
  }
};
