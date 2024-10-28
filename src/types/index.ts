export interface CommandArgs {
  verbose?: boolean;
}

export interface DeployArgs extends CommandArgs {
  source: string;
  target: string;
}

export interface SetKeyArgs extends CommandArgs {
  apiKey: string;
}