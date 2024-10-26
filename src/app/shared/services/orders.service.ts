import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { Order, ProductFlag } from '../../core/interfaces/order.interface';
import { environment } from '../../core/global/environments';
import { ProductsService } from './products.service';
import { Product } from '../../core/interfaces/product.interface';
import { OrderProduct } from '../../core/interfaces/orderProducts.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  DB_url: string = environment.domain;
  promo_Order_Products_Signal = signal<OrderProduct[]>([])

  orderProducts: Product[] = []
  products: Product[] = [];
  subscriptions: Subscription[] = []

  constructor(private http: HttpClient, private productsService: ProductsService) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.DB_url}/orders`)
  }

  getOrder(orderId: number): Observable<Order | undefined> {
    return this.getOrders().pipe(
      map(data => data.find(item => item.OrderId === orderId))
    );
  }

  // ---------- handling  Get Order Products without using real API ------------
  getOrderProducts(prodsFlag: ProductFlag[]) {
    this.orderProducts = []
    this.productsService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (error) => console.error(error),
      complete: () => {
        // get the real products for view 
        prodsFlag.forEach((ele) => {
          const foundProduct = this.products.find(item => item.ProductId == ele.ProductId);
          if (foundProduct) {
            this.orderProducts.push(foundProduct);
          }
        })
      }
    })
  }

  addOrder(order: Order) {
    return this.http.post<Order>(`${this.DB_url}/orders`, order)
  }


}
