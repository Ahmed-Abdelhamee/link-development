import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../core/interfaces/product.interface';
import { CommonModule} from '@angular/common';
import { ProductsService } from '../../../shared/services/products.service';
import { ProductsViewComponent } from '../../../shared/components/products-view/products-view.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,ProductsViewComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss','../../../shared/modal/main.scss']
})
export class HomeComponent implements OnInit , OnDestroy {

  products: Product[] = []
  subscriptions: Subscription[] = []

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
   this.subscriptions.push(this.productService.getProducts().subscribe(data => {
      this.products = data;
    }));
  }

  ngOnDestroy(): void {
    for (const item of this.subscriptions) {
      item.unsubscribe();
    }
  }
}
