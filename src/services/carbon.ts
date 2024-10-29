import {Carbon} from "@carbonhost/typescript";
import {getApiKey} from "@/config";

let carbonClient: Carbon | null = null;

export const getCarbonClient = (): Carbon => {
  if (!carbonClient) {
    carbonClient = new Carbon({
      apiKey: getApiKey(),
    });
  }

  return carbonClient;
};
