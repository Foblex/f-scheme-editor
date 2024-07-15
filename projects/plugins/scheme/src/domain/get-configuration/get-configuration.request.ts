export class GetConfigurationRequest {

  constructor(
    public readonly key: string,
    public readonly nodes: string[],
    public readonly connections: string[],
  ) {
  }
}
