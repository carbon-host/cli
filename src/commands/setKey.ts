import type {Arguments} from 'yargs';
import type {SetKeyArgs} from '../types';
import { config } from '@/config';

export const setKey = 'set-key <apiKey>';

export const setKeyBuilder = (yargs: any) => {
  return yargs
    .positional("apiKey", {
      description: "Your API key",
      type: "string",
    });
};

export const setKeyHandler = (argv: Arguments<SetKeyArgs>) => {
  const { apiKey, verbose } = argv;
  if (verbose) console.log('Setting API key...');

  config.set("api-key", apiKey);
  console.log("API key set successfully");
};