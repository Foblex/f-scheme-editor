export class AddConnectionRequest {

  constructor(
    public readonly key: string,
    public readonly sourceKey: string,
    public readonly targetKey: string,
  ) {
  }
}
