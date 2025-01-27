import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/components/footer/footer.component';
import { HeaderComponent } from './layout/components/header/header.component';
import { Store } from '@ngrx/store';
import { loadCart } from './core/store/cart.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , HeaderComponent , FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'task';
  constructor(private store:Store) {
      store.dispatch(loadCart())

      window.ononline=()=>location.reload()
  }
}
