import { Routes } from '@angular/router';
import { HomeComponent } from './features/components/home/home.component';
import { authGuard } from './core/gaurds/auth.guard';
import { LoginComponent } from './layout/components/auth/login/login.component';
import { RegisterComponent } from './layout/components/auth/register/register.component';
import { CartComponent } from './features/components/orders/cart/cart.component';
import { CheckoutComponent } from './features/components/orders/checkout/checkout.component';
import { OrdersComponent } from './features/components/orders/orders.component';
import { PaidedConfirmationComponent } from './features/components/paided-confirmation/paided-confirmation.component';

export const routes: Routes = [
    { path: "", redirectTo: "Home", pathMatch: "full" },
    { path: "Home", component: HomeComponent , title :"Link Development | Home" },
    { path: "course-details", loadComponent: () => import("./features/components/course-details/course-details.component").then(c => c.CourseDetailsComponent) , title:"cource details" },
    {
        path: "auth",
        loadComponent: () => import("./layout/components/auth/auth.component").then(c => c.AuthComponent),
        children: [
            { path: 'auth', redirectTo: 'login', pathMatch: "full" },
            { path: 'login', component: LoginComponent , title:"Link Development | Sign in" },
            { path: 'register', component: RegisterComponent , title:"Link Development | Sign up" },
        ]
    },
    {path : "shopping-cart" , component:OrdersComponent, canActivate: [authGuard] ,children:[
        { path: "", component: CartComponent},
        { path: "checkout", component: CheckoutComponent},
    ] , title:"Link Development | Order"},
    { path: 'paied', component: PaidedConfirmationComponent , title:"Link Development | Confirm" },
];
