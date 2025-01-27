import { Subscription } from 'rxjs';
import { Component, effect, OnDestroy, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { PricePipe } from '../../../../core/pipes/price.pipe';
import { removeFromCart } from '../../../../core/store/cart.actions';
import { Course } from '../../../interfaces/course.interface';
import { CalcService } from '../../../services/calc.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule ,InputNumberModule , FormsModule,ReactiveFormsModule,
            ToastrModule, RouterModule, NgbRating, PricePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit,OnDestroy {

  subscriptions:Subscription[]=[]
  cart = signal<Course[]>([]);
  total:any = {}

  constructor(private toastr:ToastrService,
    private store:Store<{cart:any}>,private storeAction:Store, public calcService:CalcService) {
    this.subscriptions.push(store.select('cart').subscribe({
      next:res=> {this.cart.set(res.cart);;
      },
    }))
  }

  ngOnInit(): void {}

  remove(id:any){
    this.storeAction.dispatch(removeFromCart({id}))
  }
  
  ngOnDestroy(): void {
    for (const item of this.subscriptions) {
      item.unsubscribe()
    }
  }
  
}
