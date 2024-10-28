import type {Arguments} from 'yargs';
import type {CommandArgs} from '@/types';
import { getCarbonClient } from '../services/carbon';

export const list = 'ls';

export const listHandler = async (argv: Arguments<CommandArgs>) => {
  const { verbose } = argv;
  if (verbose) console.log('Fetching stars...');

  const carbon = getCarbonClient();
  const res = await carbon.getStars();
  console.log(res.data);
};
