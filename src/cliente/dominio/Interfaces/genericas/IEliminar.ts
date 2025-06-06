export interface IEliminar<T> {
  ejecutar(identificador: string): Promise<T>;
}
