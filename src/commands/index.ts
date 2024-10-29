import {deploy, deployBuilder, deployHandler} from "@/commands/deploy.ts";
import {list, listHandler} from "@/commands/list.ts";
import {setKey, setKeyBuilder, setKeyHandler} from "@/commands/setKey.ts";
import {watchBuilder, watchCmd, watchHandler} from "@/commands/watch.ts";

export const commands = [
  {
    command: deploy,
    builder: deployBuilder,
    handler: deployHandler,
    desc: "Deploys a local file to your star"
  },
  {
    command: watchCmd,
    builder: watchBuilder,
    handler: watchHandler,
    desc: "Watches a local file and deploys it to your star"
  },
  {
    command: list,
    handler: listHandler,
    desc: "List your deployed stars"
  },
  {
    command: setKey,
    builder: setKeyBuilder,
    handler: setKeyHandler,
    desc: "Set your API key"
  }
];