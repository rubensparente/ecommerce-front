import type { Product } from './product.model'

export interface ICartItem {
  product: Product
  quantity: number
}

export class Cart {
  constructor(
    public list: ICartItem[] = [],
    public totalPrice: number = 0,
  ) {}

  addItem(product: Product) {
    if (this.productAlreadyExists(product)) {
      this.list = this.list.map((i) => {
        return i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
      })
    } else {
      this.list.push({ product, quantity: 1 })
    }
    this.totalPrice += product.price * (1 - product.discount)
  }
  
  incrementItem(product: Product) {
    if (!this.productAlreadyExists(product)) return
    this.list = this.list.map((i) =>
      i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
    )
    this.totalPrice += product.price * (1 - product.discount)
  }
  
  removeItem(product: Product) {
    if (!this.productAlreadyExists(product)) return
    const itemQuantity = this.list.find((i) => i.product.id === product.id)?.quantity
    this.list = this.list.filter((i) => i.product.id !== product.id)
    this.totalPrice -= product.price * (1 - product.discount) * (itemQuantity ? itemQuantity : 0)
  }
  
  decrementItem(product: Product) {
    if (!this.productAlreadyExists(product)) return
    if (this.list.find((i) => i.product.id === product.id)?.quantity === 1) {
      this.removeItem(product)
      return
    }
    this.list = this.list.map((i) =>
      i.product.id === product.id ? { ...i, quantity: i.quantity - 1 } : i,
    )
    this.totalPrice -= product.price * (1 - product.discount)
  }

  productAlreadyExists(product: Product) {
    return this.list.some((i) => i.product.id === product.id)
  }
  
  getTotalPrice() {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
      this.totalPrice,
    )
  }
  
  getItemCount(): number {
    return this.list.reduce((total, item) => total + item.quantity, 0)
  }
}