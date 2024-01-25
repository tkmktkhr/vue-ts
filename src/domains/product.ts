export class Product {
  id?: string | undefined;
  name: string | null;
  price: number | null;

  constructor(name: string | null, price: number | null, id?: string) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}
