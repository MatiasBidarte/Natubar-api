export interface ICrearPreferencia {
  productos: IProductosParaPreferencia[];
  pedidoId: number;
  envio: number;
}

interface IProductosParaPreferencia {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
}
