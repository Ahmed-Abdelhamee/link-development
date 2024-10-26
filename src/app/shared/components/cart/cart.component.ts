import { Subscription } from 'rxjs';
import { Component, effect, OnDestroy} from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { ProductsViewComponent } from '../products-view/products-view.component';
import { OrderProduct } from '../../../core/interfaces/orderProducts.interface';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ProductsViewComponent, CommonModule ,InputNumberModule , FormsModule,ReactiveFormsModule, ToastrModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnDestroy {

  Payment:FormGroup;
  subscriptions:Subscription[]=[]
  promo_Order_Products: OrderProduct[] = []

  constructor(private ordersService: OrdersService , private formBuilder:FormBuilder, private toastr:ToastrService) {
    this.Payment=this.formBuilder.group({
      OrderDate: [''],
      OrderId:  [''],
      PaymentType: ['', Validators.required],
      Products: formBuilder.array([]),
      UserId: [''],
      rating:3
    });
    // ----------------------------------- update view --------------------------------
    this.updatePromoOrderProducts();
    effect(() => {
      this.promo_Order_Products = this.ordersService.promo_Order_Products_Signal()
    })
  }
  
  get products(){
    return this.Payment.get("Products") as FormArray
  }

  // ----------------- handling cart from FrontEend only without API -------------------
  // Method to handle promo order products logic
  updatePromoOrderProducts() {
    // Retrieve old products from localStorage
    this.promo_Order_Products = JSON.parse(localStorage.getItem("promo_Order_Products")!) ?? [];
    // Add new products, avoiding duplicates based on ProductId
    this.promo_Order_Products.push(
      ...this.ordersService.promo_Order_Products_Signal().filter(
        item => !this.promo_Order_Products.some(
          ele => ele?.product.ProductId === item?.product.ProductId
        )
      )
    );
    // Update localStorage
    localStorage.setItem("promo_Order_Products", JSON.stringify(this.promo_Order_Products));
    // Update the signal with the modified array
    this.ordersService.promo_Order_Products_Signal.set(this.promo_Order_Products);
  }

  // ------------------- Get Total Price -----------------
  getTotalPrice(){
    return this.promo_Order_Products.reduce((prev, current, index, array) => {
      return prev + (current.product.ProductPrice * current.Quantity)
    }, 0)
  }
  
  // ------------------- add order -----------------
  createOrder(){
    if(this.Payment.valid){
      this.Payment.patchValue({
        OrderDate: new Date().toString(),
        OrderId: new Date().getTime(),
        UserId: JSON.parse(localStorage.getItem('user')!).id,
        rating:3
      })
      this.productsFlag()
      this.subscriptions.push(this.ordersService.addOrder(this.Payment.value).subscribe(res=>{
        this.toastr.success("Order created Successfully")
      }))
    }else{
      this.toastr.error("fill the payment method")
    }
  }
  // for push the products form-group  Id & quantity in the products form-array
  productsFlag(): void {
    this.promo_Order_Products.forEach(item => {
      const productGroup = this.createProductGroup(item.product.ProductId, item.Quantity);
      this.products.push(productGroup);
    });
  }
  // Create Product Group Id & quantity 
  createProductGroup(productId: number, quantity: number): FormGroup {
    return this.formBuilder.group({
      ProductId: [productId, Validators.required],
      Quantity: [quantity, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnDestroy(): void {
    for (const item of this.subscriptions) {
      item.unsubscribe()
    }
  }
  
}
