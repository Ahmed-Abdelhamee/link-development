import { Component, OnDestroy, signal } from '@angular/core';
import { Course } from '../../interfaces/course.interface';
import { CalcService } from '../../services/calc.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { cartReducer } from '../../../core/store/cart.reducer';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule , RouterModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnDestroy {
  cart:any={};
  total:any = {};
  subscriptions:Subscription[]=[];
  segment :string = '';
  constructor(public calcService:CalcService,private store:Store<{cart:any}>,private router:Router) {
    store.select('cart').subscribe(res=> calcService.calculation(res.cart));
    this.subscriptions.push(calcService.cartValue.subscribe(res=> {this.cart=res;}))
    router.events.subscribe(data=> {
      if (data instanceof NavigationEnd){
        if(data.url.split("/")[data.url.split("/").length-1]=='checkout'){
          this.segment = '/paied'
        }else if(data.url.split("/")[data.url.split("/").length-1]=='shopping-cart'){
          this.segment = '/shopping-cart/checkout'
        }
      }
    }
    )
  }

  ngOnDestroy(): void {
    for (const item of this.subscriptions) {
      item.unsubscribe()
    }
  }

}
