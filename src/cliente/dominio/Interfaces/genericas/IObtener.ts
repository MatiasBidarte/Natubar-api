export interface IObtener<T> {
  ejecutar(identificador: string): Promise<T>;
}
