export abstract class CreateEntityRequestBase {

  protected constructor(
    public inDirectory: string,
    public name: string
  ) {
  }
}
