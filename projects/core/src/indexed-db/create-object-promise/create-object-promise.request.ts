
export class CreateObjectPromiseRequest<TData> {

  constructor(
      public object: TData,
      public dbReady: Promise<IDBDatabase>,
  ) {
  }
}
