export class ReassignConnectionRequest {

  constructor(
    public readonly key: string,
    public readonly connectionKey: string,
    public readonly targetKey: string,
  ) {

  }
}
