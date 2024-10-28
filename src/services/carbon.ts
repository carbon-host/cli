import { CarbonClient } from "@carbonhost/typescript/src/index";
import { getApiKey } from "@/config";

let carbonClient: CarbonClient | null = null;

export const getCarbonClient = (): CarbonClient => {
  if (!carbonClient) {
    carbonClient = new CarbonClient(getApiKey());
  }
  return carbonClient;
};