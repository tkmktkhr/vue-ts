export class Product {
  id?: string | undefined;
  name: string | null;
  price: number | null;
  isStock: boolean | null;

  constructor(
    name: string | null,
    price: number | null,
    isStock: boolean | null,
    id?: string,
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.isStock = isStock;
  }
}
