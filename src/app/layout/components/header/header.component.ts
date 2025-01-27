import { Component, computed, effect, Renderer2, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, InputSwitchModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  cart :any;
  constructor(private store:Store<{cart:any}>) {
    store.select('cart').subscribe(res=> {this.cart=res.cart; })
  }
  
}
