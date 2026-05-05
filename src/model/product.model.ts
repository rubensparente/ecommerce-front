export class Product {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public price: number,
    public discount: number,
  ) {}
  
  getPrice() {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(this.price)
  }
}