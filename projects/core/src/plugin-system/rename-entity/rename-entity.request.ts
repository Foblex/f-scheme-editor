
export class RenameEntityRequest {

  constructor(
      public key: string,
      public type: string,
      public newName: string
  ) {
  }
}
