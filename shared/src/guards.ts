export function isDataQuery<IQuery, IBody>(obj:any):obj is IDataQuery<IQuery, IBody> {
  return obj.query && obj.data;
}
