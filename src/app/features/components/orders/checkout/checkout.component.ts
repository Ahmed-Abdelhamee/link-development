import { Component, signal } from '@angular/core';
import { removeFromCart } from '../../../../core/store/cart.actions';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Course } from '../../../interfaces/course.interface';
import { CalcService } from '../../../services/calc.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule , ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

  checkoutForm:FormGroup;
  subscriptions:Subscription[]=[]
  cart = signal<Course[]>([]);
  total:any = {}

  constructor( private fb:FormBuilder, private toastr:ToastrService) {
    
    this.checkoutForm = this.fb.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      paymentMethod: ['creditCard', Validators.required],
      creditCard: this.fb.group({
        nameOnCard: ['', Validators.required],
        cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
        expiryDate: ['', Validators.required],
        cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      }),
    });
  }

  submit(){

  }  
 
  
}
