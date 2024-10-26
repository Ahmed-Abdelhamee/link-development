import { Injectable } from '@angular/core';
import { ProductFlag } from '../../core/interfaces/order.interface';
import { Product } from '../../core/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class GetTotalPriceService {

  constructor() { }
    
  getTotalPrice(prods: Product[],orderProducts: ProductFlag[]): number {
    return prods.reduce((prev, current, index, array) => {
      return prev + (current.ProductPrice * orderProducts[index].Quantity)
    }, 0)
  }
}
