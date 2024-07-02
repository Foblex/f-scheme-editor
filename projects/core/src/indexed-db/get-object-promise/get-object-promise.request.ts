export class GetObjectPromiseRequest  {

  constructor(
      public id: string,
      public dbReady: Promise<IDBDatabase>,
  ) {
  }
}
