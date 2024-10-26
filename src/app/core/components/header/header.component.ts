import { Component, effect } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrdersService } from '../../../shared/services/orders.service';
import { OrderProduct } from '../../interfaces/orderProducts.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  promo_Order_Products: OrderProduct[] = [];

  constructor(private orderService: OrdersService) {
    orderService.promo_Order_Products_Signal.set(JSON.parse(localStorage.getItem("promo_Order_Products")!) ?? [])
    effect(()=>{this.promo_Order_Products =orderService.promo_Order_Products_Signal()})
  }

}
