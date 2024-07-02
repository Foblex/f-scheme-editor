export class EditObjectPromiseRequest<TData> {

  constructor(
      public object: TData,
      public dbReady: Promise<IDBDatabase>,
  ) {
  }
}
