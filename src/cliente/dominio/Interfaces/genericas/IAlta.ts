export interface IAlta<T> {
  ejecutar(entidad: T): Promise<T>;
}
