export interface IModificar<T> {
  ejecutar(identificador: string, entidad: T): Promise<T>;
}
