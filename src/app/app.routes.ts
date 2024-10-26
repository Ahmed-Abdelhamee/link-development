import { Routes } from '@angular/router';
import { HomeComponent } from './features/components/home/home.component';
import { LoginComponent } from './core/components/auth/login/login.component';
import { RegisterComponent } from './core/components/auth/register/register.component';
import { CartComponent } from './shared/components/cart/cart.component';
import { authGuard } from './core/gaurds/auth.guard';

export const routes: Routes = [
    { path: "", redirectTo: "Home", pathMatch: "full" },
    { path: "Home", component: HomeComponent },
    { path: "orders", loadComponent: () => import("./features/components/orders/orders.component").then(c => c.OrdersComponent) },
    { path: "order-details/:id", loadComponent: () => import("./features/components/order-details/order-details.component").then(c => c.OrderDetailsComponent) },
    {
        path: "auth",
        loadComponent: () => import("./core/components/auth/auth.component").then(c => c.AuthComponent),
        children: [
            { path: 'auth', redirectTo: 'login', pathMatch: "full" },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
        ]
    },
    { path: "cart", component: CartComponent, canActivate: [authGuard] },
];
