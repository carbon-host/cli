import Conf from 'conf';

export const config = new Conf({ projectName: "carbon-cli" });

export const getApiKey = (): string => {
  const apiKey = config.get("api-key") as string;
  if (!apiKey) {
    throw new Error("API key not set. Please run 'carbon set-key <apiKey>' first");
  }
  return apiKey;
};

export const setAPIKey = (apiKey: string): void => {
  config.set("api-key", apiKey);
};