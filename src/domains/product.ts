export class Product {
  name: string | null;
  price: number | null;

  constructor(name: string | null, price: number | null) {
    this.name = name;
    this.price = price;
  }
}
