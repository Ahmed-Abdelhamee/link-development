import { Product } from '../../../core/interfaces/product.interface';
import { Component, OnDestroy } from '@angular/core';
import { Order, ProductFlag } from '../../../core/interfaces/order.interface';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { GetTotalPriceService } from '../../../shared/services/get-total-price.service';
import { OrdersService } from '../../../shared/services/orders.service';
import { ProductsService } from '../../../shared/services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterModule, TableModule, TagModule, RatingModule, ButtonModule, CommonModule, NgxPaginationModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss','../../../shared/modal/main.scss']
})
export class OrdersComponent implements OnDestroy {
  currentPage: number = 1;
  pageSize: number = 10;
  orders: Order[] = []
  products: Product[] = []
  subscriptions: Subscription[] = []

  constructor(private ordersService: OrdersService, private productService: ProductsService
    , private TotalPriceService: GetTotalPriceService) { }
  
  ngOnInit(): void {
    this.subscriptions.push(this.ordersService.getOrders().subscribe(data => {
      this.orders = data;
    }));
    this.subscriptions.push(this.productService.getProducts().subscribe(data => {
      this.products = data;
    }));
  }

  getTotalPrice(orderProducts: ProductFlag[]): number {
    let prods: Product[] = []
    orderProducts.forEach(ele => {
      prods.push(this.products.find(item => item.ProductId == ele.ProductId) ?? {} as Product)
    })
    return this.TotalPriceService.getTotalPrice(prods, orderProducts)
  }

  ngOnDestroy(): void {
    for (const item of this.subscriptions) {
      item.unsubscribe();
    }
  }

}
