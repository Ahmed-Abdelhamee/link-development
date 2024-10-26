import { UsersService } from '../../../shared/services/users.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../../core/interfaces/order.interface';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../../shared/services/orders.service';
import { ProductsService } from '../../../shared/services/products.service';
import { Product } from '../../../core/interfaces/product.interface';
import { GetTotalPriceService } from '../../../shared/services/get-total-price.service';
import { Subscription } from 'rxjs';
import { User } from '../../../core/interfaces/users.interface';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss', '../../../shared/modal/main.scss']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {

  orderID: number;
  order: Order = {} as Order;
  user: User = {} as User;

  orderProducts: Product[] = []
  products: Product[] = [];
  subscriptions: Subscription[] = []

  constructor(private activatedRoute: ActivatedRoute, public totalPrice: GetTotalPriceService,
    private ordersService: OrdersService, private productsService: ProductsService, private usersService: UsersService) {
    this.orderID = Number(activatedRoute.snapshot.paramMap.get("id"))
  }

  ngOnInit(): void {
    this.subscriptions.push(this.ordersService.getOrder(this.orderID).subscribe({
      next: data => {
        this.order = data!;
      },
      complete: () => { this.ordersService.getOrderProducts(this.order.Products); 
        this.orderProducts = this.ordersService.orderProducts;
        this.getUser() }
    }))
  }


  getUser() {
    this.subscriptions.push(
      this.usersService.getUsers().subscribe(data => {
        this.user = data.find(item => item.id == this.order.UserId)!
      })
    )
  }

  ngOnDestroy(): void {
    for (const item of this.subscriptions) {
      item.unsubscribe();
    }
  }
}
