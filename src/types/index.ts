export interface CommandArgs {
  verbose?: boolean;
  star?: string;
}

export interface DeployArgs extends CommandArgs {
  source: string;
  target: string;
}

export interface SetKeyArgs extends CommandArgs {
  apiKey: string;
}