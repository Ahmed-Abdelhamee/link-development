import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as AOS from 'aos';
import { NgxPaginationModule } from 'ngx-pagination';
import { Product } from '../../../core/interfaces/product.interface';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-products-view',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './products-view.component.html',
  styleUrl: './products-view.component.scss'
})
export class ProductsViewComponent implements OnInit {

  curruntPage: number = 1;
  pageSize: number = 10;
  products = input<Product[]>([]);
  classWidth = input<Product[]>([]);


  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    AOS.init();
  }

  addProduct(product: Product) {
    // adding an product to signals with no repeat
    if (!this.ordersService.promo_Order_Products_Signal().find(item => item.product.ProductId == product.ProductId)) {
      this.ordersService.promo_Order_Products_Signal().push({
        product: product,
        Quantity: 1
      })
    }
  }

}
