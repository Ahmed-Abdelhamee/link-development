import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { StoreModule } from '@ngrx/store';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { cartReducer } from './core/store/cart.reducer';
import { SkeletonModule } from 'primeng/skeleton';

// register Swiper custom elements
register();


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,),
    provideHttpClient(
      withInterceptors([authInterceptor]
    )),
    importProvidersFrom(
      HashLocationStrategy,
      RouterModule.forRoot(routes, { useHash: true,scrollPositionRestoration:"enabled" }),
      BrowserModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot(),
      NgbModule,
      StoreModule.forRoot({cart:cartReducer}),
      SkeletonModule
    )
  ]
};
